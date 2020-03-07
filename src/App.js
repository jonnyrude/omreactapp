import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Input, Card, Typography } from 'antd';
import ContentManifest from './content/contentManifest.json';
import { Data } from './dataSource.js';
import MyMenu from './myMenu.js';
import { MDXProvider } from '@mdx-js/react';
import { ComponentMap } from './componentMap.js';

// CONTENT
import Home, {
  frontMatter as homeFrontMatter
} from './content/home/homepage.mdx';
import MenuItem from 'antd/lib/menu/MenuItem';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// TODO:
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

  //
  //  SEARCH FUNCTION
  //
  // Returns an array of chapters with their name, path (/tab/chapter), and frontMatter
  const search = function(searchTerm) {
    let searchResults = [];
    let lowerSearch = searchTerm.toLowerCase();
    Data.tabs.forEach(tabsToSearch => {
      // console.log(tabsToSearch.name);
      tabsToSearch.chapters.forEach(chapterToSearch => {
        if (chapterToSearch.mdxFrontMatter) {
          let mdx = chapterToSearch.mdxFrontMatter;

          if (
            mdx.title.toLowerCase().includes(lowerSearch) ||
            mdx.slug.toLowerCase().includes(lowerSearch)
          ) {
            searchResults.push({
              chapterName: chapterToSearch.name,
              fullPath: tabsToSearch.path + chapterToSearch.path,
              chapterSlug: chapterToSearch.mdxFrontMatter.slug
            });
          }
        }
      });
    });

    // Sort results by first appearance of search term
    // Chapter first, then slug
    return searchResults.sort((a, b) => {
      let aLowerChapter = a.chapterName.toLowerCase();
      let bLowerChapter = b.chapterName.toLowerCase();
      let aLowerSlug = a.chapterSlug.toLowerCase();
      let bLowerSlug = b.chapterSlug.toLowerCase();

      if (aLowerChapter.includes(lowerSearch)) {
        return bLowerChapter.includes(lowerSearch)
          ? aLowerChapter.indexOf(lowerSearch) -
              bLowerChapter.indexOf(lowerSearch)
          : -1;
      } else if (bLowerChapter.includes(lowerSearch)) {
        return 1;
      } else if (aLowerSlug.includes(lowerSearch)) {
        return bLowerSlug.includes(lowerSearch)
          ? aLowerSlug.indexOf(lowerSearch) - bLowerSlug.indexOf(lowerSearch)
          : -1;
      } else if (bLowerSlug.includes(lowerSearch)) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const [searchResults, setSearchResults] = useState([]);

  return (
    // this first wrapper translates each defauld mdx -> HTML into a given component
    // as declared in compnentMap.js
    <MDXProvider components={ComponentMap}>
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
                    to={tab.path + tab.chapters[0].path}
                    className="tab-link"
                    // style={{ color: 'red' }}
                  >{`${tab.name}`}</Link>
                </Menu.Item>
              );
            })}

            {/*
             * *
             * SEARCH BAR
             * *
             * *
             * */}

            <div className="menuSearch">
              <Link to="/search" draggable="false">
                <Input.Search
                  placeholder="Search"
                  enterButton="Search"
                  onSearch={(value, event) => {
                    console.log(`Searched for: ${value}`);
                    let results = search(value);
                    setSearchResults(results);
                  }}
                  // onChange={e => console.log(e)}
                />
              </Link>
            </div>
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

            {/*
             *
             *  MAIN
             *   CONTENT
             *
             *
             *
             *  */}

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="contentDiv">
                {' '}
                <Route
                  key={`homepageContent`}
                  path={'/'}
                  exact={true}
                  render={Data.tabs[0].component}
                />
                {/* Create a route for the seach */}
                <Route
                  key={'searchKey'}
                  path={'/search'}
                  exact
                  render={() => {
                    return (
                      <div className="resultsPane">
                        {searchResults.length > 0 ? (
                          searchResults.map(matchingChapter => {
                            return (
                              <Link to={matchingChapter.fullPath}>
                                <Card
                                  size="small"
                                  title={matchingChapter.chapterName}
                                  className="resultCard"
                                >
                                  {matchingChapter.chapterSlug}
                                </Card>
                              </Link>
                            );
                          })
                        ) : (
                          <span>No Matching Search Results</span>
                        )}
                      </div>
                    );
                  }}
                />
                {/* For each tab, render a route for it's default content and its chapters */}
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
        </Layout>
      </Layout>
    </MDXProvider>
  );
}

export default App;
