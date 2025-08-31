import "server-only";
// a tiny safeguard that tells Next.js:
// “If someone tries to import this file into client code, throw an error.”
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type AuthPayload = { userId: string; email: string; username: string };

export default async function getUserFromCookies(): Promise<AuthPayload | null> {
  const data = await cookies();
  const token = data.get("token")?.value;
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT secret!");

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload & AuthPayload;
    if (
      decoded &&
      typeof decoded === "object" &&
      "userId" in decoded &&
      "email" in decoded &&
      "username" in decoded
    ) {
      return {
        userId: decoded.userId,
        email: decoded.email,
        username: decoded.username,
      };
    }
    return null;
  } catch {
    return null;
  }
}
