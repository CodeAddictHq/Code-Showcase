import styles from "./Auth.module.css"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
//edit
function AssignErr(props) {
  const [user, setUser] = useState({ status: null })
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [message, setMessage] = useState("Anything wrong, Found a bug, Wanna tell me somethong?     Write it down here ...")
  const [success, setSuccess] = useState(false)
  const [errState, setErrState] = useState(null)
  useEffect(() => {
    async function loadData() {
      let userdata = await props.userStatus()
      setUser(userdata)
    }
    loadData()
  }, [])

  function handleSubmit() {
    setMessage("Processing...")
    if (!title||!note){
      setMessage('Empty fields are not accepted')
    }else if (title&&note){
    async function sendData(){
      try{
        let res = await fetch(`${props.domain}/addError/`, 
       {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({
      title: title,
      error: note,
    }),
  });
      let data = await res.json()
      setErrState(data.err_status)
      setMessage(data.msg)
      }catch(err){
        setMessage(err.message)
      }
    }
    sendData()
    }
  }

  if (user.status === null) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card} style={{ alignItems: "center", gap: "1.25rem" }}>
          <div className={styles.avatar} style={{ animation: "pulse 1.5s ease-in-out infinite" }}>✦</div>
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.title} style={{ marginBottom: "0.5rem" }}>Checking session…</h2>
            <p className={styles.sub}>Just a moment</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user.status) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.avatar}>✦</div>
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.title} style={{ marginBottom: "0.5rem" }}>Hold on</h2>
            <p className={styles.sub}>You need to be logged in to assign or note an error</p>
          </div>
          <div className={styles.btnGroup}>
            <Link to="/login" className={styles.btnFill}>Login →</Link>
            <Link to="/" className={styles.btnLine}>Go Back</Link>
          </div>
        </div>
      </div>
    )
  }

  if (errState) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.avatar}>✦</div>
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.title} style={{ marginBottom: "0.5rem" }}>Done</h2>
            <p className={styles.sub}>{message}</p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />
          <div className={styles.btnGroup}>
            <Link to="/account/dashboard" className={styles.btnFill}>Go to Dashboard →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
  <div className={styles.wrapper}>
    <div className={`${styles.card} ${styles.noteCard}`}>
      <h2 className={styles.title}>Assign Error/Note</h2>
      <p className={styles.sub}>{message}</p>

      <div className={styles.form}>
        <input
          className={styles.noteTitleInput}
          type="text"
          placeholder="Title  "
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setMessage("Leave a note or assign this error");
          }}
        />

        <div className={styles.noteDivider} />

        <textarea
          className={styles.noteBody}
          rows="6"
          placeholder="Describe it in your own words…"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setMessage("Leave a note or assign this error");
          }}
        />

        <div className={styles.btnGroup}>
          <button onClick={handleSubmit} className={styles.btnFill}>Submit →</button>
          <Link to="/" className={styles.btnLine}>Cancel</Link>
        </div>
      </div>
    </div>
  </div>
);
}

export default AssignErr