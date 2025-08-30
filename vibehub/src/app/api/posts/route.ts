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

export async function POST(req: Request) {

    await connectDB();

    const user = await getUserFromCookies();

    if(!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const body = await req.json().catch(() => {});

    if(!body.content || body.content.length>200){
        return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }

    const newPost = await Post.create({
        authorId: user.userId,
        authorName: user.email.split("@")[0],
        content: body.content
    })

    return NextResponse.json(
        {
          _id: newPost._id.toString(),
          authorId: newPost.authorId.toString(),
          authorName: newPost.authorName,
          content: newPost.content,
          createdAt: newPost.createdAt.toISOString(),
          updatedAt: newPost.updatedAt.toISOString(),
        },
        { status: 201 }
      );
}