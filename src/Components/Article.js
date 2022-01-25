import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'
import styles from './Article.module.css'


function Article({ title, desc, author, url, imgUrl }) {
  return (
    <div className={styles.articleBox}>
      <a target="_blank" href={url} style={{ textDecoration: 'none', color: 'black' }} rel="noreferrer">
        <div className={styles.content} >
          <div className={styles.title}>{title}</div>
          <div className={styles.body} >
            <div className={styles.descbox} >
              <div className={styles.desc} >{desc}</div>
              <div style={{ color: 'rgb(179 179 179)' }}><span><UserOutlined style={{ fontSize: '12px', marginRight: '5px' }} /></span>{author}</div>
            </div>
            <div>
              <div style={{ height: '60px', width: '90px' }}>
                <img src={imgUrl} alt='info' style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Article

