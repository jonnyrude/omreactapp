import React, { useState } from 'react';
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
  console.log(homeFrontMatter);
  console.log(Object.keys(ContentManifest));

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
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          {/* CREATE TOP TABS
           * TOP * TABS
           */}
          {Data.tabs.map((tab, i) => {
            return (
              <Menu.Item key={i + 1}>
                <Link
                  to={tab.path + tab.chapters[0].path}
                  className="nav-link"
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
                      defaultSelectedKeys={['chpter0']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                      {/* {console.log(propsForSider)} */}
                      {tab.chapters.map((chapter, i) => {
                        return (
                          <Menu.Item key={`chpter${i}`}>
                            <Link to={propsForSider.match.path + chapter.path}>
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
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              style={{
                padding: 24,
                background: '#fff',
                textAlign: 'center'
              }}
            >
              {/* For each tab, create a default route */}
              {/* {Data.tabs.map((tabHome, i) => {
                return (
                  <Route
                    key={`tabhome${i}`}
                    path={tabHome.path}
                    exact={tabHome.exact}
                    render={tabHome.component}
                  />
                );
              })} */}

              {/* Create a route just for homepage */}

              <Route
                key={`homepageContent`}
                path={'/'}
                exact={true}
                render={Data.tabs[0].component}
              />

              {/* For each tab, render a route for it's default content an its chapters */}
              {Data.tabs.map((tb, i) => {
                return (
                  <Route
                    key={`tb${i}`}
                    path={tb.path}
                    exact={false}
                    render={propsForContent => {
                      return tb.chapters.map((chpter, i) => {
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
              })}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Insert Page Through Elements here
          </Footer>
        </Layout>

        {/*  */}
      </Layout>
      {/*
      <Switch>
        <Route exact path="/">
          <ReadingPage pageInfo={ContentManifest['home']} />
        </Route>
        <Route exact path="/resources/">
          <ReadingPage pageInfo={ContentManifest['resources']} />
        </Route>
        <Route exact path="/staff/">
          <ReadingPage pageInfo={ContentManifest['staff']} />
        </Route>
      </Switch> */}
    </Layout>
  );
}

export default App;
