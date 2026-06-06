import styles from "./Project.module.css"
import {Link} from 'react-router-dom'
function Projects() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>All Projects</div>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.sub}>Browse projects by category</p>
      </div>

      <div className={styles.grid}>

        <div className={styles.card}>
          <div className={styles.thumb}>🐍</div>
          <div className={styles["card-body"]}>
            <h3>Python</h3>
            <p>Scripts, games etc</p>
            <Link to="/projects/py" className={styles["card-link"]}>View all →</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.thumb}>🌐</div>
          <div className={styles["card-body"]}>
            <h3>Js</h3>
            <p>Normal js scripts</p>
            <Link to="/projects/js" className={styles["card-link"]}>View all →</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.thumb}>🤖</div>
          <div className={styles["card-body"]}>
            <h3>Html and css</h3>
            <p>Only static sciprts with css and html</p>
            <Link to="/projects/hc" className={styles["card-link"]}>View all →</Link>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.thumb}>🛠️</div>
          <div className={styles["card-body"]}>
            <h3>Others</h3>
            <p>Fuck</p>
            <Link to="/projects/ot" className={styles["card-link"]}>View all →</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Projects