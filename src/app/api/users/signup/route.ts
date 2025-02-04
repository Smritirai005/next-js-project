import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
const bcryptjs = require("bcryptjs");


connect()

export async function POST(request: NextResponse) {
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exist"},{status: 400})


        }
        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash
        (password,salt)

        const newUser=new User({
            username,
            email,
            password:hashedPassword,


        })
        const savedUser=await newUser.save()

        //send verification email
        await sendEmail({email,emailType: "VERIFY" ,userID: savedUser._id })
        
        
        return NextResponse.json({
            message:"Usercreated successfully ",
            success:true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message},
        {status:500})
    }
    
}

