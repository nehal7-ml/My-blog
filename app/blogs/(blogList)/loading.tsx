import CardSkleton from "@/components/blogs/CardSkleton"
import TextLoaders from "@/components/loaders/TextLoaders"
import { getRandomFromArray } from "@/lib/utils"
import React from 'react'

async function BlogListLoader() {
    return (
        <div className="w-full h-fit">
            <div className="container mx-auto ">
                <div className="mx-10 w-56">
                    <TextLoaders></TextLoaders>
                </div>
                <div className="mx-10 w-1/2">
                    <TextLoaders></TextLoaders>
                </div>

                <div className="conatiner mx-10 my-10 flex flex-wrap items-center overflow-hidden ">
                    {new Array(5).fill(1).map((value, index) => {

                        return (
                            <div key={index} className={`w-full lg:w-1/2 p-5 `}>

                                <CardSkleton></CardSkleton>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

async function getData(list: string) {
    return []
}

export default BlogListLoader