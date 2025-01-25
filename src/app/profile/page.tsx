"use client";
import axios from "axios";
import Link from "next/link";
import React,{ useState }from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage(){
    const router=useRouter()
    const [data,setData]=useState("nothing")
    const logout= async () =>{
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout Successful')
            router.push('/login')
            
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
            
        }
    }
    const getUserDetails= async () =>{
        const res=await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
       
    

    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <h2>{data ==="nothing"? " Nothing here":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/><p className="text-4xl"> Main Profile Page </p>
            <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Logout
            </button>
            <button onClick={getUserDetails} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Get User Details
            </button>
        </div>
    )
}