import { ReactNode } from 'react'
import React from 'react';
import { routes } from '@/routes';
import { NavLink } from 'react-router-dom';

interface PropsInterface{
    children: ReactNode;
}

const Layout = ({children}: PropsInterface) => {
    return(
        <div className="h-screen flex">
            <aside className="w-4/12 p-10">
                <ul>
                    {routes.map((route) => {
                        return (
                            <li key={route.path}>
                                <NavLink to={route.path}>
                                    {route.name}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </aside>
            <main className="w-9/12 p-10">
                {children}
            </main>
        </div>
    )
}

export default Layout;