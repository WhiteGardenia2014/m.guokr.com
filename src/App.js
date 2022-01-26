import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";
import styles from './App.module.css';
import Recommed from './Pages/Recommed';
import CategoryPage from './Pages/CategoryPage';
import NotFound from "./Pages/NotFound";
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useCallback, useState } from "react";
import DropNav from './Components/DropNav'

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
        <header className={styles.header} >
          <div className={styles.headerLayout}>
            <div className={styles.toggleButton} onClick={toggleNav} >
              {showNav ? <CloseOutlined /> : <MenuOutlined />}
            </div>
            <div className={styles.logo}>
              <Link to="/" title="果壳 科技有意思">
                <img src='/images/guokr.png' alt="logo" />
              </Link>
            </div>
          </div>
          <DropNav content={dropNavContent} showNav={showNav}></DropNav>
          <nav className={styles.nav} >
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
