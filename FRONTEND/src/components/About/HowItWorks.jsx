import styles from "./About.module.css"
import { Lightbulb, Code2, TestTube, Rocket } from "lucide-react"
import {useState, useEffect}  from 'react'


var SLUGS = {
  FRONTEND:"thisweb_frontend",
  BACKEND:"thisweb_backend",
  DB:"thisweb_tools",
  MORE:"thisweb_deploy",
  HOWITWORKSINTRO:"thisweb_intro"
  }

function HowItWorks(props) {
  const [introexpend, setIntroExpend] = useState(false)
  const [frontendexpend, setFrontendExpend] = useState(false)
  const [backendexpend, setBackendExpend] = useState(false)
  const [dbexpend, setDbExpend] = useState(false)
  const [moreexpend, setMoreExpend] = useState(false)
  
  const [introText, setIntroText] = useState({slug:SLUGS.HOWITWORKSINTRO, text:"LOADING...."})
  
  const [frontendText, setFrontendText] = useState({slug:SLUGS.FRONTEND, text:"LOADING...."})
  
  const [backendText, setBackendText] = useState({slug:SLUGS.BACKEND, text:""})
  
  const [dbText, setDbText] = useState({slug:SLUGS.DB, text:"LOADING...."})
  
  const [moreText, setMoreText] = useState({slug:SLUGS.MORE, text:"LOADING...."})
  
  
  useEffect(()=>{
    async function loadData(){
      try{
      let intro = await props.getText(SLUGS.HOWITWORKSINTRO)
      let frontend = await props.getText(SLUGS.FRONTEND)
      let backend = await props.getText(SLUGS.BACKEND)
      let db = await props.getText(SLUGS.DB)
      let more = await props.getText(SLUGS.MORE)

      setIntroText((i)=>({...i, text:intro}))
      setFrontendText((i)=>({...i, text:frontend}))
      setBackendText((i)=>({...i, text:backend}))
      setDbText((i)=>({...i, text:db}))
      setMoreText((i)=>({...i, text:more}))
       
      } catch(err){
      const errorText = err?.message || "Something went wrong";
            setFrontendText((i)=>({...i, text:errorText}))
      setIntroText((i)=>({...i, text:errorText}))
      setBackendText((i)=>({...i, text:errorText}))
      setDbText((i)=>({...i, text:errorText}))
      setMoreText((i)=>({...i, text:errorText}))
      }
    }
    loadData()
  }, [])
  

  
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>Process</div>
        <h1>How it works</h1>

  <p className={styles.sub}>  {introexpend ? introText.text : introText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setIntroExpend(!introexpend)
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
{introexpend ? ' See less' : ' See more'}
</button></p>
      </div>

      <section className={styles.section}>
        <div className={styles.label}>The Flow</div>
        <h2>Things Used</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepIcon}><Lightbulb size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>01</div>
              <h3>Frontend</h3>
  <p className={styles.about}>  {frontendexpend ? frontendText.text : frontendText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setFrontendExpend(!frontendexpend)
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
{frontendexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><Code2 size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>02</div>
              <h3>Backend</h3>

<p className={styles.about}>  {backendexpend ? backendText.text : backendText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setBackendExpend(!backendexpend)
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
{backendexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><TestTube size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>03</div>
              <h3>Tools used</h3>
<p className={styles.about}>  {dbexpend ? dbText.text : dbText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setDbExpend(!dbexpend)
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
{dbexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><Rocket size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>04</div>
              <h3>Deploy</h3>

<p className={styles.about}>  {moreexpend ? moreText.text : moreText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setMoreExpend(!moreexpend)
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
{moreexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>


        </div>
      </section>

    </div>
  )
}

export default HowItWorks