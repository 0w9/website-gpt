<a href="/">
  <img src="https://ibb.co/wBXtqNF">
  <h1 align="center">Website GPT</h1>
</a>

A really simple interface that uses ChatGPT 4 + OpenAI function calling to generate HTML, (inline-) CSS and JS based on a user prompt. Using a simple API and a NextJS 14 frontend it's hosted for free.

## How this works

### GPT Functions

Before OpenAI released "functions" as a way to defining outputs of ChatGPT, getting a certain format was hard. What they now allow us to do is define "functions" and describe what they do. When providing them with an instruction to ChatGPT, it decides which to use. The tool/ function then gets "used" by the GPT, and returns a response in the provided function. This now moves the scope from songs, jokes and poems to also work in production, to for example generate HTML (html has a few rules to naming and format), or to control robots (by formatting the output as integers to send to motors, pumpts, etc.).
To give a better overview over this feature, I built this small app

### The tech stack/ logic

There's a API [backend](https://github.com/0w9/website-gpt/tree/main/src/backend) made in Flask that takes arguments and runs the GPT prompt. After some computation it returns the finished HTML.

On the [frontend](https://github.com/0w9/website-gpt/tree/main/src/frontend), which is made in NextJS and TailwindCSS, the user submits a form. They can select a prompt that describes the website (eg. "personal website for a photographer) and a few options. These options are parsed to determine if the user wants just HTML, also CSS (or just inline CSS) and if they need JS.

### Future ideas

Currently the app only supports a HTML site and a CSS stylesheet. Later it will be interesting to add a function to generate the JS code. This would be useful for just adding functionality or adding animations (eg. [Framer Motion](https://www.framer.com/motion/)).

- [X] Basic API
- [X] Support for HTML
- [ ] Generating CSS (in progress)
- [ ] Using JS
- [ ] Allowing usage of external packages

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
