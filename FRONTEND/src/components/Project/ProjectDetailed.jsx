import styles from "./Project.module.css"
import {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
const loading = "Loading ..."

function ProjectDetailed(props) {
  const [projectexpend, setProjectExpent] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [runScreen, setRunScreen] = useState("Tap RUN button to run this code")
  const [reactions, SetReacts] = useState({like:0, love:0, dislike:0, angry:0})
  const [reactMsg, setReactMsg] = useState("Tap on reaction to leave one")
  const move = useNavigate()
  const [codeData, SetCodeData] = useState({title:loading, detail:loading, code:loading, cat:loading})
  const [codeComments, setComments] = useState([])
  const [user, setUser] = useState({})
  const codePrettyComments = codeComments.map((val)=>{
    return <div key={val.id} className={styles.comment}>
          <div style={{
          display:"flex", 
          justifyContent:"spaceEvenly"
         }} className={styles.commentMeta}>
            <span className={styles.commentAuthor}>{val.author}</span>
            {user.id==val.author_id?
           <div style={{ display: 'inline', gap: '.6rem' }}>
            <button onClick={()=>{
              move(`edit-comment/${val.id}`)
            }} className={styles.actionBtn}>Edit</button>
            <button onClick={()=>{
              deleteComment(val.id)
            }} className={styles.actionBtnDanger}>Delete</button>
            </div>
            
            : <>
              
            </>
            }
          </div>
          <p className={styles.commentText}>{val.msg}</p>
          <div className={styles.commentActions}>
          </div>
        </div>
  })
  const [page, setPage] = useState(1)
  const {slug, category} = useParams()
  useEffect(()=>{
    async function loadData(){
      let codeRes = await fetch(`${props.domain}/${slug}`)
      let commentRes = await fetch(`${props.domain}/${slug}/c`)
      let codedata = await codeRes.json()
      let commentdata = await commentRes.json()
      let userdata = await props.userStatus()
        SetCodeData(codedata.project)
        setUser(userdata)
        setComments(commentdata.results)
        SetReacts(codedata.reactions)
        
    }
    loadData()
    
  }, [page, slug])
  function deleteComment(id){
    async function DelThis(){
    let delComment = await fetch(`${props.domain}/${slug}/c/del/${id}/`,        {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
        "X-CSRFToken": props.getCookie("csrftoken"),
    }
  })
    let data = await delComment.json()
    alert(data.msg)
    let newCommentsReq = await fetch(`${props.domain}/${slug}/c`)
    let newComments = await newCommentsReq.json()
    setComments(newComments.results)
    }
    let per = confirm("Are you sure ? comment will be deleted permanently.")
    if (per){
      DelThis()
    }
  }
  
  useEffect(()=>{
    
  }, [page])
  
  function addReaction(reaction){
    async function AddReact(){
      let req = await fetch(`${props.domain}/${slug}/addreact/`,
       {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
        "X-CSRFToken": props.getCookie("csrftoken"),
    },
    body: JSON.stringify({
      reaction:reaction
    }),
  })
      let res = await req.json()
      setReactMsg(res.msg)
      let newReactReq = await fetch(`${props.domain}/${slug}/getreacts`)
      let newReacts = await newReactReq.json()
      SetReacts(newReacts.reactions)
    }
    AddReact()
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.detailHero}>
        <div className={styles.div1}>
          <h1 className={styles.title}>{codeData.title}</h1>
          <p className={styles.sub}>{codeData.detail ?
            (<> {codeData.detail.slice(0, 150)}...
            <button style={{
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    fontWeight:600,
    color: 'black',
    display:"inline"
  }}>See More</button>
            </>
            ):(
            "Data will be added soon"
            )
          }</p>
        </div>
      </div>
      <div className={styles.codeBlock}>
        <div className={styles.codeHeader}>
          <span className={styles.eyebrow}>Source Code</span>
          <div className={styles.codeActions}>
            <button onClick={(e)=>{
              navigator.clipboard.writeText(document.querySelector('#code').innerText)
            }} className={styles.codeBtn}>Copy</button>
            <button onClick={(e)=>{
              setRunScreen("Service will be emplemented soon ;)")}} className={styles.codeBtnAccent}>▶ Run</button>
          </div>
        </div>
        <pre className={styles.pre}>
          <code id="code">{codeData.code}
          </code>
        </pre>
      </div>

      {/* ── RUN OUTPUT ── */}
      <div className={styles.runBlock}>
        <div className={styles.runHeader}>
          <span className={styles.eyebrow}>Output</span>
        </div>
        <div className={styles.runBody}>
          <p className={styles.runPlaceholder}>{runScreen}</p>
        </div>
      </div>

      <div className={styles.reactions}>
  <button id="like" onClick={(e)=>{
    addReaction(e.target.id)
  }} className={styles.react}>👍 {reactions.like}</button>
  <button id="love" onClick={(e)=>{
    addReaction(e.target.id)
  }} className={styles.react}>❤️ {reactions.love}</button>
  <button id="dislike" onClick={(e)=>{
    addReaction(e.target.id)
  }} className={styles.react}>👎 {reactions.dislike}</button>
  <button id="angry" onClick={(e)=>{
    addReaction(e.target.id)
  }} className={styles.react}>😡 {reactions.angry}</button>
</div>
<p style={{ fontSize: '.75rem', color: '#9C8E82', letterSpacing: '.06em', padding: '0 clamp(1.25rem, 4vw, 2.5rem)', marginTop: '-.8rem', marginBottom: '1.2rem' }}>{user.status ? reactMsg: 
<>
"You need tp login/signup for leaving status"
<br/>
<Link to="/login" style={{ color: '#CC5500', fontSize: '.75rem', letterSpacing: '.06em', textDecoration: 'underline', fontWeight: 500, }}>Click here to login →</Link>
</>}
</p>
      <section className={styles.commentsSection}>
        <div className={styles.commentsSectionHeader}>
          <h2 className={styles.commentsTitle}>Comments</h2>
          <button className={styles.btnFillSm} onClick={()=>{
            move(`add-comment/`)
          }}>Add Comment →</button>
        </div>
        {codePrettyComments}
      </section>
    </div>
  )
}

export default ProjectDetailed