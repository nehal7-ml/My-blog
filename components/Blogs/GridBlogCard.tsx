import React from 'react'
import { DetailedProps } from "./DetailedCard";
import Link from "next/link";
import Image from "next/image";
import { DisplayBlogDTO } from "@/crud/DTOs";
import { seoUrl } from "@/lib/utils";

function GridBlogCard({blog}: {blog:DisplayBlogDTO}) {
  return (
    <Link href={`/blogs/post/${seoUrl(blog.title, blog.id)}`}>
      <div className="h-full overflow-hidden rounded-lg   shadow-lg dark:bg-gray-700">
        <div className="h-2/3 bg-gray-400">
          <Image
            className="h-full w-full object-cover"
            src={
              blog.images[0]
                ? blog.images[0].src
                : "https://placehold.co/600x400"
            }
            alt={blog.title}
            height={450}
            width={500}
          />
        </div>
        <div className="px-2 lg:px-6 py-3    flex-shrink">
          <div className="mb-2 text-xs">by {blog.author.firstName} {blog.author.lastName} </div>
          <div className="mb-2 text-sm font-bold line-clamp-2">{blog.title}</div>
          <div className="line-clamp-1 lg:line-clamp-2 text-ellipsis text-xs">
            {blog.subTitle}
          </div>
        </div>
      </div>
    </Link>
  );

}

export default GridBlogCard