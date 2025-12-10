'use server'

import { DisplayCommentDTO } from "@/crud/DTOs";
import { addComment } from "@/crud/blog";
import { verifyCaptcha } from "@/lib/externalRequests/google";
import prisma from "@/lib/prisma";
export type CommentFormState = {
    comment: string;
    email: string;
    blogId: string;
    token: string;
    result?: DisplayCommentDTO;
    success?: boolean;
    error?: string;
}
export async function submitComment(state: CommentFormState) {
    const result = await verifyCaptcha(state.token);
    if (!result.success) state.error = "Captch failed try again";
    else {
        try {
            const comment = await addComment({ blogId: state.blogId, comment: state.comment, email: state.email }, prisma);
            state.success = true;
            state.result = comment;
        } catch (error) {
            state.success = false;
            state.error = (error as Error).message
        }
    }

    return state
}