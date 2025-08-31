import getUserFromCookies from "@/app/lib/getUserFromCookieIdentifier";
import { connectDB } from "@/app/lib/mongoDB";
import { User } from "@/models/User";
import { NextResponse } from "next/server";


export async function GET() {

    await connectDB();

    const user = await getUserFromCookies();
    if(!user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const users = await User.find({}, "username");

    const result = users.map(user => ({username: user.username, id: user._id.toString()}))

    return NextResponse.json(result, {status: 200})
}