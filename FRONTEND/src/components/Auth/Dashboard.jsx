import { User, Mail, Lock, ChevronRight, LogIn } from "lucide-react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
  const [userData, setUserData] = useState({ status: false });

  useEffect(() => {
    async function loadUser() {
      const data = await props.userStatus();
      setUserData(data);

    }
    loadUser();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.brand}>{userData.status ? "Account" : "Account Dashboard"}</span>
        {userData.status && (
          <div className={styles.headerMeta}>
            <span className={styles.headerName}>{userData.username}</span>
          </div>
        )}
      </header>

      {userData.status ? (
        <>
          <section className={styles.welcome}>
            <p className={styles.welcomeLabel}>Dashboard</p>
            <h1 className={styles.welcomeTitle}>
              Welcome back, <span className={styles.accent}>{userData.username}</span>.
            </h1>
            <p className={styles.welcomeSub}>{userData.email}</p>
          </section>

          <main className={styles.main}>
            <Link className={styles.option}>
              <span className={styles.optionIcon}><User size={16} /></span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>{userData.username}</span>
                <span className={styles.optionDesc}>Your name is saved in our database with respect</span>
              </span>
              
            </Link>

            <Link className={styles.option}>
              <span className={styles.optionIcon}><Mail size={16} /></span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>{userData.email}</span>
                <span className={styles.optionDesc}>You would have to use this email to restore account if you forget password</span>
              </span>
              
            </Link>

            <Link to="/reset_password" className={styles.option}>
              <span className={styles.optionIcon}><Lock size={16} /></span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>Change Password</span>
                <span className={styles.optionDesc}>Update your account password</span>
              </span>
              <ChevronRight size={15} className={styles.optionArrow} />
            </Link>
            <Link to="/logout" className={styles.option}>
              <span className={styles.optionIcon}><Lock size={16} /></span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>Logout</span>
                <span className={styles.optionDesc}>Logout from current account</span>
              </span>
              <ChevronRight size={15} className={styles.optionArrow} />
            </Link>
            <Link to="/account/delete" className={styles.option}>
              <span className={styles.optionIcon}><Lock size={16} /></span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>Delete Account</span>
                <span className={styles.optionDesc}>Delete this current account</span>
              </span>
              <ChevronRight size={15} className={styles.optionArrow} />
            </Link>
            <Link to="/assign-error" className={styles.option}>
              <span className={styles.optionIcon}><Lock size={16} /></span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>Assign Note </span>
                <span className={styles.optionDesc}>Have you find any error or wanna give me any note ? ...you can assign it here</span>
              </span>
              <ChevronRight size={15} className={styles.optionArrow} />
            </Link>
          </main>
        </>
      ) : (
        <div className={styles.guestWrap}>
          <div className={styles.guestCard}>
            <span className={styles.guestIcon}><LogIn size={22} /></span>
            <h2 className={styles.guestTitle}>You're not logged in</h2>
            <p className={styles.guestSub}>Login to access your account settings.</p>
            <Link to="/login" className={styles.signInBtn}>Log In</Link>
            <Link to="/signup" className={styles.registerLink}>Don't have an account? Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
}
