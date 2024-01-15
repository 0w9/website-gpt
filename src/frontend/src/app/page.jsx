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
    setGenerateInlineCSS
  } = useWebsiteConfig()

  return (
    <main className="flex min-h-screen flex-col items-center space-y-12 p-24">
      <h1 className="text-4xl font-bold text-center">Generate your own website!</h1>
      <form className='space-x-4 space-y-8' action={generateWebsite}>
        <input name='prompt' type="text" placeholder="Website idea" className="border-2 border-gray-300 rounded-md px-8 py-4" onChange={(e) => setPrompt(e.target.value)} />
        <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded'>Generate</button>

        <div className="grid grid-rows-2">
          <div className='flex items-center mb-4 space-y-4 space-x-4'>
              <input id="generate_js" name="generate_js" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => setGenerateJS(e.target.checked)} checked={generate_js} />
              <label htmlFor="generate_js" className="ms-2 text-sm font-medium">Generate JS</label>
              <input id="generate_css" name='generate_css' type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => setGenerateCSS(e.target.checked)} checked={generate_css} />
              <label htmlFor="generate_css" className="ms-2 text-sm font-medium">Generate CSS</label>
          </div>
          <div className='flex items-center'>
              <input id="generate_inlinecss" name="generate_inlinecss" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => setGenerateInlineCSS(e.target.checked)} checked={generate_inlinecss} />
              <label htmlFor="generate_inlinecss" className="ms-2 text-sm font-medium" >Generate Inline CSS</label>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center mt-20">
        <pre>{JSON.stringify({ prompt, generate_js, generate_css, generate_inlinecss }, null, 2)}</pre>
      </div>
    </main>
  )
}
