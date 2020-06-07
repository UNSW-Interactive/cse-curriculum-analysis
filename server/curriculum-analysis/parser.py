# File for talking with Parsr API

# docker run -p 3001:3001 axarev/
import requests
import json
from typing import List
from contextlib import ExitStack

PARSR_URL = 'http://localhost:3001'

def parse_pdfs(*pdf_files: List[str]) -> dict:
    """
    Takes in a list of PDFs to parse.

    Returns a dictionary of file_name: ID to fetch the ifnomraion of
    """
    result = {}
    for pdf_file_name in enumerate(pdf_files):
        files = {}
        try:
            with open(pdf_file_name, 'rb') as pdf_file:
                files = {'file': (pdf_file_name, pdf_file, 'application/pdf')}
        except FileNotFoundError:
            result[pdf_file] = ''
        else:
            req = requests.post(f'{PARSR_URL}/api/v1/document', files=files)
            if not req.ok:
                return ""
        
        
        print(files)
        
    
    print(req)
    

    
    

parse_pdfs('curriculum-analysis/file-management.pdf')  

# files = {
#     'file': ('curriculum-analysis/file-management.pdf', open('curriculum-analysis/file-management.pdf', 'rb'), 'application/pdf'),
# }

# r = requests.post(f'{PARSR_URL}/api/v1/document', files=files)
# file_id = r.text

# r2 = requests.get(f'{PARSR_URL}/api/v1/queue/{file_id}')
# json_PARSR_URL = r2.json()['json']

# r3 = requests.get(f'{PARSR_URL}{json_PARSR_URL}')