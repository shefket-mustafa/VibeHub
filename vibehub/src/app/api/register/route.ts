import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongoDB";
import User from "@/models/User";



export async function  POST(req: Request) {
    await connectDB(); // Connect if not already connected

    const { email, username, password } = await req.json();

    if(!email || !username || !password){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    const existing = await User.findOne({ email });

    if(existing){
        return NextResponse.json({error: "Email already in use!"}, {status: 409})
    }

    return NextResponse.json({ok:true})
}