import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="container">
      <h1>Password generator</h1>

      <div className="password-display">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div className="settings">
        <div className="setting-group">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className="setting-group">
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="setting-group">
          <input
            type="checkbox"
            id="characterInput"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
