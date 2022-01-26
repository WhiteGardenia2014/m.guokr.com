import styles from './Slidepage.module.css'

function Slidepage({title,imgUrl}){
  return (
      <div className={styles.contentBox}>
        <img src={imgUrl} alt="slidepage"/>
        <p className={styles.title}>{title}</p>
      </div>
  )
}

export default Slidepage