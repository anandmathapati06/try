import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [firstName,setfirstname] = useState("")
  const [lastName,setlastname] = useState("")
  const [email,setemail] = useState("")
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")

  const navigate = useNavigate()
  const url = "http://localhost:7000/api/auth/v1/register"

  async function register(){

    
    
    const result = await axios.post(url,{firstName,lastName,email,username,password})
      console.log(result);

      navigate("/login")
      
  }


  return (
    <>
    <div className='text-white h-screen bg-slate-900  flex flex-col justify-center items-center'>
    <h1 className="text-3xl font-bold mb-6" >Register</h1>
    <div className='grid grid-cols-1 gap-5 border p-9 px-[70px] rounded'>
      <div className='flex flex-col'>
        <label  htmlFor="">Firstname</label>
        <input className='text-black'
        onChange={(e)=>{
          setfirstname(e.target.value)
        }}
        type="text" name='firstname'/>
      </div>

    <div className='flex flex-col'>

      <label htmlFor="">Lastname</label>
      <input className='text-black'
      onChange={(e)=>{
        setlastname(e.target.value)
      }}
      type="text" name='lastname'/>
    </div>

    <div className='flex flex-col'>

      <label htmlFor="">Email</label>
      <input className='text-black'
      onChange={(e)=>{
        setemail(e.target.value)
      }}
      type="email" name='email'/>
    </div>

    <div className='flex flex-col'>

      <label htmlFor="">Username</label>
      <input className='text-black'
      onChange={(e)=>{
        setusername(e.target.value)
      }}
      type="text" name='username'/>
    </div>

    <div className='flex flex-col'>

      <label htmlFor="">Password</label>
      <input className='text-black'
      onChange={(e)=>{
        setpassword(e.target.value)
      }}
      type="password" name='password'/>
    </div>

    <button
    className='bg-blue-900 rounded'
    onClick={()=>{
      register().catch(()=>{
        alert("enter required details")
      })
    }}>submit</button>

    <Link to='/login'>
      already have account
    </Link>
    </div>
    </div>
    </>
  )
}

export default App
