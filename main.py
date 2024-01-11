import os
import openai

prompt = input("Enter your prompt: ")

openai.api_key = os.environ['OPENAI_API_KEY']
client = openai.Client()
chat_completion = client.chat.completions.create(
    messages=[{
        "role": "user",
        "content": f"Create a website for: {prompt}",
    }],
    model="gpt-3.5-turbo",
    tools=[{
        "type": "function",
        "function": {
            "name": "create_website",
            "description": "Create a web page",
            "parameters": {
                "type": "object",
                "properties": {
                    "tags": {
                        "type": "array",
                        "description": "HTML tags in order",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type":
                                    "string",
                                    "description":
                                    "The tag name",
                                    "enum": [
                                        "button", "p", "h1", "table", "tr",
                                        "td", "th", "div", "span", "img", "a",
                                        "ul", "ol", "li", "br", "hr", "pre",
                                        "code", "em", "strong", "i", "b", "u",
                                        "s", "sub", "sup", "mark", "q", "cite",
                                        "abbr", "dfn"
                                    ]
                                },
                                "style": {
                                    "type": "string",
                                    "description":
                                    "The tag style as inline CSS"
                                },
                                "content": {
                                    "type": "string",
                                    "description":
                                    "The text content of the tag"
                                }
                            }
                        }
                    }
                }
            }
        }
    }])

import json

tags = json.loads(chat_completion.choices[0].message.tool_calls[0].function.
                  arguments)["tags"]

print(tags)

html_content = "<html>\n"
for tag in tags:
  html_content += f"<{tag['name']} style='{tag['style']}'>{tag['content']}</{tag['name']}>\n"

html_content += "</html>"

# Overwrite the content in index.html
with open("index.html", "w") as file:
  file.write(html_content)
