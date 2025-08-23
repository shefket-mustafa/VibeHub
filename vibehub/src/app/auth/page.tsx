import Link from "next/link";

export default function AuthPage() {
  return (
    <section className="w-full max-w-sm">
      <h1 className="text-3xl font-bold text-center mb-6">Sign in to <span className="text-teal-400">VibeHub</span></h1>

      <form className="rounded-2xl border border-neutral-800 p-5 space-y-4 bg-neutral-900/30">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-neutral-300">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm text-neutral-300">Password</label>
            <Link href="/auth/forgot" className="text-sm text-teal-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl px-4 py-2 cursor-pointer bg-teal-500 text-black font-semibold hover:bg-teal-400 transition"
        >
          Sign In
        </button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-neutral-950 px-2 text-neutral-400">or</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            className="w-full rounded-xl px-4 py-2 bg-neutral-800 cursor-pointer hover:bg-neutral-700 transition"
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full rounded-xl px-4 py-2 bg-neutral-800 cursor-pointer hover:bg-neutral-700 transition"
          >
            Continue with GitHub
          </button>
        </div>
      </form>

      <p className="text-sm text-neutral-400 text-center mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-teal-400 hover:underline">
          Create a profile
        </Link>
      </p>
    </section>
  );
}
