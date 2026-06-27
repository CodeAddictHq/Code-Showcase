import styles from "./Footer.module.css"
import { Code2, Mail, GitBranch, Heart } from "lucide-react"
import {Link} from "react-router-dom"
function Footer() {
  return (
    <footer className={styles.footer}>
      <div id={styles.div1}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Code2 size={20} />
          <span>adib.codeaddict.dev</span>
        </div>
        <p className={styles.tagline}>It ends here :), you are in the bottom of this  ocean.
        </p>
      </div>
      <div className={styles.social}>

        <Link to="/contacts" className={styles.iconLink}>
          <Mail size={16} /> Email
        </Link>
      </div>
      </div>
      <div className={styles.bottom}>
        <span>Made with <Heart size={12} className={styles.heart} /> by ADIB</span>
        <span>© 2k26</span>
      </div>

    </footer>
  )
}

export default Footer