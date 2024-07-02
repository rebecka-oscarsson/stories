'use client'
import { NavLink } from '@/app/lib/definitions'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

export default function NavLinks({ links }: { links: NavLink[] }) {
    const pathname = usePathname()
    return (
        <>
            {links.map((link) =>
                <Link key={link.linkName} href={link.url} style={{
                    backgroundColor: pathname === link.url ? 'green' : 'white',
                  }} > {link.linkName} </Link>
            )}
        </>
    )
}
