import { NavLink, useLocation } from 'react-router-dom'
import styles from './DropNav.module.css'

function DropNav({ content, showNav, handleClick }) {
  // console.log('dropNav render');
  const pathname = useLocation().pathname
  return (
    <div className={showNav ? styles.mainNav : styles.mainNavHidden} >
      <div className={showNav ? styles.navMask : styles.navMaskHidden} onClick={handleClick}></div>
      <ul className={`${showNav ? styles.navBody : styles.navBodyHidden} ${styles.navBodyDefault}`} >
        {
          content.map((item, index) => {
            return (
              <li key={index} className={`${pathname === item.url ? styles.currentNav : ''} ${pathname.startsWith('/science') ? styles.mainStation : ''}`}>
                <NavLink to={item.url} target="_blank" rel="noopener noreferrer" >{item.title}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DropNav