import styles from './Header.module.css'
import DropNav from './DropNav'
import { Link } from "react-router-dom"
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useCallback, useState } from 'react'

const dropNavContent = [
  { url: '/', title: '首页' },
  { url: '/calendar', title: '物种日历' },
  { url: '/foodlab', title: '吃货研究所' },
  { url: '/pretty', title: '美丽也是技术活' },
]

function Header() {
  const [showNav, setShowNav] = useState(false)
  const toggleNav = useCallback(() => {
    setShowNav(showNav => !showNav)
  }, [])

  const handleClick = useCallback(() => {
    toggleNav()
  }, [toggleNav])

  return (
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
      <DropNav content={dropNavContent} showNav={showNav} handleClick={handleClick}></DropNav>
    </header>
  )
}

export default Header