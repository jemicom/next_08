import Link from 'next/link'
import React from 'react'

const NavLink = ({ item }) => {
    return (
        <Link href={item.path}>{item.title}</Link>
    )
}

export default NavLink