# import server as s
import ast

# # s.storeMentorData("name", "description", "tags", "image")

# info = s.getMentorData()
# print(info)


# Mock AI tag generation function
# response = "['Business', 'Technology', 'People']\n"  # This is your mock response

# # Convert response string to a list
# tags = ast.literal_eval(response.strip())

# for i in tags:
#     print("haha", i)


import server

text = server.extractTextFromPDF("/Users/herrpinn/DOYH/DOYH/backend/resume/resume_out/resume_live.pdf")

print("test:", text)