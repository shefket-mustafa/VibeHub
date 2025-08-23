import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="w-full max-w-sm">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create your <span className="text-teal-400">VibeHub</span> account
      </h1>

      <form className="rounded-2xl border border-neutral-800 p-5 space-y-4 bg-neutral-900/30">
        <div className="space-y-1">
          <label htmlFor="username" className="text-sm text-neutral-300">Username</label>
          <input
            id="username"
            type="text"
            placeholder="choose a username"
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
        </div>

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
          <label htmlFor="password" className="text-sm text-neutral-300">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 outline-none focus:border-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl px-4 py-2 bg-teal-500 cursor-pointer text-black font-semibold hover:bg-teal-400 transition"
        >
          Create Account
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
