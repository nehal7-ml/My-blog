import { getAll } from "@/crud/blog"
import prisma from "@/lib/prisma"
import { seoUrl } from "@/lib/utils"
import React from 'react'


export async function generateStaticParams() {
  const blogs = await getAll(0, 0, prisma)
  return blogs.records.map((post) => ({
      id: seoUrl(post.title, post.id)
  }))
}
function BlogPostLayout({children}:{children: React.ReactNode}) {
  return (
    <div className="relative z-30 w-full min-h-screen bg-slate-100 dark:bg-gray-800 dark:text-white">
      {children}
    {/* <ContactForm /> */}
    </div>
  )
}

export default BlogPostLayout