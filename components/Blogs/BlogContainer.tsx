'use client'

import { useRef } from "react";
import ProgressBar from "./BlogReadProgess";
import BlogShare from "./BlogShare";
import BlogStats from "./BlogStats";
import { DisplayBlogDTO } from "@/crud/DTOs";
import { Session } from "next-auth";

function BlogContainer({ blog , session, liked, href}: { blog: DisplayBlogDTO , session: Session | null, liked?:boolean, href:string}) {
    const blogContainer = useRef<HTMLDivElement>(null)
    const userEmail=  session? session.user?.email : undefined
    console.log("post liked: ",liked);
    return (

        <>
            <ProgressBar container={blogContainer} ></ProgressBar>
            <div ref={blogContainer} className="absolute w-full h-full container mx-auto px-[5rem]">
                <div className="absolute xl:w-10 flex xl:flex-col gap-5 -top-10 xl:top-10 left-0 xl:translate-x-4  p-3">
                    <BlogShare href={href} />
                </div>

                <div className="absolute xl:w-10 flex xl:flex-col gap-5 -top-10 right-0 xl:top-10 xl:right-0 xl:-translate-x-4  p-3">
                    <BlogStats liked={liked || false} email={userEmail as string} id={blog.id} likes={blog._count.Likes} views={blog.Views as number} />
                </div>
            </div>
        </>
    );
}

export default BlogContainer;