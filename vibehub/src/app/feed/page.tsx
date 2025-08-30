"use client"

import {  useState } from "react";

type Post = {
    id: string,
    authorName: string;
    content: string;
    likes: number;
    createdAt: string; // ISO
}

const MOCK_POSTS: Post[] = [
    {
      id: "p3",
      authorName: "nina",
      content: "Just shipped the new gradient header ✨",
      likes: 12,
      createdAt: "2h"
    },
    {
      id: "p2",
      authorName: "mario",
      content: "Dark mode forever 🌙",
      likes: 5,
      createdAt: "12m"
    },
    {
      id: "p1",
      authorName: "shefket",
      content: "First post on VibeHub! 👋",
      likes: 23,
      createdAt: "45m", 
    },
  ];


  export default function FeedMock() {
    const [posts, setPosts] = useState<Post[]>(
      // newest first
      [...MOCK_POSTS].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      )
    );
  
  
 
  
   
  
    return (
      <div className="w-full max-w-xl mx-auto space-y-6">
        {/* Composer */}
        <form  className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30">
          <textarea
            placeholder="Share a vibe..."
            className="w-full h-24 resize-none rounded-md bg-neutral-900 border border-neutral-800 p-3 outline-none focus:border-teal-500"
            maxLength={500}
          />
          <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
            <span>500</span>
            <button
              type="submit"
              className="rounded-xl px-4 py-2 bg-teal-500 text-black font-semibold hover:bg-teal-400 transition disabled:opacity-60"
            >
              Post
            </button>
          </div>
        </form>
  
        {/* Feed list */}
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.id} className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30">
              <div className="flex items-center justify-between text-sm text-neutral-400">
                <span className="font-medium text-neutral-300">@{p.authorName}</span>
                <span>{p.createdAt}</span>
              </div>
              <p className="mt-2 text-neutral-100 whitespace-pre-wrap">{p.content}</p>
              <div className="mt-3 flex items-center gap-4">
                <button
                  className="text-sm text-teal-400 hover:underline"
                >
                  ♥ {p.likes}
                </button>
              </div>
            </li>
          ))}
        </ul>
  
        {/* Load more (mock) */}
        <div className="flex justify-center">
          <button
            type="button"
            disabled
            className="rounded-xl px-4 py-2 bg-neutral-800 text-neutral-400 cursor-not-allowed"
            title="Mock only"
          >
            Load more
          </button>
        </div>
      </div>
    );
  }