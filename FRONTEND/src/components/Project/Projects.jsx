import styles from "./Project.module.css"
import { Link } from 'react-router-dom'
import { Code2, Braces, LayoutTemplate, Boxes, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    to: "/projects/py",
    Icon: Code2,
    iconColor: "#3776AB",
    iconBg: "rgba(55, 118, 171, 0.12)",
    title: "Python",
    desc: "Scripts, games, automation",
  },
  {
    to: "/projects/js",
    Icon: Braces,
    iconColor: "#C9A300",
    iconBg: "rgba(240, 219, 79, 0.18)",
    title: "JavaScript",
    desc: "Vanilla JS scripts",
  },
  {
    to: "/projects/hc",
    Icon: LayoutTemplate,
    iconColor: "#E34C26",
    iconBg: "rgba(227, 76, 38, 0.12)",
    title: "HTML & CSS",
    desc: "Static pages, no JS",
  },
  {
    to: "/projects/ot",
    Icon: Boxes,
    iconColor: "var(--muted)",
    iconBg: "rgba(156, 142, 130, 0.15)",
    title: "Others",
    desc: "Everything else",
  },
];

function Projects() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.eyebrow}>All Projects</div>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.sub}>Browse projects by category</p>
      </div>

      <div className={styles.catGrid}>
        {CATEGORIES.map(({ to, Icon, iconColor, iconBg, title, desc }) => (
          <Link key={to} to={to} className={styles.catTile}>
            <div className={styles.catIcon} style={{ background: iconBg }}>
              <Icon size={22} color={iconColor} strokeWidth={2} />
            </div>
            <div>
              <h3 className={styles.catTitle}>{title}</h3>
              <p className={styles.catDesc}>{desc}</p>
            </div>
            <div className={styles.catCta}>
              View all <ArrowRight size={14} strokeWidth={2.5} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;