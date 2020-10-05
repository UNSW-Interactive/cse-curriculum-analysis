courses = [
    "COMP1000",
    "COMP1400",
    "COMP1511",
    "COMP1521",
    "COMP1531",
    "COMP1911",
    "COMP2041",
    "COMP2111",
    "COMP2121",
    "COMP2511",
    "COMP2521",
    "COMP3121",
    "COMP3131",
    "COMP3141",
    "COMP3151",
    "COMP3153",
    "COMP3161",
    "COMP3211",
    "COMP3222",
    "COMP3231",
    "COMP3311",
    "COMP3331",
    "COMP3411",
    "COMP3421",
    "COMP3431",
    "COMP3511",
    "COMP3601",
    "COMP3821",
    "COMP3891",
    "COMP3900",
    "COMP3901",
    "COMP3902",
    "COMP4121",
    "COMP4128",
    "COMP4141",
    "COMP4161",
    "COMP4336",
    "COMP4337",
    "COMP4418",
    "COMP4511",
    "COMP4601",
    "COMP4920",
    "COMP4930",
    "COMP4931",
    "COMP4941",
    "COMP4951",
    "COMP4952",
    "COMP4953",
    "COMP4961",
    "COMP4962",
    "COMP4963",
    "COMP6324",
    "COMP6441",
    "COMP6443",
    "COMP6445",
    "COMP6447",
    "COMP6448",
    "COMP6451",
    "COMP6452",
    "COMP6714",
    "COMP6721",
    "COMP6733",
    "COMP6741",
    "COMP6752",
    "COMP6771",
    "COMP6841",
    "COMP6843",
    "COMP6845",
    "COMP9020",
    "COMP9021",
    "COMP9024",
    "COMP9032",
    "COMP9044",
    "COMP9101",
    "COMP9102",
    "COMP9153",
    "COMP9154",
    "COMP9164",
    "COMP9201",
    "COMP9211",
    "COMP9222",
    "COMP9242",
    "COMP9243",
    "COMP9283",
    "COMP9301",
    "COMP9302",
    "COMP9311",
    "COMP9313",
    "COMP9315",
    "COMP9318",
    "COMP9319",
    "COMP9321",
    "COMP9322",
    "COMP9323",
    "COMP9331",
    "COMP9332",
    "COMP9334",
    "COMP9336",
    "COMP9337",
    "COMP9414",
    "COMP9415",
    "COMP9417",
    "COMP9418",
    "COMP9434",
    "COMP9441",
    "COMP9444",
    "COMP9511",
    "COMP9517",
    "COMP9596",
    "COMP9801",
    "COMP9814",
    "COMP9900",
    "COMP9901",
    "COMP9902",
    "COMP9945",
    "MATH1081",
    "SENG2011",
    "SENG2021",
    "SENG3011",
    "SENG4904",
    "SENG4906",
    "SENG4907",
    "SENG4910",
    "SENG4911",
    "SENG4920",
]

import requests
import time
from bs4 import BeautifulSoup
import json


def is_ugrad_and_pgrad(course_name):
    url = "https://www.handbook.unsw.edu.au/api/es/search"
    r = requests.post(
        url,
        data=json.dumps({
            "query": {
                "bool": {
                    "must": [
                        {
                            "query_string": {
                                "query": f"unsw_psubject.code: {course_name}"
                            }
                        },
                        {"term": {"live": True}},
                    ]
                }
            },
            "size": 100,
        })
    )
    time.sleep(1)
    print(r)
    j = r.json()
    try:
        return (
            j["contentlets"][0]["studyLevelURL"] == "undergraduate"
            and j["contentlets"][1]["studyLevelURL"] == "postgraduate"
        )
    except:
        return False


final=[]
for course in courses:
    if is_ugrad_and_pgrad(course):
        print(course)
        final.append(course)

print(final)
# print(is_ugrad_and_pgrad("COMP1511"))
