import styles from "./Auth.module.css";
import { useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";



export default function PasswordReset(props) {
  const [user, setUser] = useState({status:null})
  const [password_change, setPassChange] = useState(false) 
  const [msg, setMsg]=useState("Choose a new password for your account.")
  
  useEffect(() => {
  fetch(`${props.domain}/csrf/`, { credentials: "include" });
  
  async function loadUser(){
    let user = await props.userStatus()
    setUser(user)
  }
  loadUser()
  }, []);
  const navigate = useNavigate();
  const [oldPass, setOldPass] =useState("")
  const [newPass1, setNewPass1] =useState("")
  const [newPass2, setNewPass2] =useState("")
  
  function validateData(e){
    e.preventDefault()
    if (!oldPass||!newPass1||!newPass2){
      setMsg("Empty fields are not accepted")
    }else if(oldPass&&newPass1&&newPass2){
      if (newPass1!= newPass2){
        setMsg("New passwords didn't matched")
      }else if(newPass1 == newPass2){
        async function resetPass(){
     let res = await fetch(`${props.domain}/reset_password/`, 
       {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
        "X-CSRFToken": props.getCookie("csrftoken"),
    },
    body: JSON.stringify({
      old_pass:oldPass,
      new_pass:newPass1,
    }),
  })
          let data = await res.json()
          setMsg(data.msg)
          setPassChange(data.password_change)
        }
        resetPass()
      }
    }
  }
  
  
  
  
  if (password_change) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.avatar}>✦</div>
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.title} style={{ marginBottom: "0.5rem" }}>{msg}</h2>
            <p className={styles.sub} style={{ marginBottom: "2rem" }}>{msg}</p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", marginBottom: "1.75rem" }} />
          <div className={styles.btnGroup}>
            <Link to="/account/dashboard" className={styles.btnFill}>Go to Dashboard →</Link>
          </div>
        </div>
      </div>
    )
  }
  else if (user.status == null) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card} style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", gap: "6px", marginBottom: "1.5rem" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 8, height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
          <h2 className={styles.title} style={{ marginBottom: "0.4rem" }}>Hang tight</h2>
          <p className={styles.sub}>Fetching your data…</p>
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50%       { opacity: 1;   transform: scale(1.2); }
            }
          `}</style>
        </div>
      </div>
    )}
  else if (!user.status) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.avatar}>🔒</div>
          <div style={{ textAlign: "center" }}>
            <h2 className={styles.title} style={{ marginBottom: "0.5rem" }}>Access denied</h2>
            <p className={styles.sub} style={{ marginBottom: "2rem" }}>You need to be logged in to change your password.</p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", marginBottom: "1.75rem" }} />
          <div className={styles.btnGroup}>
            <Link to="/login" className={styles.btnFill}>Log in →</Link>
            <Link to="/" className={styles.btnLine}>Go to Home</Link>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset password</h1>
        <p className={styles.sub}>{msg}</p>

        <form onSubmit={validateData}>
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="oldPassword">Old password</label>
            <input onChange={(e)=>{
              setOldPass(e.target.value)
              setMsg('Choose a new password for your account.')
            }} className={styles.input} id="oldPassword" type="password" />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="newPassword">New password</label>
            <input  onChange={(e)=>{
              setNewPass1(e.target.value)
              setMsg('Choose a new password for your account.')
            }}  className={styles.input} id="newPassword" type="password" />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm password</label>
            <input  onChange={(e)=>{
              setNewPass2(e.target.value)
              setMsg('Choose a new password for your account.')
            }}  className={styles.input} id="confirmPassword" type="password" />
          </div>
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btnFill}>Update password</button>
          <Link to="/account/dashboard" className={styles.btnLine}>Cancel</Link>
        </div>
        </form>

      </div>
    </div>
  ) 
}
