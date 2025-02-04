import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/userModel";


connect()

export async function POST(request:NextResponse){
    try {
        const reqBody=await request.json()
        const {token}=reqBody;
        console.log(token)

        const user=await User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}

        })
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:500})
        }
        console.log(user)
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfuly",
            success:true
        })
        
    } catch (error:any) {
        throw new Error(error.message);
        
    }
    
}

