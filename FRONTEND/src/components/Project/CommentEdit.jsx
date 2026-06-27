import styles from "./Project.module.css"
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CommentEdit(props) {
  const move  = useNavigate()
  const {id, slug, category} = useParams()
  const [user, setUser] = useState({status:false})
  const [newComment, setNewComment] = useState("")
  const [oldCommentData, setOldCommentData] = useState({data:{msg:"loading..."}})
  const [msg, setMsg] = useState("Comment")
  
  useEffect(()=>{
    async function loadData(){
      let user = await props.userStatus()
      let oldcommentRes = await fetch(`${props.domain}/${slug}/c/get/${id}`)
      let oldcomment = await oldcommentRes.json()
      setUser(user)
       setOldCommentData(oldcomment)
       setNewComment(oldcomment.data.msg)
      
    }
    loadData()
  }, [])
  function saveEdit(){
    if (!newComment){
      setMsg("Empty comment not accepted")
    }else if(newComment){
      async function saveComment(){
      let saveComment = await fetch(`${props.domain}/${slug}/c/edit/${id}`,
       {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({
      comment:newComment
    }),
  })
      let resData = await saveComment.json()
      setMsg(resData.msg)
      if (resData.comment_status){
        move(`/projects/${category}/${slug}`)
      }
      }
      saveComment()
    }
  }

  if (!user.status) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Hold on</h2>
          <p className={styles.sub}>You need to be logged in to edit a comment</p>
          <div className={styles.btnGroup}>
            <button onClick={() => move('/login')} className={styles.btnFill}>Login →</button>
            <button onClick={() => move(-1)} className={styles.btnLine}>Go Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (!oldCommentData.comment_status) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Not Found</h2>
          <p className={styles.sub}>This comment doesn't exist or was deleted.</p>
          <div className={styles.btnGroup}>
            <button onClick={() => move(-1)} className={styles.btnLine}>Go Back</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Edit Comment</h2>
        <p className={styles.sub}></p>
        <div className={styles.field}>
          <label className={styles.label}>{msg}</label>
          <textarea
            className={styles.textarea}
            rows="5"
            value={newComment}
            onChange={(e) => {
            setMsg("Comment")
              setNewComment(e.target.value)
            }}
          />
        </div>
        <div className={styles.btnGroup}>
          <button
            onClick={() => saveEdit()}
            className={styles.btnFill}
            onMouseDown={e => e.currentTarget.style.cssText = 'background:#fff;color:var(--accent);border-color:var(--accent)'}
            onMouseUp={e => e.currentTarget.style.cssText = ''}
            onMouseLeave={e => e.currentTarget.style.cssText = ''}
          >
            Save Changes →
          </button>
          <button onClick={() => move(-1)} className={styles.btnLine}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default CommentEdit