import styles from './DropNav.module.css'

function DropNav({ content, showNav }) {

  return (
    <div className={showNav ? styles.mainNav : styles.mainNavHidden} >
      <div className={styles.nav_mask} style={{ opacity: `${showNav ? '0.7' : '0'}` }}></div>
      <ul className={`${showNav ? styles.navBody : styles.navBodyHidden} ${styles.navBodyDefault}`} >
        {
          content.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DropNav