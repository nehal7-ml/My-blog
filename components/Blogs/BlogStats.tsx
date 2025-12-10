import { submitLike } from "@/app/blogs/post/[id]/addlike";
import { Eye, Heart, View } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import LikeButton from "./LikeButton";


function BlogStats({ id, likes, views, email , liked}: { id: string, likes: number, views: number, email?: string, liked:boolean }) {
 
    return (<>
        <div className="flex lg:flex-col  justify-center items-center gap-2">
            <LikeButton blogId={id} likes={likes} email={email} liked={liked}  />
        </div>
        <div className="flex lg:flex-col  justify-center items-center gap-2">
            <Eye />
            {views.toLocaleString()}
        </div>

    </>);
}

export default BlogStats;