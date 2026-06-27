import styles from "./About.module.css"
import {useState, useEffect} from 'react'
import { Target, BookOpen, Users, TrendingUp } from "lucide-react"
var SLUGS = {
  MYGOAL:"goal_intro",
  AI:'goal_ai',
  HEAVYBACKEND:"goal_heavybackend",
  LIGHTFRONTEND:"goal_frontend",
  CAREEAR:"goal_careear",
}
var loadingText = "LOADING..."
function Goal(props) {
  const [introexpend, setIntroExpend] = useState(false)
  const [aiexpend, setAiExpend] = useState(false)
  const [backendexpend, setBackendExpend] = useState(false)
  const [frontendexpend, setFrontendExpend] = useState(false)
  const [ careearexpend, setCareearExpend] = useState(false)
  
  
  
  const [goalText, setGoalText] = useState({slug:SLUGS.MYGOAL, text:loadingText})
  
  const [aiText, setAiText] = useState({slug:SLUGS.AI, text:loadingText})
  
  const [heavyBackend, setHeavyBackend] = useState({slug:SLUGS.HEAVYBACKEND, text:loadingText})
  
  const [lightFrontend, setLightFrontend] = useState({slug:SLUGS.LIGHTFRONTEND, text:loadingText})
  
  const [careearText, setCareearText] = useState({slug:SLUGS.CAREEAR, text:loadingText})
  
  
  useEffect(()=>{
    
    async function loadData(){
      try{
      let goal = await props.getText(SLUGS.MYGOAL)
      let ai = await props.getText(SLUGS.AI)
      let backend = await props.getText(SLUGS.HEAVYBACKEND)
      let frontend = await props.getText(SLUGS.LIGHTFRONTEND)
      let careear = await props.getText(SLUGS.CAREEAR)
      setGoalText((i)=>({...i, text:goal}))
      setAiText((i)=>({...i, text:ai}))
      setHeavyBackend((i)=>({...i, text:backend}))
      setLightFrontend((i)=>({...i, text:frontend}))
      setCareearText((i)=>({...i, text:careear}))
      } catch(err){
      const errorText = err?.message || "Something went wrong";
      setGoalText(i => ({ ...i, text: errorText }));
      setAiText(i => ({ ...i, text: errorText }));
      setHeavyBackend(i => ({ ...i, text: errorText }));
      setLightFrontend(i => ({ ...i, text: errorText }));
      setCareearText(i => ({ ...i, text: errorText }));
      }
    }
    loadData()
  }, [])
  
  
  
  return (
    <div>

      <div className={styles.hero}>
        <div className={styles.eyebrow}>Goals</div>
        <h1>What I am after</h1>

<p className={styles.sub}>  {introexpend ? goalText.text : goalText.text.slice(0, 120) + '...'}
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
        <div className={styles.label}>Why this exists</div>
        <h2>The purpose</h2>

        <div className={styles.goals}>

          <div className={styles.goalCard}>
            <div className={styles.goalIcon}><Target size={24} /></div>
            <h3>Backend Developing</h3>
<p className={styles.about}>  {backendexpend ? heavyBackend.text : heavyBackend.text.slice(0, 120) + '...'}
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

          <div className={styles.goalCard}>
            <div className={styles.goalIcon}><BookOpen size={24} /></div>
            <h3>Light Fronte d</h3>
<p className={styles.about}>  {frontendexpend ? lightFrontend.text : lightFrontend.text.slice(0, 120) + '...'}
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

          <div className={styles.goalCard}>
            <div className={styles.goalIcon}><Users size={24} /></div>
            <h3>AI</h3>

<p className={styles.about}>  {aiexpend ? aiText.text : aiText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setAiExpend(!aiexpend)
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
{aiexpend ? ' See less' : ' See more'}
</button></p>
          </div>

          <div className={styles.goalCard}>
            <div className={styles.goalIcon}><TrendingUp size={24} /></div>
            <h3>Carrear</h3>
<p className={styles.about}>  {careearexpend ? careearText.text : careearText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setCareearExpend(!careearexpend)
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
{careearexpend ? ' See less' : ' See more'}
</button></p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Goal