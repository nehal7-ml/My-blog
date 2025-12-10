import { DisplayBlogDTO } from "@/crud/DTOs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { seoUrl } from "@/lib/utils";
import GridBlogCard from "./GridBlogCard";

function SimilarBlogs({ blogs, viewAllLink }: { blogs: DisplayBlogDTO[], viewAllLink: string }) {
    return (
        <div className="flex flex-col px-14">
            <div className="flex justify-between my-5">
                <div>You Might Also Like...</div>
                <div>
                    <Link
                        href={viewAllLink}
                        className="text-base text-[#FF5480] underline active:text-gray-400"
                    >
                        view all
                    </Link>
                </div>
            </div>
            <Carousel className="py-5">
                <CarouselContent className="gap-2 px-2 py-5">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2 max-h-[28em] lg:max-h-[25em]">
                            <GridBlogCard blog={blog} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>
        </div>
    );
}

export default SimilarBlogs;
