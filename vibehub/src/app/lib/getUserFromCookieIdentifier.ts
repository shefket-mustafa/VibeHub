import "server-only"
// a tiny safeguard that tells Next.js:
// “If someone tries to import this file into client code, throw an error.”
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type AuthPayload = { userId: string; email: string };


export default async function getUserFromCookies():Promise<AuthPayload | null> {


    const data = await cookies();
    const token  = data.get("token")?.value;
    if(!token) return null;

    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("Missing JWT secret!")

        try {
            const decoded = jwt.verify(token, secret);
            if (decoded && typeof decoded === "object" && "userId" in decoded && "email" in decoded) {
                return {
                  userId: String((decoded as any).userId),
                  email: String((decoded as any).email),
                };
              }
              return null;
            } catch {
              return null;
            }
}