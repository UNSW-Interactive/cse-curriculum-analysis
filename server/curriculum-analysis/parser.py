# File for talking with Parsr API

# docker run -p 3001:3001 axarev/
import requests
import json
from typing import List, NewType, Dict, IO
from http import HTTPStatus
from contextlib import ExitStack
import time

PARSR_URL = 'http://localhost:3001'

QueueID = NewType("QueueID", str)

class Parsr:
    
    def __init__(self, config_file=None):
        self.config_file = config_file
        self.config_file_fp: IO = None

    def __enter__(self):
        if self.config_file is not None:
            self.config_file_fp = open(self.config_file)

    def __exit__(self, *args):
        if self.config_file_fp is not None:
            self.config_file_fp.close()
            self.config_file_fp = None

    def start_parsing_pdf(self, pdf_file_name: str) -> QueueID:
        """
        Takes in a PDF to parse and returns the QueueID to track Parsr parsing it.
        """
        try:
            with open(pdf_file_name, 'rb') as pdf_file:
                files = {'file': (pdf_file_name, pdf_file, 'application/pdf'),
                'config': (self.config_file, self.config_file_fp, 'application/json')}
                req = requests.post(f'{PARSR_URL}/api/v1/document', files=files)
        except FileNotFoundError:
            return None
        else:
            return req.text if req.ok else None

    def get_parsed_json(self, queueID: QueueID, retries=5) -> dict:
        """
        Given the QueueID for parsing a PDF, check if it's completed and return the parsed JSON
        """
        if retries <= 0:
            return {}

        req = requests.get(f'{PARSR_URL}/api/v1/queue/{queueID}')
        print(req.text)
        if not req.ok:
            return {} # should probs be an error

        if req.status_code == HTTPStatus.OK:
            # Request isn't ready yet
            # TODO: DO we actually need this?
            # TODO: What to return here? Retries?
            time.sleep(30)
            return self.get_parsed_json(queueID, retries-1)

        json_url = req.json()['json']
        result_req = requests.get(f'{PARSR_URL}{json_url}')
        return result_req.json()
    
p = Parsr('curriculum-analysis/config.json')
with p:
    qID = p.start_parsing_pdf('curriculum-analysis/file-management.pdf')
    j = p.get_parsed_json(qID)
    print(len(j))