import React, { lazy } from "react"
// Navigate重定向组件
import { Navigate } from "react-router-dom"
import Home from "../views/Home"
const Login = lazy(() => import("../views/Login"))
const Page1 = lazy(() => import("../views/Page1"))
const Page2 = lazy(() => import("../views/Page2"))
const Page3 = lazy(() => import("@/views/Page3"))
const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
const routes = [
    // 嵌套路由 开始-------------------
    {
        path: "/login",
        element: <Login />
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
            },
            {
                path: "/page3/page301",
                element: withLoadingComponent(<Page3 />),
            }
        ]
    },
    // 嵌套路由 结束-------------------
    // 访问其余的都直接到首页：
    {
        path: "*",
        element: <Navigate to="/page1" />
    },
]
export default routes