import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'
import styles from './Article.module.css'


function Article({ title, desc, author, url, imgUrl }) {
  return (
    <div className={styles.articleBox}>
      <a target="_blank" href={url} rel="noreferrer">
        <div className={styles.content} >
          <div className={styles.title}>{title}</div>
          <div className={styles.body} >
            <div className={styles.descbox} >
              <div className={styles.desc} >{desc}</div>
              <div>
                <span className={styles.author}><UserOutlined style={{ fontSize: '12px', marginRight: '5px' }} />{author}</span>
              </div>
            </div>
            <div>
              <div className={styles.imgbox} >
                <img src={imgUrl} alt='info' />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Article

