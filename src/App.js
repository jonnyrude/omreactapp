import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb, Button } from 'antd';
import ContentManifest from './content/contentManifest.json';
import { Data } from './dataSource.js';
import MyMenu from './myMenu.js';

// CONTENT
import Home, {
  frontMatter as homeFrontMatter
} from './content/home/homepage.mdx';
import MenuItem from 'antd/lib/menu/MenuItem';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// TODO: Add Ant library pieces
// TODO: Add Header
// TODO: Add Tabs across Top, each tab takes you to a new route
// TODO:
// TODO:

function App() {
  useEffect(() => {
    //
    // This section highlights the correct tab, based on the url
    //
    let pagePath = window.location.hash.slice(2);
    document.querySelectorAll('.tab-menu-item').forEach(i => {
      if (i.id === '') {
        // Home tab is special, because of it's path
        if (
          window.location.hash === '#/' && // if home
          !i.className.includes('ant-menu-item-selected') // and not highlighted
        ) {
          i.classList.toggle('ant-menu-item-selected'); // highlight
        } else if (
          !window.location.hash === '/#' && // if NOT home
          i.className.includes('ant-menu-item-selected') // but ARE highlighted
        ) {
          i.classList.toggle('ant-menu-item-selected'); // un-highlight
        }
      } else if (
        // if item is highlighted, but we're not at it's path
        i.className.includes('ant-menu-item-selected') &&
        !pagePath.startsWith(i.id)
      ) {
        i.classList.toggle('ant-menu-item-selected'); // un-highlight
      } else if (
        // if we are at the path and NOT highlighted
        pagePath.includes(i.id) &&
        !i.className.includes('ant-menu-item-selected')
      ) {
        i.classList.toggle('ant-menu-item-selected'); // highlight it
      }
    });
  });

  const [tab, setTab] = useState(0);
  const [chapter, setChapter] = useState(1);
  return (
    <Layout>
      <Header className="header">
        {/* NOTHING IN THIS LOGO YET */}
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          {/*
           * CREATE TOP   TABS   TABS    TABS    TABS
           *
           */}
          {Data.tabs.map((tab, i) => {
            return (
              <Menu.Item
                key={i + 1}
                id={tab.path.slice(1)}
                className={
                  'tab-menu-item'
                  // (window.location.hash === '#/' && tab.name === 'Home') ||
                  // window.location.hash.slice(2).startsWith(tab.path.slice(1))
                  //   ? 'ant-menu-item-select'
                  //   : ''
                }
              >
                <Link
                  to={
                    tab.chapters === undefined
                      ? tab.path
                      : tab.path + tab.chapters[0].path
                  }
                  className="tab-link"
                  // style={{ color: 'red' }}
                >{`${tab.name}`}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Layout>
        <Sider
          collapsible="true"
          style={{
            overflow: 'auto',
            height: '100vh',
            positions: 'fixed',
            left: '0'
          }}
        >
          {/* ****
           *
           * Sider Menu
           *
           * * */}

          <Switch>
            {Data.tabs.map((tab, i) => {
              return (
                <Route
                  key={i}
                  path={`${tab.path}`}
                  exact={tab.exact}
                  render={propsForSider => (
                    <Menu
                      theme="dark"
                      mode="inline"
                      // defaultSelectedKeys={['chpter0']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                      {/* {console.log(propsForSider)} */}
                      {tab.chapters &&
                        tab.chapters.map((chapter, i) => {
                          return (
                            <Menu.Item
                              key={`chpter${i}`}
                              className={
                                window.location.hash.endsWith(chapter.path) &&
                                'ant-menu-item-selected'
                              }
                            >
                              <Link
                                to={propsForSider.match.path + chapter.path}
                              >
                                {chapter.name}
                              </Link>
                            </Menu.Item>
                          );
                        })}
                    </Menu>
                  )}
                ></Route>
              );
            })}
          </Switch>
        </Sider>
        <Layout style={{ marginLeft: 20 }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              style={{
                padding: 24,
                background: '#fff',
                textAlign: 'center'
              }}
            >
              {/* For each tab, render a route for it's default content an its chapters */}
              {Data.tabs.map((tb, i) => {
                if (tb.chapter === undefined) {
                  return (
                    <Route
                      key={`tbhome#${i}`}
                      path={tb.path}
                      render={tb.component}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={`tb${i}`}
                      path={tb.path}
                      exact={false}
                      render={propsForContent => {
                        /* If tab has no chapters, it better have a component */

                        tb.chapters.map((chpter, i) => {
                          return (
                            <Route
                              key={`tbchptr#${i}`}
                              path={propsForContent.match.path + chpter.path}
                              render={chpter.component}
                            />
                          );
                        });
                      }}
                    ></Route>
                  );
                }
              })}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Insert Page Through Elements here
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
