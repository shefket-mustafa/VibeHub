import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongoDB";
import {User} from "@/models/User";
import bcrypt from "bcrypt"


export async function  POST(req: Request) {
    try{

        await connectDB(); // Connect if not already connected
        
        const { email, username, password } = await req.json();
        
        if(!email || !username || !password){
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }
        
        const existing = await User.findOne({ email });
        
        if(existing){
            return NextResponse.json({error: "Email already in use!"}, {status: 409})
        }
        
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, passwordHash })
        
        return NextResponse.json({ok:true, id: user._id.toString()}, {status: 201})
    }catch(err){
        console.error("[Register error]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}