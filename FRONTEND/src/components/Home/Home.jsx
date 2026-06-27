import styles from "./Home.module.css"
import {
  Code2,
  Globe,
  Wrench,
  ArrowRight,
  GitBranch,
  Mail,
  Layers,
} from "lucide-react";
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
var SLUGS = {
  WELCOMENOTE:"welcome_note",
  WELCOMEINTRO:"welcome_intro"
}


  

function Home(props) {
  let [expanded, setExpanded] = useState(false)
  const [welcomeNote, setNote] = useState({slug:SLUGS.WELCOMENOTE, note:""})
  const [welcomeIntro, setIntro] = useState({slug:SLUGS.WELCOMEINTRO, intro:""})
  
  
  useEffect(()=>{
    async function loadContent(){
      try{
        let note = await props.getText(welcomeNote.slug)
        let intro = await props.getText(welcomeIntro.slug)
       setNote(n => ({...n, note:note}))
       setIntro(n => ({...n, intro:intro}))
      } catch(error){
        console.log(error)
       setIntro(n => ({...n, intro:` error Type:${error.type}, error reason: ${error.message}`}))
       setNote(n => ({...n, note:` error Type:${error.type}, error reason: ${error.message}`}))
      }
    }
    loadContent()
  }, [])
  

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>HiHi σ(≧▽≦)σ</div>
        <h1>WELCOME<br />to my <i>coustom web</i></h1>
        <p className={styles.sub}>
          {welcomeNote.note}
        </p>
      {/*<div className={styles.cta}>
          <a href="/projects" className={styles.btnFill}>See my work <ArrowRight size={14} /></a>
          <a href="/about" className={styles.btnLine}>About me</a>
        </div> */}
      </div>

      <section className={styles.section}>
        <div className={styles.label}>short brief</div>
        <h2>What is this?</h2>
        <p className={styles.about}>  {expanded ? welcomeIntro.intro : welcomeIntro.intro.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setExpanded(!expanded)
  }}
  style={{
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    font: "inherit",
    color: "inherit",
    cursor: "pointer",
    display: "inline",
    fontWeight:600,
    color:"black"
  }}
>
{expanded ? ' See less' : ' See more'}
</button></p>
        
        <a href="/about" className={styles.cardLink}>Full story <ArrowRight size={11} /></a>
      </section>
<section className={styles.section}>
  <div className={styles.label}>What I have done</div>

  <div className={styles.sectionHead}>
    <h2>A bit of my work</h2>
    <span className={styles.sectionCount}>03 things</span>
  </div>

  <div className={styles.grid}>
    <Link to="/projects" className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardIndex}>01</span>
        <span className={styles.thumb}><Code2 size={20} /></span>
      </div>
      <div className={styles.cardBody}>
        <h3>Codes</h3>
        <p>A handful of mini projects, scripts, and experiments.</p>
      </div>
      <div className={styles.cardFoot}>
        <span>View codes</span>
        <ArrowRight size={14} className={styles.cardArrow} />
      </div>
    </Link>

    <Link to="/contacts" className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardIndex}>02</span>
        <span className={styles.thumb}><Mail size={20} /></span>
      </div>
      <div className={styles.cardBody}>
        <h3>Contacts</h3>
        <p>Ways to reach me, all in one place.</p>
      </div>
      <div className={styles.cardFoot}>
        <span>View contacts</span>
        <ArrowRight size={14} className={styles.cardArrow} />
      </div>
    </Link>

    <Link to="/about" className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardIndex}>03</span>
        <span className={styles.thumb}><Layers size={20} /></span>
      </div>
      <div className={styles.cardBody}>
        <h3>About This Web</h3>
        <p>How this site is structured and built, tools included.</p>
      </div>
      <div className={styles.cardFoot}>
        <span>View details</span>
        <ArrowRight size={14} className={styles.cardArrow} />
      </div>
    </Link>
  </div>
</section>


      <section className={styles.section}>
        <div className={styles.label}>need conracts ?</div>
        <h2>Get in touch</h2>
        <div className={styles.links}>
          <a href="https://github.com/codeaddicthq" className={styles.iconLink}>
            <GitBranch size={18} /> GitHub
          </a>
        </div>
      </section>

    </div>
  )
}

export default Home