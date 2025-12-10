"use client";
import { LikeFormState, submitLike } from "@/app/blogs/post/[id]/addlike";
import { Heart } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import GoogleCaptchaWrapper from "../GoogleCaptchaWrapper";
import { useReCaptcha } from "next-recaptcha-v3";
import Tooltip from "../shared/tooltip";

function LikeButton(props: {
  email?: string;
  blogId: string;
  likes: number;
  liked: boolean;
}) {
  return (
    <GoogleCaptchaWrapper>
      <LikeButtonLOC {...props} />
    </GoogleCaptchaWrapper>
  );
}
function LikeButtonLOC({
  email,
  blogId,
  likes,
  liked,
}: {
  email?: string;
  blogId: string;
  likes: number;
  liked: boolean;
}) {
  const [showSignin, setShowSignin] = useState(false);
  const [current, setCurrent] = useState(likes);
  const router = useRouter();
  const { executeRecaptcha, loaded } = useReCaptcha();
  const [state, setState] = useState<LikeFormState>({
    blogId,
    email: email || "",
    token: "",
    liked: liked,
    likes: likes,
    error: undefined,
    success: true,
  });
  async function like() {
    if (!state.success) return;
    let token = await executeRecaptcha("blog_like_submit");
    if (!email) {
      setShowSignin(true);
      const searchParams = new URLSearchParams();
      if (typeof window !== "undefined")
        searchParams.set("callbackUrl", window.location.href + "/");
      // console.log(searchParams.toString());
      router.push(`/api/auth/signin?${searchParams.toString()}`);
      return;
    } else {
      setState((prev) => ({
        ...prev,
        success: false,
        likes: state.liked ? prev.likes - 1 : prev.likes + 1,
        liked: !prev.liked,
      }));
      const newState = await submitLike({
        blogId: blogId,
        email: email,
        token: token,
        liked: state.liked,
        likes: state.likes,
      });
      // console.log(newState);
      setState(newState);
    }
  }

  return (
    <form
      action={() => like()}
      className="flex items-center justify-center gap-1 lg:flex-col "
    >
      <div>
        <input name="blogId" defaultValue={blogId} hidden />
        <input name="email" defaultValue={email} hidden />
      </div>
      <Tooltip
        type="submit"
        content={`${state.liked ? "remove like" : "like"}`}
      >
        <Heart
          className={`${
            state.liked ? "fill-rose-500 text-rose-500" : ""
          } cursor-pointer`}
        />
      </Tooltip>
      {state.likes}
    </form>
  );
}

export default LikeButton;
