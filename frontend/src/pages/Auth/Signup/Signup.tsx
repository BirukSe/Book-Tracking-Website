import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const handleSignup=async ()=>{
    console.log("i am here", email, password)
    try{
      console.log("I am here, wtf is wrogn")
      const response=await fetch('http://localhost:3000/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })

      })
      console.log("email:",email,"password:", password, response);
      const result=await response.json();
      if(!result){
        console.log("Something went wrong, Please try again")
        setError("Something went wrong, Please try again");
      }
      navigate('/');

    }catch(error){
      console.log("Login failed", error);
      setError("Login failed, please check your credentials and try again.");
      console.log(error);
    }finally{

    }
    
  
  }
  return (
    <div className="min-h-screen min-w-full bg-gray-800 rounded-lg flex">
    <div className="w-full sm:w-[50%]">
      <img src="read.jpg" className="h-full w-[100%] sm:block hidden"/>
    </div>
    <div className="flex flex-col items-center justify-center text-white sm:w-[50%] w-full mr-7">
  
   <h1 className="mb-14 font-extrabold text-xl">Welcome to Booky</h1>
   {error?<h1 className="italic text-[8px] text-red-500">{error}</h1>:null}
   <input placeholder="Email" type="email" className="border-2 border-white rounded mb-3 pacifico" onChange={(e)=>setEmail(e.target.value)} value={email}/>
  
   <input placeholder="Password" type="password" className="border-2 border-white rounded mb-3 pacifico" onChange={(e)=>setPassword(e.target.value)} value={password}/>
   <p className="text-[10px] mr-18">Already have an account? <a href="/login" className="underline text-blue-500">login</a></p>
   <button className="bg-green-500 rounded px-3 cursor-pointer hover:bg-green-800" onClick={handleSignup}>Signup</button>
   

    </div>
   
  </div>
  )
}

export default Signup;
