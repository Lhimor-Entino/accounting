import { Link, usePage } from '@inertiajs/react';
import React from 'react';

interface ActiveLinkProps {
    href: string;
    children: React.ReactNode;
    title: string,
}

const ActiveLink = ({ href, children, title }: ActiveLinkProps) => {

    const { url } = usePage();
    const isActive = url === `/${href}`;
    const activeClassName = isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground';

    return (
        <Link href={(route(href))} className={`flex items-center justify-center transition-colors rounded-lg h-9 w-9 ${activeClassName} hover:text-foreground md:h-8 md:w-8`}>
            {children}
            <span className="sr-only">{title}</span>
        </Link>
    );
};

export default ActiveLink;