# remove dupe courses in courses.json, favouring ones with url+outline
import json

with open('src/course_scraper/courses.json') as courses_file:
    courses = json.load(courses_file)
 

seen = {}
result = []
for course in courses:
    code = course['code']
    if code in seen:
        if ('url' not in seen[code] and 'url' in seen[code]) or \
            ('outline' not in seen[code] and 'outline' in seen[code]):
            print(f'Replacing {code} {course["offering_time"]} with {seen[code]["offering_time"]}')
            seen[code] = course
        else:
            print(f'Did not replace {code} {seen[code]["offering_time"]} with {course["offering_time"]}')
        continue
    seen[code] = course
    result.append(course)
    
print(len(result)) # should be 122
with open('src/course_scraper/courses_nodupes.json', 'w') as courses2:
    json.dump(result, courses2)