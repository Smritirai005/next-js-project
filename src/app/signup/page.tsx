"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:"",

    })
    const onSignup=async ()=>{
        try {
            const response=await axios.post("/api/users/signup",user)
        } catch (error:any) {
            toast.error(error.message);
            
        }
        router.push("/login")
        
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2>Signup</h2>
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=> setUser({...user,username:e.target.value})}
            placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=> setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="text"
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})}
            placeholder="password"
            />
            <button onClick={onSignup} className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 transition duration-300">
                {buttonDisabled ? "No signup" :"signup"}
            </button>
            <Link href="/login" className="text-white " >Visit Login page</Link>


            
        </div>
    )
}