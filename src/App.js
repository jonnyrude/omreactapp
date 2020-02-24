import React, { useState } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb, Button } from 'antd';
import ContentManifest from './content/contentManifest.json';
import { Data } from './dataSource.js';

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
                <Link to={tab.path} className="nav-link">{`${tab.name}`}</Link>
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
                  cponent={Menu}
                >
                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['chpter0']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                  >
                    {tab.chapters.map((chapter, i) => {
                      return (
                        <Menu.Item key={`chpter${i}`}>
                          <Link to={chapter.path}>{chapter.name}</Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Route>
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
              <Home />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Insert Page Through Elements here
          </Footer>
        </Layout>
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
