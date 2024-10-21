import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FaUser} from 'react-icons/fa'
function Home() {

    const [claim,setclaim] = useState("hidden")
    const [showuser,setshowuser] = useState("hidden")
    const [history,sethistory] = useState([])
    const [user,setuser] = useState([])
    const [data,setdata] = useState([])
    const url = "http://localhost:7000/api/user/v1"

async function getusers() {
    const result = await axios.get(url+"/get-users")
    // console.log(result);
    const sorteddata = result.data.data.sort((a,b)=>{
    return a - b
    })
    console.log(sorteddata);
    
    setdata(result.data.data)

}

async function details() {

  let username = localStorage.getItem("username")
  const result = await axios.post(url+"/get-user",{username})
  console.log(result.data.data);
  setshowuser("block")
  setuser(result.data.data)

}


async function cliampoints(username){
  console.log(username);
    const result = await axios.patch("http://localhost:7000/api/user/v1/claim-points",{username}) 
    console.log(result);

    getusers()
    
    
}

async function claimhistory(username){
  const result = await axios.post(url+"/your-history",{username})
  sethistory(result.data.data)
  console.log(result.data.data);
  setclaim("flex")
}

useEffect(()=>{
    getusers()
    .catch((error)=>{
        console.log(error);
        
    })
        
    
},[])

  return (
    <div
    onClick={()=>{
      setshowuser("hidden")
    }}
    className='h-screen relative'>


     
      <nav className='bg-blue-900 py-5 flex justify-end items-center relative text-white'>
          <p onClick={()=>{
            details()
          }}>{localStorage.getItem("username")}</p>
          <FaUser className='mx-4'/>

          <div className={`${showuser} p-7 absolute top-7 right-7 w-fit h-fit bg-blue-500 text-black`}>
              {user.map((value)=>{

                return (
                    <>
                    <table className=' flex flex-col'>

                  <td>Email : {value.email}</td>
                  <td>First Name : {value.firstName}</td>
                  <td>Last Name : {value.lastName}</td>
                  <td>Username : {value.username}</td>
                    </table>
                    </>
                )
              })}
          </div>
      </nav>
      
      {
        data.map((value,index)=>{
            return ( <>
            <table className='flex w-full justify-between border'>

                    <td className='mx-6'>

                        <h1 onClick={()=>{
                          cliampoints(value.username)
                        }}>Name : {value.username}</h1>
                        <h1>Rank : {index+1}</h1>
                      </td>
                      <td className=''>
                          <h1 
                          onClick={()=>{
                            claimhistory(value.username)
                          }}
                          >$Prize: {value.Points}</h1>
                      </td>
                      <td className='mx-6'>
                          <h1>{value.Points}</h1>
                      </td>
            </table>
            </>
            )
        })
      }

      <div 
      onClick={()=>{
        setclaim("hidden")
      }}
      className={`absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center ${claim}`}>
          <div className='w-fit h-fit p-8 rounded bg-white text-black'>
            {
              history.map((value)=>{
                
                
                 return (

                  <>
                  <table className='border w-full p-5 m-3'>

                  <td>Date:{value.date}</td>
                  <td>Points Claimed : {value.pointsAwarded}</td>
                  </table>
                  </>
                 )
              })
            }
          </div>
      </div>
    </div>
  )
}

export default Home
