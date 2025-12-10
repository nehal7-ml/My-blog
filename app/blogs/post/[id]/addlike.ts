'use server'

export type LikeFormState = {
    email: string;
    blogId: string;
    token: string;
    likes: number;
    liked: boolean;
    error?: string;
    success?: boolean
}
import { addLike, removeLike } from "@/crud/blog";
import { verifyCaptcha } from "@/lib/externalRequests/google";
import prisma from "@/lib/prisma";


export async function submitLike({ email, blogId, token, error, success, liked, likes }: LikeFormState) {
    const result = await verifyCaptcha(token);
    if (!result.success) error = "Captch failed try again";
    else {
        try {

            if (liked) {
                const result = await removeLike(blogId, email, prisma);
                if (result) {
                    success = true;
                    liked = result.liked;
                    likes = result.likes;
                } else {
                    success = false;
                    error= "User not found"
                }

            } else {
                const result = await addLike(blogId, email, prisma);
                success = true;
                liked = result.liked;
                likes = result.likes;

            }

        } catch (error) {
            console.log(error);
            error = (error as Error).message;
        }

    }

    return { email, blogId, token, error, success, liked, likes }
}


// export async function submitUnlike({ email, blogId, token, error, success }: LikeFormState) {
//     const result = await verifyCaptcha(token);
//     if (!result.success) error = "Captch failed try again";
//     else {
//         try {
//             const like = await removeLike(blogId, email, prisma);
//             success = like;
//         } catch (error) {
//             error = (error as Error).message;
//         }

//     }

//     return { email, blogId, token, error, success }
// }