"use client"
import { useRouter } from "next/navigation";


export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async () => {
    
        await fetch("/api/logout", {method: "POST"});
        router.push("/auth")
    
    }

    return(
            <button onClick={handleLogout} className="hover:underline cursor-pointer">
                Logout
            </button>
    )
}