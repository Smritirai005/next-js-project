"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
  

export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        

    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false)
    const [loading,setLoading]=React.useState(false)

    const onLogin=async ()=>{
        try {
            setLoading(true);
            const response=await axios.post("/api/users/login",user);
            toast.success("Login success")
            router.push("/profile")
        } catch (error:any) {
            toast.error(error.message);

            
        }finally{
            setLoading(false);
        }
        
    }
    useEffect(()=>{
            if(user.email.length>0 && user.password.length>0){
                setButtonDisabled(false);
            }
            else{
                setButtonDisabled(true);
            }
        })
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