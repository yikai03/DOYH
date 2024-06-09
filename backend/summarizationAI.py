# Gemini
import re
import json
import time
import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyAL9aZwYkWtGtJE1SOQR7DbKGbyTSgbXP0")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
]



# question = """
# Peter Wee is a mentor at NEXEA, an early Startup Accelerator, Angel Network and Venture Capital. NEXEA has invested in more than 35 Startups across Southeast Asia and is known for creating value in their investments. NEXEA is backed by experienced entrepreneurs who have done their M&As and IPOs or are CEOs of publicly listed companies. More importantly, they want to give back to the next wave of entrepreneurs.

# Peter has successfully mentored companies at NEXEA. He is also an advisor to a large regional F&B player and a Council Member of MBAN (the Malaysian Business Angel Network).

# Prior to this, he was an Executive Director at PwC a consulting company and served for 20 years. He then led Ricoh Malaysia as their Managing Director leading the country operations, initiated M&A of the IT business and transformation of business model. He was later Managing Director of Crop Protection a multinational chemical producer and distributor and later Rotiboy a bakery manufacturer and retailer.

# His specialism in coaching, past experiences in assisting companies in diverse industries in the consulting space makes him ideal for innovation and leading startups in their growth journey. He is also a tax specialist.
# """

# response = model.generate_content(question)
# print(response.text)


def main(text, wordCount):
    system_instructions = f"""
    The user will pass in text prompts to the AI model. Based on the provided text, you need to summarize the text. The output should be in a string format. The word count of the summarization should be aroung ${wordCount} You should not provide any other information in the output. You should not gives any description, example or other relevant information other than the summary. The output should be in the exact format as mentioned above. The AI model will be trained based on the provided instructions. The AI model will be tested based on the provided instructions. The AI model will be evaluated.
    """

    model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    safety_settings=safety_settings,
    generation_config=generation_config,
    system_instruction=system_instructions,
    )

    response = model.generate_content(text)
    return response.text