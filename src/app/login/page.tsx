"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage(){
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        

    })
    const onLogin=async ()=>{
        
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h2>Login</h2>
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
            <button onClick={onLogin} className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 transition duration-300">
                Login
            </button>
            <Link href="/signup" className="text-white " >Visit Signup page</Link>


            
        </div>
    )
}