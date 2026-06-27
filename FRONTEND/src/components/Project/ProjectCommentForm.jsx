import styles from "./Project.module.css"
import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
const loading = "Loading ..."
function ProjectCommentForm(props) {
  const move = useNavigate()
  const [codeData, SetCodeData] = useState({title:loading, detail:loading, code:loading, cat:loading})
  const [user, setUser] = useState({})
  const {slug, category} = useParams()
  const [comment, setComment] = useState("")
  const [msg, setMsg] = useState(`Commenting on loading...`)
  useEffect(()=>{
    async function loadData(){
      let codeRes = await fetch(`${props.domain}/${slug}/`)
      let codedata = await codeRes.json()
      let userdata = await props.userStatus()
      setUser(userdata)
      SetCodeData(codedata.project)
      setMsg(`Commenting on ${codedata.project.title}`) 
    }
    loadData()
    
  }, [])
  
  function postComment() {
    if (!comment){
      setMsg("Empty comment not accepted")
    }else if (comment){
      async function postComment(){
      let res = await fetch(`${props.domain}/${codeData.slug}/c/add/`,
       {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({
      comment:comment
    }),
  })
      let data = await res.json()
      if (data.comment_status){
        move(`/projects/${codeData.cat}/${codeData.slug}`)
      } else if (!data.comment_status){
        setMsg(data.msg)
      }
      }
      postComment()
    }
  }
  
  if (user.status){
  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Leave Comment</h2>
        <p className={styles.sub}>{msg}</p>
          <div className={styles.field}>
            <label className={styles.label}>Comment</label>
            <textarea onChange={(e)=>{
            setMsg(`Commenting on ${codeData.title}`)
              setComment(e.target.value)
            }}className={styles.textarea} rows="5" placeholder="Write your comment here..." />
          </div>

          <div className={styles.btnGroup}>
            <button onClick={()=>{
              postComment()
            }}className={styles.btnFill}>Post Comment →</button>
            <button onClick={()=>{
              move(`/projects/${codeData.cat}/${codeData.slug}`)
            }} className={styles.btnLine}>Cancel</button>
          </div>
        </div>

      </div>
    
  )
  }else if (!user.status||!comment.comment_status) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Hold on</h2>
        <p className={styles.sub}>You need to be logged in to leave a comment</p>
        <div className={styles.btnGroup}>
          <button onClick={() => move('/login')} className={styles.btnFill}>Login →</button>
          <button onClick={() => move(-1)} className={styles.btnLine}>Go Back</button>
        </div>
      </div>
    </div>
  )
}
}

export default ProjectCommentForm