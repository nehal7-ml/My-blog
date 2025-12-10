import { Image as userImage, User } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function AuthorCard({ author }: { author: { id: string, image?: userImage, firstName: string, lastName: string, email: string } }) {
    return (<div className="w-full flex flex-col gap-5 p-10 justify-center items-center dark:bg-zinc-900 rounded-md">
        <Link href={`/blogs/author/${author.id}?page=1`} className="flex justify-center items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden">
                {author.image ? <Image className="object-contain" src={author.image.src} alt="author-dp" height={50} width={50} />
                    :
                    <div className="w-full h-full bg-orange-500 flex items-center justify-center text-center text-3xl">{author.firstName ? author.firstName[0] : 'A'}</div>
                }
            </div>
        </Link>
        <div className="text-3xl">
            {`${author.firstName} ${author.lastName}` ?? author.email}
        </div>
        <div>
            {"user Bio here"}
        </div>
        <div className="flex gap-3">
            <Link href={'#'}><Facebook /></Link>
            <Link href={'#'}><Instagram /></Link>
            <Link href={'#'}><Twitter /></Link>
            <Link href={'#'}><Linkedin /></Link>

        </div>


    </div>);
}

export default AuthorCard;