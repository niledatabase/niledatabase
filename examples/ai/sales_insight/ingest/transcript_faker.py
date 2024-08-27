import os
import openai;
import logging;
from slugify import slugify
from constants import tenants, industries, transcript_directory
from dotenv import load_dotenv
load_dotenv()

# We need some sales calls for the example, and we don't have any real calls that we can share.
# So we're going to use a fake data generator to create some calls.
# First step is to ask OpenAI to generate transcripts of sales calls. We'll use 5 example tenants, each with 10 calls.

client = openai.OpenAI()

for curr_tenant in range(5):
    tenant = tenants[curr_tenant]
    industry = industries[curr_tenant]
    for curr_call in range(10):
        transcript = client.chat.completions.create(
                model = "gpt-4o",
                messages = [
                    {
                        "role": "user",
                        "content" : 
                            f'Please generate a transcript of a sales call between a sales rep and a customer for a {industry} company named {tenant}.' 
                            f'Make sure the conversation is realistic and includes customer pain points, objections, and next steps.'
                            f'Only return the transcript, no other text.' 
                            f'Make sure the transcript clearly shows who said what. Refer to the sales rep as "Sales Rep" and the customer as "Customer".' 
                            f'Keep it relatively short.',
                    },
                ],   
            )
    
        f = open(f'{transcript_directory}/{slugify(tenant)}__{curr_call}_transcript.txt', 'w+')
        f.write(transcript.choices[0].message.content)
        f.close()
    
    

    