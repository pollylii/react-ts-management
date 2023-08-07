import React, { lazy } from "react"
// Navigate重定向组件
import { Navigate } from "react-router-dom"
import Home from "../views/Home"
const Page1 = lazy(() => import("../views/Page1"))
const Page2 = lazy(() => import("../views/Page2"))
const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
const routes = [
    // 嵌套路由 开始-------------------
    {
        path: "/",
        element: <Navigate to="/page1" />
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/page1",
                element: withLoadingComponent(<Page1 />)
            },
            {
                path: "/page2",
                element: withLoadingComponent(<Page2 />)
            }
        ]
    }
    // 嵌套路由 结束-------------------
]
export default routes