from flask import Flask, request, jsonify
from openai import Client
import json, os

app = Flask(__name__)

@app.route('/generate-website', methods=['POST'])
def generate_website():
    prompt = request.json.get('prompt')
    client = Client(api_key=os.environ.get("OPENAI_API_KEY"))
    chat_completion = client.chat.completions.create(
        messages=[{
            "role": "user",
            "content": f"Create a website for: {prompt}. Also create a stylesheet.",
        }],
        model="gpt-3.5-turbo",
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "create_stylesheet",
                    "description": "Create a style sheet (CSS) for a HTML page.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "tags": {
                                "type": "array",
                                "description": "A list of all selectors",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "selector": {
                                            "type": "string",
                                            "description": "The selector (like .classname, #id or the tag name)"
                                        },
                                        # "style": {
                                        #     "type": "array",
                                        #     "description": "The styling for the selectorThe tag style as inline CSS. List of each property.",
                                        #     "items": {
                                        #         "type": "object",
                                        #         "properties": {
                                        #             "selector": {
                                        #                 "type": "string",
                                        #                 "description": "The property you want to change, like the „backgroundColor“."
                                        #             },
                                        #             "value": {
                                        #                 "type": "string",
                                        #                 "description": "The value for the property, like „red“."
                                        #             }
                                        #         }
                                        #     }
                                        # }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
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
                                        "tag": {
                                            "type": "string",
                                            "description": "The tag",
                                            "enum": [
                                                "button",
                                                "p",
                                                "h1",
                                                "table",
                                                "tr",
                                                "td",
                                                "th",
                                                "div",
                                                "span",
                                                "img",
                                                "a",
                                                "ul",
                                                "ol",
                                                "li",
                                                "br",
                                                "hr",
                                                "pre",
                                                "code",
                                                "em",
                                                "strong",
                                                "i",
                                                "b",
                                                "u",
                                                "s",
                                                "sub",
                                                "sup",
                                                "mark",
                                                "q",
                                                "cite",
                                                "abbr",
                                                "dfn",
                                                "form",
                                                "input"
                                            ]
                                        },
                                        "style": {
                                            "type": "string",
                                            "description": "The tag style as inline CSS"
                                        },
                                        "content": {
                                            "type": "string",
                                            "description": "The text content of the tag"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ],
        # tool_choice=
        #     {{
        #         "type": "function",
        #         "function": {
        #             "name": "create_website",
        #         }
        #     },
        #     {
        #         "type": "function",
        #         "function": {
        #             "name": "create_stylesheet",
        #         }
        #     }
        # },
    )
    
    output = [tool_call.function.arguments for tool_call in chat_completion.choices[0].message.tool_calls ]
    
    return jsonify({'website': json.dumps(output)})
        
        
    # tags = json.loads(chat_completion.choices[0].message.tool_calls[0].function.arguments)["tags"]
    # html_content = "<html>\n"
    # for tag in tags:
    #     html_content += f"<{tag['tag']} style='{tag['style']}'>{tag['content']}</{tag['tag']}>\n"
    # html_content += "</html>"
    # return jsonify({'html_content': html_content})

if __name__ == '__main__':
    app.run()
