import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function AuthLogin(props) {
  const [user, setUser] = useState({ status: null });
  const [message, setMessage] = useState("Login to your account");

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    async function loadData() {
      let user = await props.userStatus();
      setUser((s) => user);
    }

    loadData();
  }, []);

  function ValidateData(e) {
    e.preventDefault();
    setMessage("Processing...");

    if (!pass || !username) {
      setMessage("Password or Username cant be empty");
    } else if (pass && username) {
      async function LogInUser() {
        let res = await fetch(`${props.domain}/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: pass,
          }),
        });

        if (res.status == 200) {
          let token = await res.json();

          localStorage.setItem("access", token.access);
          localStorage.setItem("refresh", token.refresh);

          let user = await props.userStatus();
          setUser(user);
          setMessage("Successfully logged in")
        } else if (res.status == 401) {
          let data = await res.json()
          setMessage(data.detail)
          
        }
      }

      LogInUser();
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
              Checking session…
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
              You're logged in.
            </h2>

            <p
              className={styles.sub}
              style={{ marginBottom: "2rem" }}
            >
              Welcome back — {username}
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
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome back</h2>

          <p className={styles.sub}>{message}</p>

          <form onSubmit={ValidateData}>
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>
                  Enter Your UserName
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Your username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setMessage("Login to your account");
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
                    setMessage("Login to your account");
                  }}
                />
              </div>

              <button className={styles.btnFill} type="submit">
                Login →
              </button>
            </div>
          </form>

          <Link to="/signup">
            <p className={styles.switch}>
              No account? <span className={styles.link}>Sign up</span>
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default AuthLogin;