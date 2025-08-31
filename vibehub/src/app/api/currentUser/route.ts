import getUserFromCookies from "@/app/lib/getUserFromCookieIdentifier";
import { NextResponse } from "next/server";


export async function GET() {

    const user = await getUserFromCookies();

    if(!user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    return NextResponse.json({user})
}