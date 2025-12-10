'use client'
import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
function BlogShare({href}: {href:string}) {
    const [isClient, setIsClient] = useState(false);
    const urls = {
        facebook: 'https://www.facebook.com/sharer.php?utm_source=facebook&utm_medium=social&u=',
        twitter: 'https://x.com/intent/post?utm_source=twitter&utm_medium=social&url=',
        linkedin: 'https://www.linkedin.com/shareArticle?mini=true&utm_source=linkedin&utm_medium=social&url=',
    }

    https://www.linkedin.com/shareArticle?mini=true&url={NEW_BLOG_LINK}&utm_source={source}&utm_medium=social&utm_campaign=AI_TV_Shows_Blog&utm_content=main_link
    
    // useEffect(()=> {

    //    // if ( typeof window !== "undefined" ) setIsClient(true)
    // }, [])
    return (
        <>
            {
                <>
                    <Link href={`${urls.facebook}${href}?${encodeURIComponent('utm_source=facebook&utm_medium=social')}`} target="_blank">
                        <Facebook />
                    </Link>
                    <Link href={`${urls.twitter}${href}?${encodeURIComponent('utm_source=twitter&utm_medium=social')}`} target="_blank">
                        <Twitter />
                    </Link>
                    <Link href={`${urls.linkedin}${href}?${encodeURIComponent('utm_source=linkedin&utm_medium=social')}`} target="_blank">
                        <Linkedin />
                    </Link>
                </>
               
            }

        </>);
}

export default BlogShare;