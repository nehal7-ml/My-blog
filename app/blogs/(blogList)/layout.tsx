import { Suspense } from "react";

function BlogListLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="pb-20">
                <Suspense>{children}</Suspense>
            </div>
        </>
    );
}

export default BlogListLayout;