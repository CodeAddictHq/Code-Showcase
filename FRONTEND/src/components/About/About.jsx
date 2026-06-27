import styles from "./About.module.css"
import { User, MapPin, Coffee, ArrowRight } from "lucide-react"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
var SLUGS = {
  MYINTRO:"about_intro"
}

function About(props) {
  const [expanded, setExpanded] = useState(false);

  const [myIntro, setIntro] = useState({slug:SLUGS.MYINTRO, intro:""})
  
  useEffect(()=>{
    async function loadData(){
      try{
      let intro = await props.getText(SLUGS.MYINTRO)
      setIntro((i)=>({...i, intro:intro}))
      } catch(err){
      setIntro((i)=>({...i, intro:err.message}))
      }
    }
    loadData()
  }, [])
  
  
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>About me</div>
        <h1>Who I am</h1>
        <p className={styles.sub}>
  {expanded ? myIntro.intro : myIntro.intro.slice(0, 120) + '...'}
  <button className={styles.seemore} onClick={() => setExpanded(!expanded)}>
    {expanded ? ' See less' : ' See more'}
  </button>
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.label}>Background</div>
        <h2>Heres Everything</h2>


        <div className={styles.bio}>
          <Link className={styles.links} to="/about/reason">
          <div className={styles.bioCard}>
            <MapPin size={20} className={styles.icon} />
            <div>
                <h3>Reason to make this web</h3>
              <p>If you want to know in detail why this website was created and what the main purpose behind building it is, you can click here to read more.</p>
            </div>
          </div>
            </Link>
          <Link className={styles.links} to="/about/how-it-works">
          <div className={styles.bioCard}>
            <MapPin size={20} className={styles.icon} />
            <div>
                <h3>How This Web Works</h3>
              <p>If you are interested in knowing which programming languages, tools, and technologies were used to build this website, or how the development process was done step by step, you can click here for full details.
</p>
            </div>
          </div>
            </Link>
          <Link className={styles.links} to="/about/goal">
          <div className={styles.bioCard}>
            <MapPin size={20} className={styles.icon} />
            <div>
                <h3>My goal</h3>
              <p>If you want to learn about my future goals, plans, and what I want to achieve in the coming days, you can click here to explore more.
</p>
            </div>
          </div>
            </Link>
          <Link className={styles.links} to="/contacts">
          <div className={styles.bioCard}>
            <MapPin size={20} className={styles.icon} />
            <div>
                <h3>All contacts</h3>
              <p>If you need my contact details, you can find all the ways to reach me here.</p>
            </div>
          </div>
            </Link>
            
            
            


        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.label}>Skills</div>
        
        <h2>Heres my stack for this web</h2>

        <div className={styles.skillGrid}>
          <div className={styles.skillGroup}>
            <div className={styles.skillTitle}>Languages</div>
            <div className={styles.tags}>
              <span className={styles.tag}>Python</span>
              <span className={styles.tag}>JavaScript</span>
              <span className={styles.tag}>HTML</span>
              <span className={styles.tag}>CSS</span>
            </div>
          </div>

          <div className={styles.skillGroup}>
            <div className={styles.skillTitle}>Frameworks</div>
            <div className={styles.tags}>
              <span className={styles.tag}>Django</span>
              <span className={styles.tag}>Django Rest Framework</span>
              <span className={styles.tag}>React</span>
            </div>
          </div>

          <div className={styles.skillGroup}>
            <div className={styles.skillTitle}>Tools</div>
            <div className={styles.tags}>
              <span className={styles.tag}>Git - version tracker</span>
              <span className={styles.tag}>Acode - Editor</span>
              <span className={styles.tag}>Termux - Terminal</span>
              <span className={styles.tag}>Gunicorn&Uvicorn - Server</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.label}>More</div>
        <h2>Explore</h2>
        <div className={styles.cta}>
          <Link to="/projects" className={styles.btnFill}>
            See my projects
            <ArrowRight size={14} />
            </Link>
        </div>
      </section>

    </div>
  )
}

export default About