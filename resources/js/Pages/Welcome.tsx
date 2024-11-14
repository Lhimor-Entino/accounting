import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button"
import { Inertia, Page } from '@inertiajs/inertia';
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { AppSidebar } from '@/Components/app-sidebar';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Welcome() {

    return (
        <>
            <Head title="Welcome" />
            <Authenticated>
                <div>
                    <p>HELLO</p>

                </div>
            </Authenticated>
        </>
    );
}
