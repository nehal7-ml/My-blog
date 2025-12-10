import { seoUrl } from "@/lib/utils";
import { Image } from "@prisma/client";
import Link from "next/link";
import React from 'react';

export type DetailedProps = {
    author: string;
    title: string;
    description: string;
    images: Image[];
    id: string;
};

function DetailedCard({ author, title, description, images, id }: DetailedProps) {
    return (
        <Link href={`/blogs/post/${seoUrl(title, id)}`}>
            <div className="relative rounded-lg shadow-lg overflow-hidden w-full h-full flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {<img src={images[0] ? images[0].src : 'https://placehold.co/600x400'} alt={title} className="z-0 absolute w-full h-full object-cover" />}
                <div className="relative text-white p-4 lg:py-5 lg:px-10 w-full h-full bg-[#1c00429e]">
                    <p className="text-lg font-thin">By {author}</p>
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
                    <p className="text-base line-clamp-4">{description}</p>
                </div>
            </div>
        </Link>
    );
}

export default DetailedCard;
