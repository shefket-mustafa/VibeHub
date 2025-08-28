"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/app/zod/register";

export default function RegisterPage() {

  const router = useRouter();

  const {register, 
  handleSubmit, 
  formState: {errors, isSubmitting},
  setError,} = useForm<RegisterFormData>({resolver: zodResolver(registerSchema)});

  const onSubmit = async (formData: RegisterFormData) => {

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })
  
    if(!res.ok){
      const data = await res.json().catch(() => {}); //failsafe if we dont have catch and if we get something not parsable the app will crash
      setError("root", {message: data?.error ?? "Something went wrong!"}) //"root" is a special key for form-level errors (not tied to one input).
      return;
    }
    router.push("/auth")
  
  }


  return (
    <section className="w-full max-w-sm">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create your <span className="text-teal-400">VibeHub</span> account
      </h1>

      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-neutral-800 p-5 space-y-4 bg-neutral-900/30">
        
      {errors.root && <p>{errors.root.message}</p>}  
       {/* errors like  Internal server error maybe */}
      
        <div className="space-y-1">
          <label htmlFor="username" className="text-sm text-neutral-300">Username</label>
          <input
            id="username"
            type="text"
            placeholder="choose a username"
            {...register("username")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
           {errors.username && (
            <p className="text-xs text-red-400">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-neutral-300">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
           {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-neutral-300">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
           {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-neutral-300">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
           {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled= {isSubmitting}
          className="w-full rounded-xl px-4 py-2 bg-teal-500 cursor-pointer text-black font-semibold hover:bg-teal-400 transition"
        >
           {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-sm text-neutral-400 text-center mt-4">
        Already have an account?{" "}
        <Link href="/auth" className="text-teal-400 cursor-pointer hover:underline">
          Sign in
        </Link>
      </p>
    </section>
  );
}
