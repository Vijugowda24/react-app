import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberallowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const [ password, setPassword] = useState("")

  const passwordRef = useRef()

  const passwordGenerator = useCallback(()=>{
let pass = ""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed) str += "0123456789"
if(charAllowed) str += "!@#$%^&*()+_[]{}~'`"

for(let i=1; i<=length; i++){
  let char = Math.floor(Math.random()* str.length + 1)
  pass += str.charAt(char)
}
setPassword(pass)

}, [length, numberAllowed, charAllowed, setPassword])
useEffect(()=>{
  passwordGenerator()

}, [length, numberAllowed, charAllowed, passwordGenerator])

const copyPassordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 40)
window.navigator.clipboard.writeText(password)
}, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='my-3 text-white text-center'>password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          
          <button className="outline-none bg-blue-700 text-white px-3 py-0 5 shrink-0" onClick={copyPassordToClipboard}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-centergap-x-1">
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} onChange={()=> setNumberallowed(prev=> !prev)}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} onChange={()=> setCharAllowed(prev=> !prev)}/>
            <label htmlFor="numberInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
