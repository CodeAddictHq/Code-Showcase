import styles from "./Auth.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut as LogOutIcon } from "lucide-react";

function AuthLogout(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    status: null,
    msg: "",
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await props.userStatus();
        setUser((u) => ({
          ...u,
          status: data.status,
        }));
      } catch (err) {
        setUser((u) => ({
          ...u,
          err: err.message,
        }));
      }
    }

    loadUser();
  }, []);

  function LogOut() {
    async function loadStatus() {
      localStorage.clear();

      const user = await props.userStatus();
      setUser(user);
    }

    loadStatus();
  }

  if (user.status == null) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card} style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              gap: "6px",
              marginBottom: "1.5rem",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <h2 className={styles.title} style={{ marginBottom: "0.4rem" }}>
            Hang tight
          </h2>

          <p className={styles.sub}>Fetching your data…</p>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.2;
              transform: scale(0.8);
            }

            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        `}</style>
      </div>
    );
  } else if (user.status) {
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.avatar}>
              <User size={28} />
            </div>

            <h2 className={styles.title}>Are you sure?</h2>

            <p className={styles.sub}>
              You will be logged out of your account
            </p>

            <div className={styles.btnGroup}>
              <button onClick={LogOut} className={styles.btnFill}>
                <LogOutIcon size={16} style={{ marginRight: "6px" }} />
                Yes, Logout
              </button>

              <button
                onClick={() => window.history.back()}
                className={styles.btnLine}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.avatar}>✦</div>

          <div style={{ textAlign: "center" }}>
            <h2 className={styles.title} style={{ marginBottom: "0.5rem" }}>
              You are logged out
            </h2>

            <p className={styles.sub} style={{ marginBottom: "2rem" }}>
              {user.msg}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginBottom: "1.75rem",
            }}
          />

          <div className={styles.btnGroup}>
            <button
              onClick={() => navigate("/login")}
              className={styles.btnFill}
            >
              Log back in →
            </button>

            <button
              onClick={() => navigate("/")}
              className={styles.btnLine}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthLogout;