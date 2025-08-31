"use client"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import React, {  useEffect, useState } from "react";
import timeAgo from "../lib/timeAgo";

type Post = {
    id: string,
    authorName: string;
    content: string;
    createdAt: string; // ISO
}
type ServerPost = {
  _id: string;
  authorName: string;
  content: string;
  createdAt: string;
};


  export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    
  
    useEffect(() => {
        try {
          fetch("/api/posts", {method: "GET"})
          .then(r => r.json() as Promise<ServerPost[]>)
          .then((data: ServerPost[]) => {
            const mapped: Post[] = data.map((p: ServerPost) => ({
              id: p._id,
              authorName: p.authorName,
              content: p.content,
              createdAt: p.createdAt, // already ISO from API
            }));
            setPosts(mapped)
          })

          fetch("/api/currentUser", {method: "GET"})
          .then(r => r.json())
          .then(user => {
            setCurrentUser(user.user.username)
            
          })
        }catch(err){
          console.error("Network error: ", err)
        }
    },[])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const text = content.trim();
      if(!text) return;

      setSubmitting(true);

      fetch("/api/posts", {method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({content: text})
      })
      .then(r => {
        if (!r.ok) {
          return r.json().then((err) => {
            console.error("POST /api/posts failed:", r.status, err);
            throw err;
          });
        }
        return r.json();
      })
      .then(p => {
        const newItem = {
          id: p._id,
          authorName: p.authorName,
          content: p.content,
          createdAt: p.createdAt,
        };
        setPosts((prev) => [newItem, ...prev]); // prepend
        setContent("");    
      })
      .catch((err) => {
        // (optional) show a toast / error message
        console.error(err);
      })
      .finally(() => setSubmitting(false));
    }
 
  
   
  
    return (

      //main container
      <div className="w-full flex justify-between">

        {/* left section */}
        <div className="sticky top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6">

          {/* left section tags */}
          <div className="flex flex-col  p-4  ">

          <div className='flex gap-3 items-center '>
            <AccountCircleIcon />
            <p className='text-teal-400'>{currentUser}</p>
          </div>

          </div>

        </div>


      {/* middle section */}
      <div className="w-full max-w-xl mx-auto space-y-6">
        {/* Composer */}
        <form onSubmit={onSubmit}  className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30">
          <textarea
            placeholder="Share a vibe..."
            className="w-full h-24 resize-none rounded-md bg-neutral-900 border border-neutral-800 p-3 outline-none focus:border-teal-500"
            maxLength={200}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
            <span>{200 - content.length}</span>
            <button
              type="submit"
              disabled = {!content.trim() || submitting}
              className="rounded-xl px-4 py-2 bg-teal-500 text-black font-semibold hover:bg-teal-400 transition disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
  
        {/* Feed list */}
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.id} className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30">
              <div className="flex items-center justify-between text-sm text-neutral-400">
                <span className="font-medium text-neutral-300">@{p.authorName}</span>
                <span>{timeAgo(p.createdAt)}</span>
              </div>
              <p className="mt-2 text-neutral-100 whitespace-pre-wrap">{p.content}</p>
              <div className="mt-3 flex items-center gap-4">
                <button
                  className="text-sm text-teal-400 hover:underline"
                >
                  ♥ {"5"}
                </button>
              </div>
            </li>
          ))}
        </ul>
  
        {/* Load more (mock) */}
        {/* <div className="flex justify-center">
          <button
            type="button"
            disabled
            className="rounded-xl px-4 py-2 bg-neutral-800 text-neutral-400 cursor-not-allowed"
            title="Mock only"
          >
            Load more
          </button>
        </div> */}
      </div>




      </div>
    );
  }