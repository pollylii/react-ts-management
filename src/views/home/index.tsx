import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom"
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('栏目 1', '/page1', <PieChartOutlined />),
    getItem('栏目 2', '/page2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'),
    getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const menuClick = (e: { key: string }) => {
    console.log(e.key); // ！！！【重点】获取点击到的key就是上面的这些数字，所以我们需要把上面的key换成对应路径
};
const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    {/* 【!!!!】定义跳转对象 */ }
    const navigateTo = useNavigate();
    const menuClick = (e: { key: string }) => {
        {/* console.log(e.key);*/ }
        navigateTo(e.key)
    }
    // openKeys 当前所有展开着的数组，一开始给空默认不展示
    const [openKeys, setOpenKeys] = useState(['']);
    const hdOpenChange = (keys: string[]) => {
        // 点击展开和收缩的时候执行这里的代码
        // console.log(keys); // 这些展开这的keys的数组
        // 设置为最后一项
        setOpenKeys([keys[keys.length - 1]]);
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 侧边栏 */}
            <Sider collapsible collapsed={collapsed} onCollapse={value =>
                setCollapsed(value)}>
                {/* 侧边栏顶部logo */}
                <div className="logo" ></div>
                {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}
                    onClick={menuClick} /> */}
                <Menu theme="dark" defaultSelectedKeys={['/page1']} mode="inline"
                    items={items} onClick={menuClick}
                    // 补充这1个属性 和1个事件：
                    // openKeys 表示当前所有展开着的数组
                    openKeys={openKeys}
                    // 点击展开和收缩的时候执行这里的代码
                    onOpenChange={hdOpenChange} />
            </Sider>
            {/* 右侧界面 */}
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{
                    paddingLeft:
                        '16px'
                }} >
                    {/* 面包屑 */}
                    <Breadcrumb className='crumb'>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                {/* 内容部分 */}
                {/* 内容部分 */}
                <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">
                    {/* 【!!!!重点】设置占位符展示窗口
                    注意：嵌套路由的占位符展示窗口需要用Outlet组件，
                    这里和根路由的展示有所区别
                    */}
                    <Outlet />
                </Content>
                {/* 页脚部分 */}
                <Footer style={{
                    textAlign: 'center', height: "48px", padding: 0,
                    lineHeight: "48px",
                }}>通用后台管理系统 ©2022 </Footer>
            </Layout>
        </Layout>
    );
};
export default View;