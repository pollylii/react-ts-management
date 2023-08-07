import React from 'react';
import { lazy } from 'react'

import Home from "@/views/home"
const About = lazy(() => import("@/views/about"))
// Navigate 重定向组件
import { Navigate } from "react-router-dom"
const withLoadingComponent = (comp: JSX.Element) => {
    return <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
}
const routes = [
    {
        path: "/", //重定向到home
        element: <Navigate to="/home" />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/about",
        element: withLoadingComponent(<About />),
    }
    // { path: "*", element: <Navigate to="/" /> },
]
export default routes
