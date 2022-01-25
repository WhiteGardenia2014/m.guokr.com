import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";
import styles from './App.module.css';
import Recommed from './Pages/Recommed';
import CategoryPage from './Pages/CategoryPage';
import NotFound from "./Pages/NotFound";
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'

import logo from './images/guokr.png';
import { useCallback, useState } from "react";

require('./mock.js')

const navContent = [
  { url: '/', title: '推荐' },
  { url: '/science/category/all', title: '最新' },
  { url: '/science/category/science', title: '科技' },
  { url: '/science/category/funny', title: '奇趣' },
  { url: '/science/category/life', title: '生活' },
  { url: '/science/category/health', title: '健康' },
  { url: '/science/category/humanities', title: '人文' },
  { url: '/science/category/nature', title: '自然' },
  { url: '/science/category/digital', title: '数码' },
  { url: '/science/category/food', title: '美食' },
]

const dropNavContent = [
  { url: '/', title: '首页' },
  { url: '/calendar', title: '物种日历' },
  { url: '/foodlab', title: '吃货研究所' },
  { url: '/pretty', title: '美丽也是技术活' },
]

function App() {

  const [showNav, setShowNav] = useState(false)
  const toggleNav = useCallback(() => {
    setShowNav(showNav => !showNav)
  }, [])

  return (
    <Router>
      <div className={styles.App}>
        <header style={{ position: 'fixed', width: '100%', zIndex: '1', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', height: '44px', padding: "0 16px", backgroundColor: 'white', width: '100%', position: 'fixed', zIndex: '500', boxSizing: 'border-box' }}>
            <div onClick={toggleNav} style={{ lineHeight: '44px' }}>
              {showNav ? <CloseOutlined style={{ fontSize: '20px', color: '#ccc' }} /> : <MenuOutlined style={{ fontSize: '20px', color: '#ccc' }} />}
            </div>
            <div className={styles.logo}>
              <Link to="/" title="果壳 科技有意思" style={{ display: 'block', height: '20px' }}>
                <img src={logo} alt="logo" style={{ width: '42px', height: '20px' }} />
              </Link>
            </div>
          </div>
          <div className={styles.mainNav} style={{ zIndex: `${showNav ? '200' : '-1'}`, transition: `z-index 0s ${showNav ? '0s' : '0.6s'}`, position: 'fixed', height: `${showNav ? '100%' : '0'}` }}>
            <div className={styles.nav_mask} style={{ opacity: `${showNav ? '0.7' : '0'}` }}></div>
            <ul className={showNav ? styles.navBody : styles.navBodyHidden} style={{ height: `${showNav ? '330' : '0'}px`, fontSize: '1.6rem' }}>
              {
                dropNavContent.map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <nav className={styles.nav} style={{ boxShadow: 'rgb(0, 0, 0, 0.1) 0px 0px 10px 0px', backgroundColor: 'white' }}>
            {
              navContent.map((item, index) => {
                return <NavLink key={index} to={item.url}>{item.title}</NavLink>
              })
            }
          </nav>
        </header>
      </div>
      <Routes>
        <Route exact path="/" element={<Recommed />} />
        <Route path="/science/category/:name" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
