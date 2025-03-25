import { useState, useEffect } from 'react'
import prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import Editor from 'react-simple-code-editor'
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import './App.css'

function App() {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("***Output will be displayed here***")

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function review() {
    console.log("hy hy");
    try {
      const res = await fetch('http://localhost:4000/api/v1/ai/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })
      const data = await res.json()
      setOutput(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container">
        < div className="left">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript)}
              padding={18}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 15,
                backgroundColor: "rgb(36, 37, 37)",
                width: "100%",
                height: "100%",
              
              }}
            />
          <div className='btn' onClick={review}>
            REVIEW
          </div>
        </div>
        <div className="right">
          <Markdown
           rehypePlugins={[rehypeHighlight]}
          >{output}</Markdown>
        </div>
      </div>
    </>
  )
}

export default App
