import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numsAllowed,setNums]= useState(false);
  const [charsAllowed,setChars] = useState(false);
  const [password,setPassword] = useState('');
  
  const passwdRef = useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numsAllowed){
      str+='1234567890';
    }
    if(charsAllowed){
      str+='!@#$%^&*~';
    }
    for(let i=1;i<=length;i++){
      let charr = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(charr);
    }
    setPassword(pass);

  },[length,numsAllowed,charsAllowed]);

  useEffect(()=>{
    passwordGenerator()
  },[length,numsAllowed,charsAllowed,passwordGenerator]);

  return (
    <>
      <div className='container  w-full max-w-md max-auto shadow-md rounded-lg px-4 my-10 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input ref={passwdRef} type="text" value={password} className='text-black outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button
          onClick={()=>{
            passwdRef.current?.select();
            window.navigator.clipboard.writeText(passwdRef.current.value);
          }}
           className='copy-btn outline-none bg-blue-700 text-white shrink-0 px-2 py-0.5' >
            Copy
          </button>
        </div>
        <div className='text-white flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={35} 
            value={length} className='cursor-pointer' 
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label className='text-white'>Length({length})</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numsAllowed} id='numberInput' 
            onChange={()=>{
              setNums((prev) => !prev);
            }}/>
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charsAllowed} id='characterInput' 
            onChange={()=>{
              setChars((prev) => !prev);
            }}/>
            <label >Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
