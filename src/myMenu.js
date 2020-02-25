import React from 'react';
import { Menu } from 'antd';
import { Route, Link, Swtich } from 'react-router-dom';

export default function MyMenu(props) {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['chpter0']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {/* {tab.chapters.map((chapter, i) => {
        return (
          <Menu.Item key={`chpter${i}`}>
            <Link to={chapter.path}>{chapter.name}</Link>
          </Menu.Item>
        );
      })} */}
    </Menu>
  );
}
