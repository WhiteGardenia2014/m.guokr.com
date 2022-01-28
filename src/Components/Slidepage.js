import styles from './Slidepage.module.css'

function Slidepage({ params }) {
  return (
    <div className={styles.contentBox}>
      <a href={params.url} target="_blank" rel="noreferrer">
        <img src={params.imgUrl} alt="slidepage" />
        <p className={styles.title}>{params.title}</p>
      </a>
    </div>
  )
}

export default Slidepage