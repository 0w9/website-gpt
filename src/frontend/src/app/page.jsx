"use client"

import Image from 'next/image'
import { useWebsiteConfig } from '../lib/state'
import { generateWebsite } from '../lib/api'

export default function Home() {
  const {
    prompt,
    setPrompt,
    generate_js,
    setGenerateJS,
    generate_css,
    setGenerateCSS,
    generate_inlinecss, 
    setGenerateInlineCSS,
    api_key,
    setApiKey
  } = useWebsiteConfig()

  async function generate(e) {
    const prompt = e.get('prompt')
    const generate_js = e.get('generate_js')
    const generate_css = e.get('generate_css')
    const generate_inlinecss = e.get('generate_inlinecss')
    const api_key = e.get('api_key')

    console.log({
      prompt,
      generate_js,
      generate_css,
      generate_inlinecss,
      api_key

    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24">
      <h1 className="text-4xl font-bold text-center">Generate your own website!</h1>
      <form className='space-x-4 space-y-8 grid' action={generate}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="prompt"
            placeholder='Website Idea'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='px-8 py-4 border-solid border-4 border-blue-500 rounded-md'
          />

          <input
            type="text"
            name="api_key"
            placeholder='OpenAI API Key'
            value={api_key}
            onChange={(e) => setApiKey(e.target.value)}
            className='px-8 py-4 border-solid border-4 border-blue-500 rounded-md'
          />

          <button
            type="submit"
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded'
          >
            Generate
          </button>

          <div className="grid grid-rows-2">
            <div>
              <input
                name="generate_js"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                // checked={generate_js}
                checked={false}
                onChange={(e) => setGenerateJS(e.target.checked)}
                disabled
              />

              <label
                htmlFor="generate_js"
                className="text-sm font-medium text-gray-400"
              >
                Generate JS
              </label>
            </div>

            <div aria-disabled>
              <input
                name="generate_inlinecss"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                checked={generate_inlinecss}
                onChange={(e) => setGenerateInlineCSS(e.target.checked)}
                disabled
              />

              <label
                htmlFor="generate_inlinecss"
                className="text-sm font-medium text-gray-400"
                disabled
              >
                Generate Inline CSS
              </label>
            </div>

            <div>
              <input
                name="generate_css"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                checked={generate_css}
                onChange={(e) => setGenerateCSS(e.target.checked)}
                disabled
              />

              <label
                htmlFor="generate_css"
                className="text-sm font-medium text-gray-400"
                disabled
              >
                Generate CSS
              </label>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center mt-20">
        <code>{JSON.stringify({ prompt, generate_js, generate_css, generate_inlinecss, api_key }, null, 2)}</code>
      </div>
    </main>
  )
}
