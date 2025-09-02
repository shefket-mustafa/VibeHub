"use client"

import Link from "next/link"
import { GrLanguage } from "react-icons/gr"
import LogoutButton from "./LogoutButton"
import { AuthPayload } from "@/app/lib/getUserFromCookieIdentifier"

    type NavProps = { user: AuthPayload | null}

export default function Navbar({ user }: NavProps) {

    


    return(
<header className="border-b border-neutral-800 flex  relative z-10">
          <nav className="mx-auto max-w-5xl p-4 flex items-center gap-6">
            <Link href="/" className="font-semibold">
              VibeHub
            </Link>
            {user && <Link href="/feed" className="hover:underline">
              Feed
            </Link>}
            {user && <Link href="/profile" className="hover:underline">
              Profile
            </Link>}
          </nav>

          <div className="mx-auto max-w-5xl p-4 flex items-center gap-6">
            <GrLanguage />

          {user && <LogoutButton />}
          </div>
        </header>
    )
}
