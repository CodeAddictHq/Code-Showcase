import styles from "./Home.module.css"
import { Code2, Globe, Wrench, ArrowRight, GitBranch, Mail } from "lucide-react"
import {Link} from "react-router-dom"
import {useState, useEffect} from 'react'
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
        <h2>A bit of my works</h2>

          <div className={styles.grid}>
          
          <div className={styles.card}>
            <div className={styles.thumb}><Code2 size={28} /></div>
            <div className={styles.cardBody}>
              <h3>Codes</h3>
              <p>This shows my recent mini projects scripts etc etc </p>
              <Link to="/projects" className={styles.cardLink}>view codes <ArrowRight size={11} /></Link>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.thumb}><Globe size={28} /></div>
            <div className={styles.cardBody}>
              <h3>Contacts</h3>
              <p>Heres my contacts</p>
              <Link to="/contacts" className={styles.cardLink}>view  <ArrowRight size={11} /></Link>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.thumb}><Globe size={28} /></div>
            <div className={styles.cardBody}>
              <h3>About This Web</h3>
              <p>If you want tp know about this web , structure, buid tools etc here are they</p>
              <Link to="/about" className={styles.cardLink}>view codes <ArrowRight size={11} /></Link>
            </div>
          </div>
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