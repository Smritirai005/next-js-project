import { connect } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextResponse) {
    try {
        const reqBody=await request.json()
        const {userame,email,password}=reqBody
        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exist"},{status: 400})


        }
        //hash password
        const salt=await bcryptjs.gensalt(10)
        const hashedPassword=await bcryptjs.hash
        (password,salt)
    } catch (error) {
        
    }
    
}

