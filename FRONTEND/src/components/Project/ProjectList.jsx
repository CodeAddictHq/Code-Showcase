import styles from "./Project.module.css"
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProjectList(props) {
  const [msgs, setMsgs] = useState({header:"loading", detail:"loading"})
  const { category } = useParams()
  const [codes, setCodes] = useState([])
  let codeCards = codes.map((val)=>{
        return <div key={val.id}className={styles.card}>
          <div className={styles["card-body"]}>
            <h3>{val.title}</h3>
            <p>{val.detail ? `${val.detail.slice(0, 120)}...`: "Data gonna add soon"}</p>
            <Link to={`${val.slug}`} className={styles["card-link"]}>View project →</Link>
          </div>
        </div>
  }) 
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
  if (category=='js'){
    setMsgs({title:"Java Script", detail:"All JS projects are here"})
  }else if (category=='py'){
    setMsgs({title:"Python", detail:"All python projects are here"})
  }else if(category == 'hc'){
    setMsgs({title:"HTML&CSS", detail:"All html and css projects are here (actually i have done this for improving my design skill but still its horrible)"})
  }else if (category=='ot'){
    setMsgs({title:"Others", detail:"All that library used projects here"})
  }
    async function loadData(pageNumber) {
      let res = await fetch(`${props.domain}/category/${category}?page=${pageNumber}`)
      let data = await res.json()
      if (data.results.length>0){
      setCodes(data.results)
      setTotalPages(parseInt(data.count/5)+1)
      }else if (data.results.length==0){
        setMsgs((m)=>({...m, detail:"Looks like no projects are here"}))
        setMsgs((m)=>({...m, detail:"Looks like no projects are here"}))
      }
    }
    loadData(page)
  }, [page, category])
  return (
    <div className={styles.wrapper}>
<div className={styles.wrapper}>
  <div className={styles.div1}>
    <div
      className={styles.hero}
      style={{
        position: "relative",
        animation: "heroFadeIn 0.6s ease-out",
      }}
    >
      <div
        className={styles.eyebrow}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
          }}
        />
        Category
      </div>

      <h1
        className={styles.title}
        style={{
          letterSpacing: "-0.02em",
        }}
      >
        {msgs.title}
      </h1>

      <p
        className={styles.sub}
        style={{
          borderLeft: "2px solid var(--border)",
          paddingLeft: "1rem",
        }}
      >
        {msgs.detail}
      </p>
    </div>
  </div>

  <style>{`
    @keyframes heroFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `}</style>
</div>

      <div className={styles.grid}>
        {codeCards}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => 
          setPage(p => p - 1)}
          disabled={page === 1}
        >
          ← Prev
        </button>
        <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button
          className={styles.pageBtn}
          onClick={() =>{
          setPage(p => p + 1)
          }}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default ProjectList