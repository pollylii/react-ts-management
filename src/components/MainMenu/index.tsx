import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom"
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
// 登录请求到数据之后就可以跟items这个数组匹配了
const items: MenuItem[] = [
  {
    label: '栏目 1',
    key: '/page1',
    icon: <PieChartOutlined />,
  },
  {
    label: '栏目 2',
    key: '/page2',
    icon: <DesktopOutlined />,
  },
  {
    label: '栏目 3',
    key: 'page3',
    icon: <UserOutlined />,
    children: [
      {
        label: '栏目 301',
        key: '/page3/page301',
      },
      {
        label: '栏目 302',
        key: '/page3/page302',
      },
      {
        label: '栏目 303',
        key: '/page3/page303',
      }
    ]
  },
  {
    label: '栏目 4',
    key: 'page4',
    icon: <TeamOutlined />,
    children: [
      {
        label: 'Team 1',
        key: '/page4/page401',
      },
      {
        label: 'Team 2',
        key: '/page4/page402',
      }
    ]
  },
  {
    label: '栏目 5',
    key: 'page5',
    icon: <FileOutlined />,
  }
];
const mainMenu: React.FC = () => {
  const navigateTo = useNavigate()
  const currentRoute = useLocation()

  //如果发现加载两次，这是开发环境下才会生产环境就不会了，在main.tsx把严格，模式标签去掉就不会了。
  //至于为什么react要它加载两次详情见：https://blog.csdn.net/HYHhmbb/article/details/125973790
  //console.log("加载了菜单", currentRoute);

  const menuClick = (e: { key: string }) => {
    //console.log("点击了菜单", e.key);
    // 点击跳转到对应的路由 编程式导航跳转， 利用到一个hook
    navigateTo(e.key);
  }

  // 处理当前需要展开的项目
  let firstOpenKeys: string = " "
  function findKey(obj: { key: string }) {
    return obj.key === currentRoute.pathname;
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i]!['children'] && items[i]!['children'].length > 1 && items[i]!
    ['children'].find(findKey)) {
      // console.log(items[i]!.key);
      firstOpenKeys = items[i]!.key as string;
      break;
    }
  }

  // openKeys 当前所有展开着的数组，一开始给空默认不展示
  const [openKeys, setOpenKeys] = useState([firstOpenKeys]);
  const hdOpenChange = (keys: string[]) => {
    // 点击展开和收缩的时候执行这里的代码
    // console.log(keys); // 这些展开这的keys的数组
    setOpenKeys([keys[keys.length - 1]]);
  }

  return (
    // defaultSelectedKeys={[currentRoute.pathname]} 处理当前项的样式
    // openKeys={openKeys} 展开哪些项
    <Menu theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline" items={items} onClick={menuClick}
      openKeys={openKeys}
      onOpenChange={hdOpenChange} />
  )
}
export default mainMenu