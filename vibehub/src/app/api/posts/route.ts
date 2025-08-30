import getUserFromCookies from "@/app/lib/getUserFromCookieIdentifier";
import { connectDB } from "@/app/lib/mongoDB";
import { Post } from "@/models/Post";
import { NextResponse } from "next/server";


export async function GET(){
    await connectDB();

    const user = await getUserFromCookies();

    if(!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const posts = await Post.find().sort({ createdAt: -1 })

    
    const result = posts.map((p) => ({
        _id: p._id.toString(),
        authorId: p.authorId.toString(),
        authorName: p.authorName,
        content: p.content,
        createdAt:
          p.createdAt instanceof Date ? p.createdAt.toISOString() : String(p.createdAt),
        updatedAt:
          p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt),
      }));

      return NextResponse.json(result, {status: 200})

}