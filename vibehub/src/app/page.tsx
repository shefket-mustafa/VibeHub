import Link from "next/link";

export default function Home() {
  return (
    <section className=" flex flex-col justify-center items-center text-center px-4 ">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Welcome to <span className="text-teal-400">VibeHub</span>
      </h1>
    <p className="text-neutral-300 mb-8 max-w-md">
    Your space to share vibes, connect with friends, and discover new
        stories. Let’s kick things off and get you started.
      </p>
    <Link href='/auth' className="rounded-xl px-6 py-3 bg-teal-500 text-black font-semibold hover:bg-teal-400 transition">
    Get Started </Link>
  </section>
  );
}
