"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage(){
    const router=useRouter()
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
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr/><p className="text-4xl"> Main Profile Page </p>
            <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Logout
            </button>
        </div>
    )
}