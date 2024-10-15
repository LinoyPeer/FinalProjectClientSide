import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBarLink({ to, style, children }) {
    return (
        <>
            <Link
                to={to}
                style={{ display: 'inline-flex', ...style }}
            >
                {children}
            </Link>
        </>
    )
}
