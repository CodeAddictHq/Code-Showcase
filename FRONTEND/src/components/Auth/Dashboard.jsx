//import { Mail, Lock, ChevronRight, LogIn } from "lucide-react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Mail, Lock, LogOut, Trash2, Flag, ChevronRight, LogIn } from "lucide-react";

export default function Dashboard(props) {
  const [userData, setUserData] = useState({ status: null });

  useEffect(() => {
    async function loadUser() {
      const data = await props.userStatus();
      setUserData(data);

    }
    loadUser();
  }, []);
  if (userData.status == null) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f5f0e8"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        background: "#faf7f2",
        border: "1px solid #d4c9b4",
        padding: "2.5rem 3rem",
        borderRadius: "2px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#f0e0d8",
          color: "#c05f3c",
          fontSize: "20px",
          animation: "pulse 1.5s ease-in-out infinite"
        }}>
          ✦
        </div>

        <div style={{ textAlign: "center" }}>
          <h2 style={{
            margin: "0 0 0.5rem",
            fontFamily: "'Playfair Display', serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#1a1612"
          }}>
            Loading session…
          </h2>
          <p style={{
            margin: 0,
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem",
            fontWeight: 300,
            color: "#6b5f52"
          }}>
            Just a moment
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );

  }else if(!userData.status){
  return (
    <div className={styles.guestWrap}>
      <div className={styles.guestCard}>
        <span className={styles.guestIcon}>
          <LogIn size={22} />
        </span>

        <h2 className={styles.guestTitle}>You're not logged in</h2>
        <p className={styles.guestSub}>
          Please log in to access account settings and dashboard.
        </p>

<Link
  to="/login"
  className={styles.signInBtn}
  style={{
    background: "#fff",
    color: "#1a1612",
    border: "1px solid #d4c9b4"
  }}
>
  Log In
</Link>
        <Link to="/signup" className={styles.registerLink}>
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );

} else if (userData.status) {
  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.avatar}>
          {userData.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className={styles.heroLabel}>Dashboard</p>
          <h1 className={styles.heroName}>{userData.username}</h1>
          <p className={styles.heroEmail}>{userData.email}</p>
        </div>
      </section>

      <main className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardIcon}><User size={16} /></span>
          <span className={styles.cardLabel}>Hey Man Wassap σ(≧▽≦)σ</span>
          <span className={styles.cardValue}>{userData.username}</span>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcon}><Mail size={16} /></span>
          <span className={styles.cardLabel}>Your Current Email:</span>
          <span className={styles.cardValue}>{userData.email}</span>
          <span className={styles.cardNote}>Used to restore your account if you forget your password</span>
        </div>

        <Link to="/reset_password" className={styles.action}>
          <span className={styles.actionIcon}><Lock size={16} /></span>
          <span>
            <span className={styles.actionTitle}>Change Password</span>
            <span className={styles.actionDesc}>Update your account password</span>
          </span>
          <ChevronRight size={15} className={styles.actionArrow} />
        </Link>

        <Link to="/logout" className={styles.action}>
          <span className={styles.actionIcon}><LogOut size={16} /></span>
          <span>
            <span className={styles.actionTitle}>Logout</span>
            <span className={styles.actionDesc}>Logout from current account</span>
          </span>
          <ChevronRight size={15} className={styles.actionArrow} />
        </Link>

        <Link to="/assign-error" className={`${styles.action} ${styles.cardWide}`}>
          <span className={styles.actionIcon}><Flag size={16} /></span>
          <span>
            <span className={styles.actionTitle}>Assign Note</span>
            <span className={styles.actionDesc}>Found an error or have feedback? Leave it here</span>
          </span>
          <ChevronRight size={15} className={styles.actionArrow} />
        </Link>

        <Link to="/account/delete" className={`${styles.action} ${styles.danger} ${styles.cardWide}`}>
          <span className={styles.actionIcon}><Trash2 size={16} /></span>
          <span>
            <span className={styles.actionTitle}>Delete Account</span>
            <span className={styles.actionDesc}>Permanently delete this account</span>
          </span>
          <ChevronRight size={15} className={styles.actionArrow} />
        </Link>
      </main>
    </div>
  );

}}
