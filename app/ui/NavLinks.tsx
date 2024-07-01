import { NavLink } from '@/app/lib/definitions'
import Link from 'next/link';

export default function NavLinks({ links }: { links: NavLink[] }) {
    return (
        <>
            {links.map((link) =>
                <Link key={link.linkName} href={link.url}> {link.linkName} </Link>
            )}
        </>
    )
}
