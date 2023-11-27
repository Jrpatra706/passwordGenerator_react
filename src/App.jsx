import { useCallback, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numsAllowed,setNums]= useState(false);
  const [charsAllowed,setChars] = useState(false);
  const [password,setPassword] = useState('');
  
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

  },[length,numsAllowed,charsAllowed,setPassword]);

  return (
    <>
      <div className='container  w-full max-w-md max-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button className='outline-none bg-blue-700 text-white shrink-0 px-2 py-0.5' >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' />
            <label>Length({length})</label>
          </div>
        </div>
        
        {/* 
        <input type="checkbox" name="Numbers" id="" />
        <input type="checkbox" /> */}
      </div>
    </>
  )
}

export default App
