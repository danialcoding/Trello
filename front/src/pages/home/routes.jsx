import Header from "../../components/header/header";
import Home from "./home";
import Footer from "../../components/footer/footer";
// import UserDashboard from "../userdashboard/userDashboard";


//login
// import Login from '../login/login'
// import SignUp from '../signup/signup'
// import ForgetPsw from '../forgetpsw/forgetpsw'


//dashboard
// import { userDashboardMenu } from '../userdashboard/userdashboardmenu';



import React from "react";
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements,outlet} from "react-router-dom";

// const Layout = () => (
//   <>
//     <Header/>

//     <div className="routes">
//       <Outlet/>
//     </div>

//     <Footer/>
//   </>
// );
const Layout = ({outlet}) => {
  const path = (window.location.pathname).split("/").filter((str)=> str !== "");
  
  if(path[0] === "Dashboard" | path[0] === "dashboard") {
    return (
      <div className="routes">
        {outlet}
      </div>
    )
  }
  else {
    return (
      <>
        {/* <Header/> */}
  
        <div className="routes">
          {outlet}
        </div>
  
        {/* <Footer/> */}
      </>
    )
  }

  
}

const Routes = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route >
          <Route path="/"  element={<Layout outlet={<Home/>}/>}/>
          <Route path="/home" element={<Layout outlet={<Home/>}/>}/>
{/* 
          {
              userDashboardMenu.map((item,index) => (
                <Route key={index} path={item.path} element={<Layout outlet={<UserDashboard layout={item.page}/>}/>}/>
                ))
          } */}

          {/* <Route path="/dashboard" element={<Layout outlet={<UserDashboard layout={<DWallet/>}/>}/>}/>
          <Route path="/dashboard" element={<Layout outlet={<UserDashboard layout={<DWallet/>}/>}/>}/>
          <Route path="/dashboard/teams" element={<Layout outlet={<UserDashboard layout={<DTeams/>}/>}/>}/>
          <Route path="/dashboard/news" element={<Layout outlet={<UserDashboard layout={<DNews/>}/>}/>}/>
          <Route path="/dashboard/wallet" element={<Layout outlet={<UserDashboard layout={<DWallet/>}/>}/>}/> */}

          {/* <Route path="/sign-in" element={<Layout outlet={<Login/>}/>}/>
          <Route path="/sign-up" element={<Layout outlet={<SignUp/>}/>}/>
          <Route path="/forgetpsw" element={<Layout outlet={<ForgetPsw/>}/>}/>
           */}
          {/* <Route path="/news" element={<News/>}/>

          <Route path="/create_team" element={<CreateTeam/>}/>
          <Route path="/teams" element={<Teams/>}/>


          <Route path="/sing-in" element={<Auth mode={"signin"}/>}/>
          <Route path="/sing-up" element={<Auth mode={"signup"}/>}/>
          <Route path="/forgetpsw" element={<Auth mode={"forgetpsw"}/>}/> */}
        </Route>
        
      )
    )
          

    return (
        <>
            <RouterProvider router={router}/>
        </>
     );
}
 
export default Routes;

