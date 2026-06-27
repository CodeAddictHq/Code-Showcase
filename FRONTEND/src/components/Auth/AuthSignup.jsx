import styles from "./Auth.module.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AuthSignup(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("Wanna leave your identity ?...:)");
  const [user, setUser] = useState({ status: null });

  useEffect(() => {
    async function loadUser() {
      let user = await props.userStatus();
      setUser(user);
    }

    loadUser();
  }, []);

  function validateData(e) {
    e.preventDefault();
    setMsg("Creating...");

    if (!username || !email || !pass) {
      setMsg("Empty fields are not accepted");
    } else if (username && email && pass) {
      if (pass.length < 4) {
        setMsg("Pass cant be that much small");
      } else if (pass.length >= 4) {
        async function resetPass() {
          let tk = localStorage.getItem("access");
          console.log(tk);

          let res = await fetch(`${props.domain}/signup/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Authorization": `Bearer ${tk}`,
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: pass,
            }),
          });

          let data = await res.json();

          if (data.signup_status) {
            let tokenreq = await fetch(`${props.domain}/login/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: pass,
              }),
            });

            let tks = await tokenreq.json();

            localStorage.setItem("access", tks.access);
            localStorage.setItem("refresh", tks.refresh);

            let user = await props.userStatus()
            setUser(user);
            setMsg(data.msg);
          } else if (!data.signup_status) {
            setMsg(data.msg);
          }
        }

        resetPass();
      }
    }
  }

  if (user.status == null) {
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.card}
          style={{ alignItems: "center", gap: "1.25rem" }}
        >
          <div
            className={styles.avatar}
            style={{ animation: "pulse 1.5s ease-in-out infinite" }}
          >
            ✦
          </div>

          <div style={{ textAlign: "center" }}>
            <h2
              className={styles.title}
              style={{ marginBottom: "0.5rem" }}
            >
              loading page…
            </h2>

            <p className={styles.sub}>Just a moment</p>
          </div>
        </div>
      </div>
    );
  } else if (user.status) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.avatar}>✦</div>

          <div style={{ textAlign: "center" }}>
            <h2
              className={styles.title}
              style={{ marginBottom: "0.5rem" }}
            >
              Your account has beed created & you are logged in
            </h2>

            <p
              className={styles.sub}
              style={{ marginBottom: "2rem" }}
            >
              Welcome — {username}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              margin: "0 0 1.75rem",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { label: "Status", value: "Authenticated" },
              { label: "Session", value: "Active" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className={styles.label}>{label}</span>

                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--accent)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.btnGroup}>
            <Link to="/" className={styles.btnFill}>
              Go to Homepage →
            </Link>

            <Link to="/logout" className={styles.btnLine}>
              Log out
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (!user.status) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.title}>Create account</h2>

          <p className={styles.sub}>{msg}</p>

          <form onSubmit={validateData}>
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setMsg("Wanna leave your identity ?...:)");
                  }}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email</label>

                <input
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Password</label>

                <input
                  className={styles.input}
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setPass(e.target.value);
                    setMsg("Wanna leave your identity ?...:)");
                  }}
                />
              </div>

              <button
                type="submit"
                className={styles.btnFill}
              >
                Sign Up →
              </button>
            </div>
          </form>

          <p className={styles.switch}>
            Have an account?{" "}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default AuthSignup;