import requests
from bs4 import BeautifulSoup
import logging
import os
import json
import random

logger = logging.getLogger(__name__)

def crawl(alph):
    words_list = []
    word_id = 1  # Start with ID 1
    
    for letter in test:
        print(letter)
        logger.info(f"Processing letter {letter}...")
        url = f"http://www.mso.anu.edu.au/~ralph/OPTED/v003/wb1913_{letter}.html"
        req = requests.get(url)
        soup = BeautifulSoup(req.text, "html.parser")
        dictionary = soup.find_all('p')
        for entries in dictionary:
            word = entries.find('b').getText()
            pos = entries.find('i').getText()
            cut = len(word) + len(pos) + 4
            definition = entries.getText()[cut:]
            words_list.append({"id": word_id, "name": word, "definition": definition})
            word_id += 1  # Increment the ID for the next word
    return words_list

def generate_packs(words_list, num_packs=10):
    random.shuffle(words_list)
    packs = []
    words_per_pack = 10  # Define how many words per pack

    for i in range(num_packs):
        pack_name = f"Pack {i+1}"
        price = random.choice(range(50, 1050, 50))
        start_index = i * words_per_pack
        pack_words = words_list[start_index:start_index + words_per_pack]
        packs.append({"name": pack_name, "price": price, "words": pack_words})

    return packs

if __name__ == '__main__':
    test = "a"
    alph = "abcdefghijklmnopqrstuvwxyz"
    if os.environ.get('DEV'):
        alph = "x"
    
    words_list = crawl(alph)
    packs = generate_packs(words_list, num_packs=10)
    
    with open('generated_wordpacks.json', 'w') as json_file:
        json.dump(packs, json_file, indent=4)
    
    logger.info("Word packs generated and saved to 'generated_wordpacks.json'.")
