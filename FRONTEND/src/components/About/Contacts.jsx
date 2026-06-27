import { useState, useEffect } from "react"
import styles from "./About.module.css"

const LINKS = [
  {
    id: "email",
    label: "Email",
    value: "adibmd19801@gmail.com",
    display: "adibmd19801@gmail.com",
    href: "mailto:adibmd19801@gmail.com",
    action: "Copy",
  },
  {
    id: "github",
    label: "GitHub",
    value: "https://github.com/codeaddicthq",
    display: "CodeAddictHq",
    href: "https://github.com/codeaddicthq",
    action: "Open",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "https://facebook.com/farhah.al.adib",
    display: "Farhan Al Adib",
    href: "https://facebook.com/farhah.al.adib",
    action: "Open",
  },
  {
    id: "insta",
    label: "Instagram",
    value: "https://github.com/robot2k27",
    display: "Farhan Al adib",
    href: "https://github.com/robot2k27",
    action: "Open",
  },
]
const SLUGS = {
  INTRO:"contacts_intro"
}
export default function Contacts(props) {
  const [copied, setCopied] = useState(null)
  const [introText, setIntro] = useState({slug:SLUGS.INTRO, intro:"loafing..."})
  useEffect(() => {
  async function loadData() {
    try {
      let data = await props.getText(SLUGS.INTRO)
      setIntro((i) => ({ ...i, intro: data }))
    } catch (err) {
      setIntro((i) => ({ ...i, intro: err.message }))
    }
  }

  loadData()
  }, [])
  
  
  
  
  function copy(id, value) {
    navigator.clipboard.writeText(value)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div>
      {/* HERO */}
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Contact</p>
        <h1>Let's talk.</h1>
        <p className={styles.sub}>
          {introText.intro}
        </p>
      </div>

      {/* LINKS */}
      <section className={styles.section}>
        <p className={styles.label}>Where to find me</p>

        <div className={styles.fields} style={{ maxWidth: 560 }}>
          {LINKS.map((link) => (
            <div key={link.id} className={styles.field}>
              <span className={styles.fieldLabel}>{link.label}</span>
              <div className={styles.fieldRow}>
                <span className={styles.fieldValue}>{link.display}</span>

                <div style={{ display: "flex", gap: ".5rem" }}>
                  {link.action === "Copy" ? (
                    <button
                      className={styles.copyBtn}
                      onClick={() => copy(link.id, link.value)}
                    >
                      {copied === link.id ? "Copied!" : "Copy"}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.copyBtn}
                      style={{ display: "inline-flex", alignItems: "center", gap: ".3rem" }}
                    >
                      Open ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <p className={styles.label}>Prefer email?</p>
        <p className={styles.sub} style={{ marginBottom: "1.25rem" }}>
          Email is where I'm most responsive. I try to reply within a day or two.
        </p>
        <div className={styles.cta}>
          <a href="mailto:adibmd19801@gmail.com" className={styles.btnFill}>
            Send an email
          </a>
        </div>
      </section>
    </div>
  )
}
