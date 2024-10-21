import React from 'react'
import { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
function Login() {

    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")

    const navigate = useNavigate()

        const url = "http://localhost:7000/api/auth/v1/login"
    async function auth(){
        const result = await axios.post(url,{username,password})
        localStorage.setItem("username",username)
                navigate("/home")
        return result
         
    }   
  return (
    <div className='text-white h-screen bg-slate-900 flex flex-col justify-center items-center '>
      <h1 className='text-[30px] font-bold'>Login</h1>
    <div className='flex flex-col border p-8 rounded '>
    <label htmlFor="">Username</label>
      <input className='text-black mb-6'
      onChange={(e)=>{
          setusername(e.target.value)
        }}
        type="text" />
        <label htmlFor="">Password</label>
      <input className='text-black'
      onChange={(e)=>{
          setpassword(e.target.value)
        }}
        type="password" />
        <button className='bg-blue-900 my-5 rounded'
        onClick={()=>{
            auth()
            .catch(()=>{
                alert("Error")
            })
        }}
        >Login</button>
        <Link to="/">
        <button >Don't have an account</button>
      </Link>
        </div>

      
    </div>
  )
}
 
export default Login
