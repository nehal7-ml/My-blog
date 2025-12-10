import TextLoaders from "@/components/loaders/TextLoaders"
import { getRandomFromArray } from "@/lib/utils"
import React from 'react'

function BlogLoader() {
    return (
        <div className="w-full h-[60vh] overflow-hidden">
            <div className="">
                <div className="w-full bg-white dark:bg-black py-5">
                    <div className="container mx-auto ">
                        <div className="w-60">
                            <TextLoaders ></TextLoaders>
                        </div>
                        <div className="w-24">
                            <TextLoaders></TextLoaders>
                        </div>
                        <div className="w-24">
                            <TextLoaders></TextLoaders>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto my-10 flex flex-wrap overflow-hidden  py-10 px-10 lg:w-[48rem]">
                    {new Array(30).fill(1).map((value, index) => {

                        return (
                            <div key={index} className={`${getRandomFromArray(['w-64','w-80','w-96', 'w-72','w-52','w-full'])}`}>
                                <TextLoaders></TextLoaders>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default BlogLoader