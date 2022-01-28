import { NavLink, Outlet } from 'react-router-dom'
import styles from './MainStation.module.css'

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

function MainStation() {
  return (
    <div>
      <nav className={styles.nav} >
        {
          navContent.map((item, index) => {
            return <NavLink key={index} to={item.url}>{item.title}</NavLink>
          })
        }
      </nav>
      <div style={{marginTop: '83px' }}></div>
      <Outlet />
    </div>
  )
}

export default MainStation