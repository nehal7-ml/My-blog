"use client";

import Link from "next/link";

interface BlogCTAProps {
  title?: string;
  subTitle?: string;
  button?: string;
  link?: string;
}

function BlogCTA({ title, subTitle, link, button }: BlogCTAProps) {
  return (
    <div className="mx-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 rounded-lg bg-violet-500 p-5 py-8 text-white lg:mx-10">
      <div className="flex-grow">
        <h1 className="line-clamp-2 p-1 text-lg lg:text-xl font-bold">
          {title ? title : "Join Us grow Your Business"}
        </h1>
        <p className="p-2 text-sm lg:text-base">
          {subTitle
            ? subTitle
            : "Let's Explore Opportunities, Tailor Strategies, and Chart a Course to Success Together"}
        </p>
      </div>

      <div className="w-full lg:w-auto lg:flex lg:justify-end">
        <Link
          href={link ? link : "/contact"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full lg:w-auto h-full rounded-full bg-white px-4 py-2 leading-8 text-center text-sm font-semibold text-black hover:bg-gray-300"
        >
          {button ? button : "Get Started"}
        </Link>
      </div>
    </div>
  );
}

export default BlogCTA;
