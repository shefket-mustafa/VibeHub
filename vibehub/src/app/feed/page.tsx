"use client"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import GroupsIcon from '@mui/icons-material/Groups';

import React, {  useEffect, useState } from "react";
import timeAgo from "../lib/timeAgo";
import Image from 'next/image';

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

type Contact = {
  username: string,
  id: string
}



  export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [allUsers, setAllUsers] = useState<Contact[]>([]);

    
  
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

    try{
      fetch("/api/allUsers")
      .then(res => res.json())
      .then(result => {
        setAllUsers(result)
      })

    }catch(err){

    }

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
        <div className="sticky hidden md:flex flex-col top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6">

          {/* left section tags */}
          <div className="flex flex-col gap-5 p-4 border-neutral-700 ">

          {/* Profile tag */}
          <div className='flex gap-3 items-center'>
            <AccountCircleIcon />
            <p className='text-teal-400'>{currentUser}</p>
          </div>

          {/* Friends tag */}
          <div className='flex gap-3 items-center'>
            <PeopleIcon />
            <p>Friends</p>
          </div>

          {/* Memories tag */}
          <div className='flex gap-3 items-center'>
          <BrowseGalleryIcon />
          <p>Memories</p>
          </div>

          {/* Groups tag */}
          <div className='flex gap-3 items-center'>
          <GroupsIcon />
          <p>Groups</p>
          </div>
          </div>

          {/* Contacts */}
          <div className='p-4 border-t-1 border-neutral-700 decoration-0'>
            <p className='text-xl mb-5 text-teal-400'>Contacts</p>
          {allUsers.length === 0 ? "No users!" : allUsers.map(user => <li key={user.id}>{user.username}</li>)}
          </div>

        </div>


      {/* middle section */}
      <div className="w-full flex-1 max-w-xl mx-auto space-y-6">
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


      {/* right section */}
      <div className="hidden md:flex sticky top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6">


         {/* right section tags */}
         <div className="flex flex-col gap-5 p-4 border-neutral-700 border-b-1">

           {/* Sponsored tag */}
           <div className='flex flex-col gap-4 justify-center items-center'>
            <p className='text-2xl'>Sponsored</p>
            <Image src="https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920.jpg" width={240} height={160} alt='Loading image...'/>
            <Image src="https://miro.medium.com/v2/resize:fit:1100/1*CWFkh5z8oa6dZfn5_gkKKQ.jpeg" width={240} height={160} alt='Loading image...'/>
            <Image src="https://www.zilliondesigns.com/blog/wp-content/uploads/Twitter-New-Logo-X.jpg" width={240} height={160} alt='Loading image...'/>
          </div>

          </div>

        </div>

      </div>
    );
  }