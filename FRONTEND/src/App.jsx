import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./components/NotFound/NotFound"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import {About, Reason, Contacts, Goal, HowItWorks} from "./components/About"
import {Projects, ProjectList, CommentEdit, ProjectCommentForm, ProjectDetailed} from "./components/Project"
import { AuthLogin, AuthSignup, AuthLogout, Dashboard, PasswordReset, Delete, AssignError} from "./components/Auth"


const textDomain = 'http://localhost:8000/api/text'
const authDomain = 'http://localhost:8000/api/user'
const codeDomain = 'http://localhost:8000/api/p'



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  console.log(document.cookie)
  if (parts.length === 2) {
    let cookie = parts.pop().split(';').shift();
    console.log(cookie)
    return cookie 
  }
}
function App() {
  async function getText(slug){
    console.log(document.cookie)
    let res = await fetch(`${textDomain}/${slug}`)
    let data = await res.json()
    if (data.state=='exist'){
      return data.text.body
    }else if (data.state == 'not_exist'){
      return data.msg
    }
  }
  
  
  async function userStatus(){
    let status = await fetch(`${authDomain}/me`, {
      credentials: "include"  
    })
    let data = await status.json()
  //  console.log(data)
    return data
  }
  
  return <>
      <Nav userStatus={userStatus} />
      <main style={{flex:1}}>  
      <Routes>
        <Route  
        path="/" element={
        <Home  
        getText={getText} 
        />
        } />
        
        
        <Route path="/reset_password" element={
        <PasswordReset userStatus={userStatus}getCookie={getCookie} domain={authDomain}/>}/>
        
        
        <Route path="/about" element={
        <About getText={getText}  />
        }/>
        
        <Route path="/account/delete" element={
        <Delete getCookie={getCookie}domain={authDomain}/>
        }/>
        <Route path="/assign-error" element={
        <AssignError userStatus={userStatus} getCookie={getCookie}domain={authDomain}/>
        }/>

        <Route path="/about/how-it-works" element={<HowItWorks getText={getText} />} />
        
        <Route path="*" element={<NotFound />} />
        <Route path="/about/goal" element={<Goal getText={getText}  />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:category" element={<ProjectList domain={codeDomain}/>} />
        <Route path="/projects/:category/:slug" element={<ProjectDetailed getCookie={getCookie}domain={codeDomain} userStatus={userStatus}/>} />
        <Route path="/projects/:category/:slug/add-comment/" element={<ProjectCommentForm domain={codeDomain} userStatus={userStatus} getCookie={getCookie}/>} />
        <Route path="/projects/:category/:slug/edit-comment/:id" element={<CommentEdit domain={codeDomain} userStatus={userStatus} getCookie={getCookie}/>} />
        <Route path="/contacts"
        element={
        <Contacts getText={getText}/>
        }/>
        <Route path="/login" element={<AuthLogin getCookie={getCookie}domain={authDomain} userStatus={userStatus}/>} />
        <Route path="/signup" element={<AuthSignup getCookie={getCookie} userStatus={userStatus} domain={authDomain}/>} />
        <Route path="/logout" element={<AuthLogout 
        userStatus={userStatus} 
        domain={authDomain} /> } />
        <Route path="/about/reason" element={<Reason getText={getText} />} />
        <Route path="/account/dashboard" element={<Dashboard 
        userStatus={userStatus} />} />

      </Routes>
      </main>
      <Footer />
      </>
  }

export default App