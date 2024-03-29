"use client"

import { useWebsiteConfig } from "../lib/state"
import { generateWebsite } from "../lib/api"
import { AnimatePresence, motion } from "framer-motion"
import HomePageDecorations from "../components/HomePageDecorations"

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
    setApiKey,
  } = useWebsiteConfig()

  async function generate(e) {
    const prompt = e.get("prompt")
    const generate_js = e.get("generate_js")
    const generate_css = e.get("generate_css")
    const generate_inlinecss = e.get("generate_inlinecss")
    const api_key = e.get("api_key")

    console.log({
      prompt,
      generate_js,
      generate_css,
      generate_inlinecss,
      api_key,
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-4 py-24 sm:p-24">
      <HomePageDecorations />
      <h1 className="text-2xl sm:text-4xl font-bold text-center">Header</h1>
      <h1 className="text-lg sm:text-2xl font-bold text-center">Subheader</h1>
      <form
        className="space-y-4 max-w-lg w-full flex flex-col bg-gradient-to-br from-indigo-100 to-purple-200 p-8 rounded-lg"
        action={generateWebsite}
      >
        <input
          name="prompt"
          type="text"
          placeholder="Website idea"
          className="border-2 border-gray-300 rounded-md px-4 py-2"
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex items-center space-y-4 space-x-4 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mx-auto max-w-sm">
            <div className="flex items-center">
              <input
                id="generate_js"
                name="generate_js"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                    focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setGenerateJS(e.target.checked)}
                checked={generate_js}
              />
              <label htmlFor="generate_js" className="ms-2 text-sm font-medium">
                Generate JS
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="generate_css"
                name="generate_css"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setGenerateCSS(e.target.checked)}
                checked={generate_css}
              />
              <label htmlFor="generate_css" className="ms-2 text-sm font-medium">
                Generate CSS
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="generate_inlinecss"
                name="generate_inlinecss"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setGenerateInlineCSS(e.target.checked)}
                checked={generate_inlinecss}
              />
              <label htmlFor="generate_inlinecss" className="ms-2 text-sm font-medium">
                Generate Inline CSS
              </label>
            </div>
          </div>
        </div>

        <div className="h-12">
          <AnimatePresence>
            {prompt.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                layout
                exit={{ opacity: 0, y: 24 }}
                className="w-full"
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <input
                  name="prompt"
                  type="text"
                  placeholder="Enter your API Key here"
                  className="border-2 border-gray-300 rounded-md px-4 py-2 w-full"
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>
      </form>

      <div className="flex flex-col items-center mt-20">
        <code>
          {JSON.stringify({ prompt, generate_js, generate_css, generate_inlinecss, api_key }, null, 2)}
        </code>
      </div>
    </main>
  )
}
