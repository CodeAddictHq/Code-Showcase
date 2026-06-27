import styles from "./NotFound.module.css"
import { ArrowLeft, SearchX } from "lucide-react"

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>


        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.sub}>
          The page you are looking for does not exist or has been moved.
        </p>

        <a href="/" className={styles.btnFill}>
          <ArrowLeft size={14} /> Back to home
        </a>

      </div>
    </div>
  )
}

export default NotFound