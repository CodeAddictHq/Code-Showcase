import styles from "./About.module.css"
import { Sparkles, MousePointerClick, BookOpen, Globe, ArrowRight, Lightbulb } from "lucide-react"
import { useState, useEffect } from "react"

var SLUGS = {
  REASONINTRO:"reason_intro",
  FORPRACTISE:"reason_practise",
  TOSHOW:"reason_show",
  REALPROJECT:"reason_real-project",
  EXTRA:"reason_extraa",
}
var loadText  = "CONTENT LOADING ..."




function Reason(props) {
  const [introexpend, setIntroExpend] = useState(false)
  const [practiseexpend, setPractiseExpend] = useState(false)
  const [toshowexpend, setToShowExpend] = useState(false)
  const [realprojectexpend, setRealProjectExpend] = useState(false)
  const [extraexpend, setExtraExpend] = useState(false)

  const [introText,   setReasonIntro]   = useState({ slug: SLUGS.REASONINTRO,   text: loadText })
  const [practiseText,   setPractiseText]   = useState({ slug: SLUGS.FORPRACTISE,   text: loadText })
  const [showText,    setShowText]    = useState({ slug: SLUGS.TOSHOW,     text:"" })
  const [realProjectText,   setRealProjectText]   = useState({ slug: SLUGS.REALPROJECT,    text: loadText })
  const [extraText, setExtraText] = useState({ slug: SLUGS.EXTRA,  text: loadText })
  
  useEffect(() => {
    async function loadData() {
      try {
        let intro   = await props.getText(SLUGS.REASONINTRO)
        let practise   = await props.getText(SLUGS.FORPRACTISE)
        let show    = await props.getText(SLUGS.TOSHOW)
        let real_project   = await props.getText(SLUGS.REALPROJECT)
        let extra   = await props.getText(SLUGS.EXTRA)
        

        setReasonIntro((i)   => ({ ...i, text: intro }))
        setPractiseText((i)   => ({ ...i, text: practise }))
        setShowText((i)    => ({ ...i, text: show }))
        setRealProjectText((i)   => ({ ...i, text: real_project }))
        setExtraText((i) => ({ ...i, text: extra }))

      } catch (err) {
        const errorText = err?.message || "Something went wrong"
        setPractiseText((i)   => ({ ...i, text: errorText }))
        setShowText((i)    => ({ ...i, text: errorText }))
        setRealProjectText((i)   => ({ ...i, text: errorText }))
        setExtraText((i) => ({ ...i, text: errorText }))
      }
    }
    loadData()
  }, [])

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>Why this exists</div>
        <h1>For many reasons :)</h1>
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
    color: "black",
    cursor: "pointer",
    display: "inline",
    fontWeight:600,
  }}
>
{introexpend ? ' See less' : ' See more'}
</button></p>
      </div>

      <section className={styles.section}>
        <div className={styles.label}>The reasons</div>

        <div className={styles.steps}>

          <div className={styles.step}>
            <div className={styles.stepIcon}><Sparkles size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>01</div>
              <h3>For Practise</h3>
<p className={styles.about}>  {practiseexpend ? practiseText.text : practiseText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setPractiseExpend(!practiseexpend)
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
{practiseexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><MousePointerClick size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>02</div>
              <h3>To Show My Friends&Sorroundings</h3>

<p className={styles.about}>  {toshowexpend ? showText.text : showText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setToShowExpend(!toshowexpend)
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
{toshowexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><BookOpen size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>03</div>
              <h3>To Add at least 1 solid project in my resume</h3>
<p className={styles.about}>  {realprojectexpend ? realProjectText.text : realProjectText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setRealProjectExpend(!realprojectexpend)
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
{realprojectexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepIcon}><Lightbulb size={24} /></div>
            <div className={styles.stepBody}>
              <div className={styles.stepNum}>05</div>
              <h3>Extra </h3>

<p className={styles.about}>  {extraexpend ? extraText.text : extraText.text.slice(0, 120) + '...'}
<button
  onClick={(e) => {
  setExtraExpend(!extraexpend)
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
{extraexpend ? ' See less' : ' See more'}
</button></p>
            </div>
          </div>

        </div>
      </section>



    </div>
  )
}

export default Reason
