"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import '../styles/breadcrumb.css'

export default function Breadcrumb() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);

    return (
        <nav className="breadcrumb">
            <Link href="/home">Dashboard</Link>

            {paths.map((path, index) => {
                const href = "/" + paths.slice(0, index + 1).join("/");
                const label = path.replace("-", " ");

                return (
                    <span key={href}>
                        <span>&gt; &nbsp;</span>
                        <Link href={href}>{label}</Link>
                    </span>
                );
            })}
        </nav>
    );
}
