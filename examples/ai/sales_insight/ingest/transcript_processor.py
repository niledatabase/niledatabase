# We need to process the transcripts to extract the sales calls.
# Each transcript is a single sales call.
# We want to do the following:
## - Chunk the transcript into lines. Each time the speaker changes, we'll start a new chunk.
## - For each chunk, we'll extract the following information:
##   - The speaker
##   - The text of the chunk
## - We'll generate embeddings for each chunk.
## - We'll write CSV files with the chunks, metadata and embeddings

import os
import re
import logging
from constants import transcript_directory, chunked_transcript_directory, tenants
import httpx

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

class TranscriptIterator:
    def __init__(self, transcript):
        self.lines = iter(transcript.splitlines())
        self.more_lines = True

    def __iter__(self):
        return self

    def __next__(self):
        for line in self.lines:
            # Ignore comments at the end
            if not self.more_lines:
                raise StopIteration
            if line == "**Transcript:**":
                continue
            match = re.match(r"^\*\*(.+?)\*\*:\s*(.*)$", line.strip()) or \
                    re.match(r"^(.+?):\s*(.*)$", line.strip())
            if match:
                speaker = match.group(1).strip()
                initial_text = match.group(2).strip()
                text = [initial_text] if initial_text else []       
                for text_line in self.lines:
                    if re.match(r"^\*\*(.+?)\*\*:\s*(.*)$", text_line.strip()) or \
                       re.match(r"^(.+?):\s*(.*)$", text_line.strip()):
                        # Found the next speaker line, stop collecting text
                        self.lines = iter([text_line] + list(self.lines))
                        logger.debug("Found the next speaker line, stop collecting text")
                        break
                    if text_line.strip().startswith("---"):
                        logger.debug("Found the end of the transcript")
                        self.more_lines = False
                        break
                    text.append(text_line.strip())
                return speaker, " ".join(text)
        raise StopIteration
    
# We are going to use our own app to generate the embeddings and store them in the DB. 
def process_transcript(transcript_file_path, tenant_id):
    f = open(transcript_file_path, 'r')
    transcript = f.read()
    f.close()
    
    iterator = TranscriptIterator(transcript)
    line_count = 0
    base_filename = os.path.splitext(os.path.basename(transcript_file_path))[0] 
    
    for speaker, text in iterator:
        chunk_data = {
            "conversation_id": base_filename,
            "chunk_id": line_count,
            "speaker_role": speaker,
            "content": text
        }
        
        res = httpx.post(os.getenv('WEBAPP_URL') + '/api/embed-call-chunk',
                   headers={
                       'Content-Type': 'application/json',
                       'X-Tenant-Id': tenant_id
                    },
                    json=chunk_data,
                    cookies=auth_cookies,
                    timeout=None)
        if (res.status_code >= 400):
            print("error storing chunk ")
            print(chunk_data)
            print(res.status_code)
            print(res.text)
            # just abort on error for now
            exit(1)
            
        line_count += 1
        


# Start by creating a user and logging in to Nile, the cookies will include the identifier we need
# replace the "login" with "sign-up" if the user doesn't already exists
user_data = {'email':'data_loader@test.org','password':'foobar'}
r = httpx.post(f"{os.getenv("WEBAPP_URL")}/api/login",
           headers={'Content-Type': 'application/json'},
           json=user_data,
           timeout=None)
auth_cookies = r.cookies

for tenant in tenants:
    # We need to create the tenant
    tenant_data = {'name': tenant}
    t = httpx.post(f"{os.getenv("WEBAPP_URL")}/api/tenants",
                   headers={'Content-Type': 'application/json'},
                   json=tenant_data,
                   cookies=auth_cookies,
                   timeout=None
                   )
    tenant_json = t.json()
    print(tenant_json)
    tenant_id = tenant_json['tenant_id']
    for filename in os.listdir(transcript_directory):
        if filename.endswith('_transcript.txt'):
            transcript_file_path = os.path.join(transcript_directory, filename)
            process_transcript(transcript_file_path, tenant_id)
            print(f"Processed: {filename}")
    
