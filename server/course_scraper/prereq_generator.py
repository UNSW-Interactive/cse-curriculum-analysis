import json
import requests
from bs4 import BeautifulSoup


with open('course_scraper/courses_nodupes.json') as myf:
    j = json.load(myf)
    aa = {}
    for cc in j:
        aa[cc['code']] = {
            'offering_time': cc['offering_time'],
            'name': cc['name'],
            'url': cc['url'],
            'outline': cc['outline'] if 'outline' in cc else ''
        }

def scrape_handbook():
    handbook_url = 'https://www.handbook.unsw.edu.au/{}/courses/2020/{}/' # undergraduate, code
    for course in j:
        course_name = course['code']
        for grad_level in ('undergraduate', 'postgraduate'):
            url = handbook_url.format(grad_level, course_name.lower())
            r = requests.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            error_page = soup.find('div', {'class':'error-page'})
            if error_page is not None:
                continue
            
            print("-----")
            print(course_name, grad_level)
            subject_conditions = soup.find('div', {'id':'readMoreSubjectConditions'})
            if subject_conditions is not None:
                print(subject_conditions.div.div.text)


# Then prereqs were parsed manually into Polish Notation
def parse_tokens(tokens):
    operators = {'A': "AND", 'O': "OR", 'C': "WITH"} # and/or/co-req
    course_value = '' # Would be maybe the grade required, idk
    stack = []
    for token in tokens:
        if token in operators:
            if token == 'C':
                coreq = stack.pop()
                stack.insert(0, [operators[token], coreq])
            else:
                left = stack.pop()
                right = stack.pop()
                stack.insert(0, [operators[token], left, right])
        else:
            stack.insert(0, {
                token: course_value
            })
    return stack[0] if stack else {}

def parse_into_json():
    with open('course_scraper/prereqs2.tsv') as myf:
        courses = myf.readlines()
    
    # results = []
    for course in courses:
        # print(course)
        s = course.rstrip('\n').split('\t')
        # result = {
        #     "course": s[0],
        #     "grad_level": s[1],
        #     "handbook_prereqs": s[2] if len(s) > 2 else '',
        #     "prereqs": parse_tokens(reversed(s[3].split())) if len(s) > 3 else []
        # }
        # print("----")
        # print(result)
        # results.append(result)
        cname = s[0]
        aa[cname]['grad_level'] = s[1]
        aa[cname]["handbook_prereqs"] = s[2] if len(s) > 2 else ''
        aa[cname]['prereqs'] = parse_tokens(reversed(s[3].split())) if len(s) > 3 else []

    print(json.dumps(aa))

parse_into_json()



    