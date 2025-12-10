'use client'
import React, { FormEvent, useState } from 'react';
import ClientInput from "../layout/ClientInput";
import Link from "next/link";
import { CommentDTO, DisplayCommentDTO } from "@/crud/DTOs";
import { submitComment } from "@/app/blogs/post/[id]/submitComment";
import GoogleCaptchaWrapper from "../GoogleCaptchaWrapper";
import { useReCaptcha } from "next-recaptcha-v3";

type CommentFormProps = {
    comments?: (DisplayCommentDTO)[];
    id: string;
    email?: string;
    href: string
}
function CommentForm(props: CommentFormProps) {
    return <GoogleCaptchaWrapper >
        <CommentFormLOC  {...props} />
    </GoogleCaptchaWrapper>
}
const CommentFormLOC = ({ comments, id, email, href }: CommentFormProps) => {

    const [displayComments, setDisplayComments] = useState<DisplayCommentDTO[]>(comments || []);
    const [comment, setComment] = useState('');
    const [agree, setAgree] = useState(false);
    const { executeRecaptcha, loaded } = useReCaptcha()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission

        const formData = new FormData(e.target as HTMLFormElement)
        const token = await executeRecaptcha('comment_submit')
        let newComment: CommentDTO = {
            email: email as string,
            comment,
            blogId: id
        }

        const state = await submitComment({
            blogId: id,
            comment: comment,
            email: email as string,
            token: token
        })
        if (state.result) {
            setDisplayComments(prev => [...prev, state.result as DisplayCommentDTO])
            setComment("")
        
        }
    };

    return (
        <>
            <div className="container mx-auto my-10  px-5">
                <div className="flex justify-between mb-5">
                    <div className="text-xl lg:text-4xl">Comments</div>
                    <Link href={'#commentForm'} className="border-rose-600 border-2 bg-transparent rounded-full lg:p-5 text-center p-2">Leave a comment</Link>
                </div>
                <div>
                    <span className="font-bold">Comment policy</span>: We love comments and appreciate the time that readers spend to share ideas and give feedback. However, all comments are manually moderated and those deemed to be spam or solely promotional will be deleted.
                </div>

                <div className="my-5">
                    {
                        (displayComments).map((comment, index) => {
                            return <div className="border-b-[1px] border-gray-500 py-5" key={index}>
                                <div className="flex flex-wrap gap-3 justify-start    items-center">
                                    <div className="w-9 h-9 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-orange-500 flex items-center justify-center text-center text-lg">{comment.User.firstName ? comment.User.firstName[0].toUpperCase() : comment.User.email[0].toUpperCase()}</div>
                                    </div>

                                    <div className="w-1/2 text-xl">{comment.User.firstName || comment.User.email.slice(0,2)}</div>
                                    <div className="text-gray-700 dark:text-gray-300 w-1/3">{(new Date(comment.createdAt)).toDateString()}</div>
                                </div>
                                <div className="flex justify-center text-left mx-10 my-5">
                                    <div className="w-full font-light">{comment.comment}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="w-full flex justify-center">
                    <button className="rounded-full bg-transparent border-2 p-5">Load more</button>
                </div>
            </div>

            <form id="commentForm" onSubmit={handleSubmit} className="relative container rounded-lg lg:p-24 p-5 mx-auto my-10 bg-gray-50 dark:bg-zinc-700 shadow-xl">
                <div className="relative mb-4">

                    <textarea
                        className="peer shadow appearance-none border rounded w-full py-2 px-3 bg-gray-50 dark:bg-zinc-700 text-gray-700 dark:text-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                        id="comment"
                        maxLength={250}
                        placeholder=""
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <label className="absolute peer-focus:-top-3 peer-focus:text-blue-500  bg-gray-50 dark:bg-zinc-700 peer-placeholder-shown:top-3 -top-3 left-3 px-1 text-gray-500 transition-all block dark:text-white text-sm font-bold mb-2" htmlFor="comment">
                        Comment
                    </label>
                </div>

                <div className="relative my-10">

                    <ClientInput
                        className="peer shadow-lg appearance-none border rounded w-full py-4 px-4 bg-transparent text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder=""
                        defaultValue={email}
                        required
                        hidden
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="agree">
                        <input
                            className="mr-2 leading-tight"
                            type="checkbox"
                            id="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            required
                        />
                        <span className="text-sm">
                            I agree to the Terms and Conditions and Privacy Policy
                        </span>
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-rose-600  hover:bg-rose-700 text-white font-bold py-4 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Post Comment
                    </button>
                </div>
                {!email && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-30 bg-gradient-to-b from-gray-300/40 via-gray-400/85 to-gray-600/100 to dark:from-gray-500/30 dark:via-gray-600/80 dark:to-gray-600/100 bacdrop-blur-sm hover:shadow-md">
                    <Link href={{ query: { callbackUrl: href }, pathname: '/api/auth/signin' }} className=" py-4 px-2 bg-rose-600 text-white rounded-full">Login to post comment</Link>
                </div>}
            </form>
        </>
    );
};

export default CommentForm;
