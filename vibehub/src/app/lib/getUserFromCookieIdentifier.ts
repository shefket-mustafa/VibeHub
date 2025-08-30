import "server-only"
// a tiny safeguard that tells Next.js:
// “If someone tries to import this file into client code, throw an error.”
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export default async function getUserFromCookies() {


    const data = await cookies();
    const token  = data.get("token")?.value;
    if(!token) return null;

    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("Missing JWT secret!")

        try{
            return jwt.verify(token, secret);

        }catch {
            return null
        }
}