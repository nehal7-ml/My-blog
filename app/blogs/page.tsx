import BlogCard from "@/components/blogs/BlogCard";
import DetailedCard from "@/components/blogs/DetailedCard";
import { getEssential, getFeatured, getPopular, getRecent } from "@/crud/blog";
import Link from "next/link";
import React from "react";

import prisma from "@/lib/prisma";
import { seoUrl, stripFileExtension } from "@/lib/utils";
import Image from "next/image";
import { DisplayBlogDTO } from "@/crud/DTOs";
import { getCategories } from "@/crud/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogCategory } from "@prisma/client";
export type BlogHomeProps = {
  featured: DisplayBlogDTO;
  recent: DisplayBlogDTO[];
  essential: DisplayBlogDTO[];
  popular: DisplayBlogDTO[];
  categories: BlogCategory[];
};

// export const dynamic = 'force-dynamic';

async function Blogs() {
  const data = await getData();
  const random = data.recent[Math.floor(Math.random() * data.recent.length)];
  // console.log(data.recent.slice(1, 2))
  return (
    <div className="z-10  px-5 dark:text-white xl:px-16 ">
      <div className="flex items-center justify-center ">
        <Carousel className="w-full px-10">
          <CarouselContent>
            {data.categories.map((category, index) => {
              return (
                <CarouselItem key={index} className="w-fit basis-auto">
                  <Link
                    href={`/blogs/category/${seoUrl(
                      category.name,
                      category.id,
                    )}`}
                    className="flex w-fit items-center justify-center rounded-3xl border px-2 py-1 hover:border-blue-400 dark:hover:border-emerald-400"
                  >
                    {category.name}
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
      <div className="container mx-auto my-10 px-5">
        <div className="my-10 flex w-full  flex-col lg:flex-row">
          <div className="w-full  rounded-lg xl:w-2/3">
            {data.featured ? (
              <DetailedCard
                id={data.featured.id}
                author={data.featured.author.firstName || ""}
                title={data.featured.title}
                description={data.featured.description}
                images={data.featured.images}
              ></DetailedCard>
            ) : (
              <div className="h-full w-full rounded-lg  bg-purple-600"></div>
            )}
          </div>
          <div className="flex w-full flex-col p-5 lg:w-1/3 ">
            <div className="border-b-1 flex h-full justify-between p-4 dark:border-gray-300">
              <span className="text-lg font-bold">New blogs</span>
              <Link
                href={"/blogs/new"}
                className="text-[#FF5480] hover:text-[#FF5480] hover:underline dark:text-gray-300"
              >
                {" "}
                view all new
              </Link>
            </div>
            {data.recent.slice(0, 4).map((blog, index) => {
              return (
                <Link
                  key={index}
                  href={`/blogs/post/${seoUrl(blog.title, blog.id)}`}
                  className="p-5"
                >
                  <div key={index} className="flex flex-col">
                    <span className="font-thin">
                      {new Date(blog.date).toLocaleString()}
                    </span>
                    <span className="hover:text-[#FF5480] hover:underline">
                      {blog.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto my-10 flex flex-col gap-4">
        <div className="my-2 flex justify-between text-2xl font-bold">
          Popular{" "}
          <Link
            href={"/blogs/popular"}
            className="text-base text-[#FF5480] underline active:text-gray-400"
          >
            view all
          </Link>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="rounded-lg lg:h-96 lg:w-1/2">
            {data.popular[0] && (
              <DetailedCard
                id={data.popular[0].id}
                author={data.popular[0].author.firstName || ""}
                title={data.popular[0].title}
                description={data.popular[0].description}
                images={data.popular[0].images}
              ></DetailedCard>
            )}
          </div>
          <div className="flex flex-wrap gap-3 lg:h-96 lg:w-1/2">
            {data.popular.slice(1, 4).map((blog, index) => {
              return (
                <div key={index} className="p-4 lg:h-1/2 lg:w-[45%]">
                  <BlogCard
                    id={blog.id}
                    category={
                      blog.category ? blog.category.name : "Uncategorised"
                    }
                    title={blog.title}
                    key={index}
                  ></BlogCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto my-10">
        <div className="my-2 flex justify-between text-2xl font-bold">
          Essential{" "}
          <Link
            href={"/blogs/essential"}
            className="text-base text-[#FF5480] underline active:text-gray-400"
          >
            view all
          </Link>
        </div>
        <div className="my-10 flex flex-col lg:flex-row">
          <div className=" rounded-lg lg:h-96 lg:w-1/2">
            <DetailedCard
              id={data.essential[0].id}
              author={data.essential[0].author.firstName || ""}
              title={data.essential[0].title}
              description={data.essential[0].description}
              images={data.essential[0].images}
            ></DetailedCard>
          </div>

          <div className="flex h-full flex-wrap lg:h-96   lg:w-1/2">
            {data.essential.slice(1, 4).map((blog, index) => {
              return (
                <div key={index} className="h-1/2 w-[45%] p-4">
                  <BlogCard
                    id={blog.id}
                    category={
                      blog.category ? blog.category.name : "Uncategorised"
                    }
                    title={blog.title}
                    key={index}
                  ></BlogCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto my-10">
        <div className="my-2 text-2xl font-bold">Random</div>
        {random && (
          <div className="my-5">
            <DetailedCard
              id={random.id}
              author={random.author.firstName || ""}
              title={random.title}
              description={random.description}
              images={random.images}
            />
          </div>
        )}
      </div>

      {/* <div className="container mx-auto my-10">
                <div className="text-4xl font-bold my-2 flex justify-between">
                    Reading List
                    <Link href={'/blogs/readinglist'} className="text-base text-[#FF5480] underline active:text-gray-400">view all</Link>
                </div>
                <div className="">

                </div>
            </div> */}
    </div>
  );
}

async function getData() {
  const featured = await getFeatured(prisma);
  const { recent } = await getRecent(1, prisma);
  const { popular } = await getPopular(1, prisma);
  const { essential } = await getEssential(1, prisma);
  const categories = await getCategories("blog", prisma);
  return { featured, recent, essential, popular, categories };
}
export default Blogs;
