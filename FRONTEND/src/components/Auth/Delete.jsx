import styles from "./Auth.module.css"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthDelete(props) {
  useEffect(() => {
    fetch(`${props.domain}/csrf/`, { credentials: "include" });
  }, []);

  const navigate = useNavigate();
  const [pass, setPass] = useState("")
  const [msg, setMsg] = useState("This action is permanent and cannot be undone.")

  function validateData(e) {
    e.preventDefault()
    if (!pass) {
      setMsg("Password field cannot be empty")
    }  else {
      async function deleteAccount() {
        console.log(pass)
        let res = await fetch(`${props.domain}/delete/`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": props.getCookie("csrftoken"),
          },
          body: JSON.stringify({
            password: pass,
          }),
        })
        let data = await res.json()
        setMsg(data.msg)
        if (data.delete_status) {
          navigate('/')
        }
      }
      deleteAccount()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.avatar}>⚠️</div>
        <h2 className={styles.title}>Delete account</h2>
        <p className={styles.sub}>{msg}</p>
        <form onSubmit={validateData}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                onChange={(e) => setPass(e.target.value)}
                className={styles.input}
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <button type="submit" className={styles.btnFill}>Delete account</button>
          </div>
        </form>
        <p className={styles.switch}>
          Changed your mind? <span onClick={() => navigate('/account/dashboard')} className={styles.link}>Go back</span>
        </p>
      </div>
    </div>
  )
}

export default AuthDelete