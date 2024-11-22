import { Link, usePage } from '@inertiajs/react';
import React from 'react';

interface ActiveLinkProps {
    href: string;
    children: React.ReactNode;
    title: string,
}

const ActiveLink = ({ href, children, title }: ActiveLinkProps) => {

    const { url } = usePage();

    const formattedUrl = href.replace(".","/")
    const isActive = url.includes(formattedUrl);
    const activeClassName = isActive ? '  shadow-2xl  bg-accent text-accent-foreground bg-muted-foreground/20 font-bold' : 'text-muted-foreground';

    return (
        <Link href={(route(href))} className={`flex  items-center pl-2 gap-x-4  transition-colors  rounded-lg h-9 ${activeClassName} hover:text-foreground `}>
            {children}
            <span className="sr-only">{title}</span>
        </Link>
    );
};

export default ActiveLink;