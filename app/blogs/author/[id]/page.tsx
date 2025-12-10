import Pagination from "@/components/Pagination";
import AuthorCard from "@/components/blogs/AuthorCard";
import { getAuthor, getPopular, getRecent } from "@/crud/blog";
import prisma from "@/lib/prisma";
import { seoUrl } from "@/lib/utils";
import { Image as UserImage } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const dynamic = "force-dynamic";
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const { page } = searchParams;

  // fetch data
  const { author, totalPages } = await getAuthor(id, Number(page), prisma);

  // optionally access and extend (rather than replace) parent metadata
  let metadata: Metadata = {};
  metadata.title = `Author: ${author?.firstName}`;
  metadata.description = `Deatils of blog Author, ${author?.firstName}`;
  metadata.alternates = {
    canonical : `/blogs/author/${id}`
  }
  metadata.openGraph = {
    type: "article",
    title: metadata.title,
    description: metadata.title,
    images: new ImageResponse(
      (
        <>
          {author?.image ? (
            <>
              <div className="h-[630px] w-[1200px]">
                <Image
                  className="object-contain"
                  src={author.image.src}
                  alt="Author DP"
                  width={300}
                  height={300}
                />
              </div>
            </>
          ) : (
            <>
              <div className="h-[630px] w-[1200px] bg-orange-500">
                <div className="sm:text-3l text-center text-5xl font-bold uppercase text-white">
                  {author?.firstName?.slice(0)}
                </div>
              </div>
            </>
          )}
        </>
      ),
    ),
  };
  return metadata;
}
async function BlogAuthor({
  params: { id },
  searchParams,
}: {
  params: { id: string; page: number };
  searchParams: { page: number };
}) {
  const { page } = searchParams;
  const { author, totalPages } = await getAuthor(id, page, prisma);
  const recent = await getRecent(1, prisma);
  const popular = await getPopular(1, prisma);

  if (!author?.id) redirect("/404");
  return (
    <div className="grid-rows-[repeat(8, minmax(0, 1fr))] container mx-auto grid grid-cols-1 lg:grid-cols-4">
      <div className="row-span-1 h-fit p-5 lg:col-span-3">
        <AuthorCard
          author={{
            firstName: author?.firstName as string,
            image: author?.image as UserImage,
            id: author?.id as string,
            lastName: author?.lastName as string,
            email: author?.email as string
          }}
        />
      </div>

      <div className=" w-full lg:col-span-3">
        {author?.blogs.map((blog, index) => {
          return (
            <div key={index} className={`w-full  p-5  lg:h-[500px]`}>
              <Link
                href={`/blogs/post/${seoUrl(blog.title, blog.id)}`}
                className=""
              >
                <div className="h-full overflow-hidden rounded-lg   shadow-lg dark:bg-gray-700">
                  <div className=" h-2/3 bg-gray-400">
                    <Image
                      className="h-full w-full object-cover"
                      src={
                        blog.images[0]
                          ? blog.images[0].src
                          : "https://placehold.co/600x400"
                      }
                      alt={blog.title}
                      height={200}
                      width={200}
                    />
                  </div>
                  <div className="px-6 py-1">
                    <div className="mb-2">by {author.firstName} </div>
                    <div className="mb-2 text-2xl font-bold">{blog.title}</div>
                    <div className="">{blog.subTitle}</div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        <Pagination
          currentPage={Number(page) ?? 1}
          totalPages={totalPages}
          pathname={`/blogs/author/${id}`}
        />
      </div>

      <div className="row-span-6 flex flex-col gap-10 p-5">
        <div className="rounded-md shadow-md dark:bg-zinc-900">
          <div className="p-2 text-center">Recent</div>
          {recent.recent.slice(0, 4).map((blog, index) => {
            return (
              <div key={index} className="p-4">
                <Link
                  href={`/blogs/post/${seoUrl(blog.title, blog.id)}`}
                  className="my-1 p-2 hover:underline"
                >
                  <p className="p-4">{blog.title}</p>
                </Link>
                <div className="line-clamp-2 px-4 dark:text-gray-500">
                  {blog.description}
                </div>
              </div>
            );
          })}
        </div>
        <div className="rounded-md shadow-md dark:bg-zinc-900">
          <div className="p-2 text-center">Popular</div>

          {popular.popular.slice(0, 4).map((blog, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-2 p-4"
              >
                <Image
                  className="aspect-square h-full w-1/3 rounded-md object-contain p-1"
                  alt="blog-image"
                  src={
                    blog.images[0]
                      ? blog.images[0].src
                      : "https://picsum.photos/200"
                  }
                  width={50}
                  height={50}
                ></Image>
                <div className="w-2/3">
                  <Link
                    href={`/blogs/post/${seoUrl(blog.title, blog.id)}`}
                    className="my-1 p-2 hover:underline"
                  >
                    <p>{blog.title}</p>
                  </Link>
                  <div className=" line-clamp-2  dark:text-gray-500 ">
                    {blog.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogAuthor;
