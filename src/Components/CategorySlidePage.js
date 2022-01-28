import styles from './CategorySlidePage.module.css'
import { RightCircleFilled } from '@ant-design/icons';

function CategorySlidePage({ params }) {
  return (
    <div className={styles.contentBox}>
      <div className={styles.categoryInfo}>
        <a href={params.url} target='_blank' rel="noreferrer">{params.category}</a><RightCircleFilled style={{ fontSize: '14px', margin: '0 8px' }} />
      </div>
      <ul className={styles.articleList}>
        {
          params.articles.map(({ url, title, imgUrl }, index) => {
            return(
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

export default CategorySlidePage