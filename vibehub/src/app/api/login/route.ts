import { connectDB } from "@/app/lib/mongoDB";
import {User} from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("[Login] Missing JWT_SECRET");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const token = jwt.sign(
        { userId: user._id.toString(), email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );


      const res = NextResponse.json({ ok: true }, { status: 200 });
      res.cookies.set("token", token, {
        httpOnly: true, //JS can't read it (safer than localStorage)
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // only send over HTTPS in prod
        path: "/",  // cookie is valid for all routes
        maxAge: 60 * 60 * 24 * 7,  // expire in 7 days
      });
      return res;
    }
