from flask import Flask, request, jsonify
from openai import Client
import json, os

def jsonToCSS(cssJSON):
    cssObj = json.loads(cssJSON)
    cssString = ""
    
    cssObj = cssObj["tags"]
    for tag in cssObj:
        cssString += f"{tag['selector']} {{\n"
        for style in tag["style"]:
            cssString += f"    {style['selector']}: {style['value']};\n"
        cssString += "}\n"
    
    with open('/Users/lennarddorst/projects/website-gpt/src/src/backend/out/output.css', 'w+') as file:
        file.write(cssString)

def jsonToHTML(htmlJSON):
    htmlObj = json.loads(htmlJSON)
    htmlString = "<html>"
    htmlString += '<link rel="stylesheet" type="text/css" href="output.css">'
    
    htmlObj = htmlObj["tags"]
    for tag in htmlObj:
        htmlString += f"""<{tag['tag']}>{tag['content']}</{tag['tag']}>\n"""
    
    htmlString += "</html>"
    with open('/Users/lennarddorst/projects/website-gpt/src/src/backend/out/index.html', 'w+') as file:
        file.write(htmlString)

app = Flask(__name__)

@app.route('/generate-website', methods=['POST'])
def generate_website():
    prompt = request.json.get('prompt')
    client = Client(api_key=os.environ.get("OPENAI_API_KEY"))
    
    chat_completion_html = client.chat.completions.create(
        messages=[{
            "role": "user",
            "content": f"Create HTML for {prompt}.",
        }],
        model="gpt-4",
    
        tools=[
        {
            "type": "function",
            "function": {
                "name": "create_website",
                "description": "Create a HTML site",
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
    tool_choice=
        {
            "type": "function",
            "function": {
                "name": "create_website",
            }
        }
    )
    
    
    chat_completion_css = client.chat.completions.create(
        messages=[{
            "role": "user",
            "content": f"You're given the following representation of HTML: {chat_completion_html.choices[0].message.tool_calls[0].function.arguments} create CSS for it to look good as {prompt}.",
        }],
        model="gpt-4",
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "create_css",
                    "description": "Create a CSS for a HTML page.",
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
                                        "style": {
                                            "type": "array",
                                            "description": "The styling for the selectorThe tag style as inline CSS. List of each property.",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "selector": {
                                                        "type": "string",
                                                        "description": "The property you want to change, like the „backgroundColor“."
                                                    },
                                                    "value": {
                                                        "type": "string",
                                                        "description": "The value for the property, like „red“."
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ],
        tool_choice=
            {
                "type": "function",
                "function": {
                    "name": "create_css",
                }
            }
        
    )
    

    print(chat_completion_html.choices[0].message.tool_calls[0].function.arguments)
    print("\n\n\n")
    print(chat_completion_css.choices[0].message.tool_calls[0].function.arguments)
    
    jsonToCSS(chat_completion_css.choices[0].message.tool_calls[0].function.arguments)
    jsonToHTML(chat_completion_html.choices[0].message.tool_calls[0].function.arguments)
    
    return jsonify({'uh': chat_completion_html.model_dump_json()})
        
        
    # tags = json.loads(chat_completion_html.choices[0].message.tool_calls[0].function.arguments)["tags"]
    # html_content = "<html>\n"
    # for tag in tags:
    #     html_content += f"<{tag['tag']} style='{tag['style']}'>{tag['content']}</{tag['tag']}>\n"
    # html_content += "</html>"
    # return jsonify({'html_content': html_content})

if __name__ == '__main__':
    app.run()
    
