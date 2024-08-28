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
from ..ai_utils import get_embedding, EmbeddingTasks
from ..constants import transcript_directory, chunked_transcript_directory

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
    
def process_transcript(transcript_file_path):
    f = open(transcript_file_path, 'r')
    transcript = f.read()
    f.close()
    
    iterator = TranscriptIterator(transcript)
    
    # Todo: need to output a conversation identifier
    import csv
    from datetime import datetime

    # Extract the base filename without extension
    base_filename = os.path.splitext(os.path.basename(transcript_file_path))[0]

    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Create the output CSV file
    output_file = os.path.join(chunked_transcript_directory, f'{base_filename}.csv')
    line_count = 0
    with open(output_file, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Conversation', 'Chunk_id', 'Speaker', 'Text', 'Embedding'])  # Write header

        # Write each speaker and text as a row to the CSV
        for speaker, text in iterator:
            embedding = get_embedding(text, EmbeddingTasks.SEARCH_DOCUMENT)
            writer.writerow([base_filename, line_count, speaker, text, embedding])
            print(f"Writing: {speaker}: {text[:50]}...")  # Print first 50 chars for debugging
            line_count += 1
        


for filename in os.listdir(transcript_directory):
    if filename.endswith('_transcript.txt'):
        transcript_file_path = os.path.join(transcript_directory, filename)
        process_transcript(transcript_file_path)
        print(f"Processed: {filename}")
    
