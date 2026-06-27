import styles from "./Nav.module.css"
import { Box, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import { LogIn, LogOut, CircleCheck, CircleX, LayoutDashboard} from "lucide-react";


function Nav(props) {
  const [status, setStatus] = useState(false)
  useEffect(() => {
  async function loadUser(){
    let user = await props.userStatus()
    setStatus(user.status)
  }
  loadUser()
  },[])
  
  const [open, setOpen] = useState(false)
  return (
    <nav className={styles.nav}>

      <a href="/" className={styles.brand}>
        <Box size={20} />
        <span>ADIBS.CODE.WEEB</span>
      </a>

    <div className={styles.links}>

      <Link to="/account/dashboard" className={styles.loginLink}>
            <LayoutDashboard size={16} />
            Account/Me:)
      </Link>
    </div>

    </nav>
  )
}

export default Nav




