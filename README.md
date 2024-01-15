# Website GPT 🔨🤖

A really simple interface that uses ChatGPT 4 + OpenAI function calling to generate HTML, (inline-) CSS and JS based on a user prompt. Using a simple API and a NextJS 14 frontend it's hosted for free.

## Setup

### Run the API

#### 1. Install requirements
```bash
python3 -m pip install -r requirements.txt
```

#### 2. Set the environment variables
After renaming the file `.env.example` to `.env` you can 
define the OpenAI API key. Get the API key [here](https://beta.openai.com/) (billing is required, every website is a few cents).

#### 3. Run the API
```bash
python3 main.py
```
---

### Run the frontend

#### 1. Install requirements
```bash
npm install 
```

### 2. Start NextJS
```bash
npm run dev
```