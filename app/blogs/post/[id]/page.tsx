import { addView, getAll, getSimilar, read } from "@/crud/blog";
import React, { ReactEventHandler, Suspense, useRef } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";
import CommentForm from "@/components/blogs/CommentForm";
import BlogContainer from "@/components/blogs/BlogContainer";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import BlogContent from "@/components/blogs/BlogContent";
import { cookies } from "next/headers";
import { extractUUID, seoUrl, stripFileExtension } from "@/lib/utils";
import { CTAProps, DisplayBlogDTO } from "@/crud/DTOs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuthAdapter";
import { Blog, BlogPosting, WithContext } from "schema-dts";
import Script from "next/script";
import { ImageResponse } from "next/og";
import SimilarBlogs from "@/components/blogs/SimilarBlogs";
import BlogCTA from "@/components/blogs/BlogCTA";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const seoTitle = params.id;
  const id = extractUUID(seoTitle);
  const blog = (await read(id, prisma)) as DisplayBlogDTO;

  // optionally access and extend (rather than replace) parent metadata
  let metadata: Metadata = {};
  let description = blog.description.slice(0, 250);
  //console.log(blog);
  if (blog) {
    metadata.title = blog.title as string;
    metadata.description = description;
    metadata.openGraph = {
      type: "article",
      title: blog.title,
      description: description,
    };
    metadata.twitter = {
      title: blog.title,
      description: description,
    };
    metadata.category = blog.tags.join(" ");
    metadata.keywords = blog.tags?.map((tag) => tag.name);
  }

  return metadata;
}

async function BlogPost({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const seoTitle = params.id;
  const id = extractUUID(seoTitle);
  const { blog, similar } = await getData(id, session?.user?.email ?? "");

  // console.log("Currect url", seoTitle, encodeURIComponent(seoUrl(blog.title, blog.id)));
  if (!blog) redirect("/404");

  if (seoTitle !== seoUrl(blog.title, blog.id)) redirect("/404"); //redirec if link in not matching

  const cookieStore = cookies();
  const theme =
    (cookieStore.get("theme")?.value as string) === "dark" ? "dark" : "light";

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": id,
    description: blog.description,
    author: {
      "@type": "Person",
      "@id": "",
      name: blog.author.firstName ?? "",
    },
    name: blog.title,
    image: {
      "@type": "ImageObject",
      url: blog.images.length > 0 ? blog.images[0].src : "",
    },
  };
  let ctaProps: CTAProps | undefined = blog.ctaProps as CTAProps;
  return (
    <div className="realtive h-full w-full pb-10 dark:text-white">
      <Script
        type="application/ld+json"
        id="json-ld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full ">
        <div className="w-full bg-white py-5 dark:bg-gray-900">
          <div className="container mx-auto whitespace-pre-line break-words">
            <div className="m-4  text-xl font-bold lg:text-2xl">
              {blog.title}
            </div>
            <div className="container m-4 flex flex-wrap gap-1">
              {blog.tags.map((tag, index) => (
                <span key={index} className="p-1 px-2">
                  #{tag.name}
                </span>
              ))}
            </div>
            <div className="m-4 text-sm font-semibold">{blog.description}</div>
            <div className="m-4">
              by. {blog.author.firstName} {blog.author.lastName}{" "}
            </div>
          </div>
        </div>
        <div className="container relative mx-auto my-10  flex min-h-screen flex-col  items-center px-1 py-5  xl:px-10   xl:py-10">
          <div className="flex w-full items-center justify-center lg:px-[5rem]">
            {blog.images[0] ? (
              <Image
                priority={true}
                className="m-2  h-auto max-h-[500px] w-full rounded-lg object-cover xl:max-h-[480px] 2xl:max-h-[450px]"
                src={blog.images[0].src}
                alt={stripFileExtension(blog.images[0].name || "blog_image")}
                width={1250}
                height={600}
              ></Image>
            ) : (
              <></>
            )}
          </div>
          {
            <BlogContent
              href={`${process.env.NEXTAUTH_URL}/blogs/post/${seoTitle}`}
              content={blog.content}
              theme={theme}
            />
          }
          <BlogContainer
            href={`${process.env.NEXTAUTH_URL}/blogs/post/${seoTitle}`}
            liked={blog.Likes ? blog.Likes.length > 0 : false}
            blog={blog}
            session={session}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-5">
          <Link
            href={`/blogs/author/${blog.author.id}?page=1`}
            className="flex items-center justify-center"
          >
            <div className="h-20 w-20 overflow-hidden rounded-full">
              {blog.author.image ? (
                <Image
                  src={blog.author.image.src}
                  alt="Author Dp"
                  height={50}
                  width={50}
                  className="h-full w-full object-fill"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-orange-500 text-center text-xl">
                  {blog.author.firstName ? blog.author.firstName[0] : "A"}
                </div>
              )}
            </div>
          </Link>
          <section>
            <BlogCTA
              button={ctaProps ? ctaProps.button : ""}
              title={ctaProps ? ctaProps.title : ""}
              subTitle={ctaProps ? ctaProps.subTitle : ""}
              link={ctaProps ? ctaProps.link : ""}
            />
          </section>
          <div className="text-xl">
            {blog.author.firstName || blog.author.email}
          </div>
        </div>
        <section>
          <SimilarBlogs
            blogs={similar as DisplayBlogDTO[]}
            viewAllLink={`/blogs/similar?id=${id}`}
          />
        </section>

        <CommentForm
          email={session?.user?.email as string}
          href={`${process.env.NEXTAUTH_URL}/blogs/post/${seoTitle}`}
          id={id}
          comments={blog.Comments}
        />
      </div>
    </div>
  );
}

async function getData(id: string, userEmail?: string) {
  const blog = (await addView({ id, userEmail }, prisma)) as DisplayBlogDTO;
  const { similar } = await getSimilar(id, 1, prisma);
  // console.log(blog.title);
  if (blog) return { blog, similar };
  else redirect("/404");
}

export default BlogPost;
