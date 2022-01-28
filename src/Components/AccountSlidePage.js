import styles from './AccountSlidePage.module.css'
import { RightCircleFilled } from '@ant-design/icons';


function AccountSlidePage({ params }) {
  return (
    <div className={styles.contentBox}>
      <div className={styles.authorInfo}>
        <div className={styles.avatar}>
          <img src={params.account.imgUrl} alt='avatar'></img>
        </div>
        <div className={styles.info}>
          <div className={styles.name}><p>{params.account.name}</p><RightCircleFilled style={{ fontSize: '14px', margin: '0 8px' }} /></div>
          <div className={styles.desc}>{params.account.desc}</div>
        </div>
      </div>
      <ul className={styles.articleList}>
        {
          params.articles.map(({ url, imgUrl, title }, index) => {
            return (
              <li key={index} className={styles.articleItem}>
                <div className={styles.imgBox}>
                  <img src={imgUrl} alt='article'></img>
                </div>
                <a href={url} target='_blank' rel='noreferrer'>{title}</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default AccountSlidePage