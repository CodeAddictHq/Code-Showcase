import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./components/NotFound/NotFound"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import {About, Reason, Contacts, Goal, HowItWorks} from "./components/About"
import {Projects, ProjectList, CommentEdit, ProjectCommentForm, ProjectDetailed} from "./components/Project"
import { AuthLogin, AuthSignup, AuthLogout, Dashboard, PasswordReset, Delete, AssignError} from "./components/Auth"


const textDomain = 'https://adibscodesapi.onrender.com/api/text'
const authDomain = 'https://adibscodesapi.onrender.com/api/user'
const codeDomain = 'https://adibscodesapi.onrender.com/api/p'



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
 // console.log(document.cookie)
  if (parts.length === 2) {
    let cookie = parts.pop().split(';').shift();
    console.log(cookie)
    return cookie 
  }
}
function App() {
  async function getText(slug){
  //  console.log(document.cookie)
    let res = await fetch(`${textDomain}/${slug}`)
    let data = await res.json()
    if (data.state=='exist'){
      return data.text.body
    }else if (data.state == 'not_exist'){
      return data.msg
    }
  }
  
  
  async function userStatus() {
  let access = localStorage.getItem("access");

  // First try with current access token
  let response = await fetch(`${authDomain}/me`, {
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });

  // Access token expired
  if (response.status === 401) {
    const refresh = localStorage.getItem("refresh");

    const refreshResponse = await fetch(`${authDomain}/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refresh,
      }),
    });
    
    // Refresh token invalid/expired
    if (!refreshResponse.ok) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return { status: false };
    }

    const refreshData = await refreshResponse.json();

    // Save new access token
    localStorage.setItem("access", refreshData.access);

    // Retry request with new access token
    response = await fetch(`${authDomain}/me`, {
      headers: {
        Authorization: `Bearer ${refreshData.access}`,
        "Content-Type": "application/json",
      },
    });
  }

  if (!response.ok) {
    return { status: false };
  }

  return await response.json();
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