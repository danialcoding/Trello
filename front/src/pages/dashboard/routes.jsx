import Header from "../../components/header/header";
import Dashboard from "./dashboard";
//import Footer from "../../components/footer/footer";

//import DashboardHeader from "../../components/dashboardheader/dashboardheader";
// import UserDashboard from "../userdashboard/userDashboard";


//login
import Login from '../login/login'
import SignUp from '../signup/signup'
// import ForgetPsw from '../forgetpsw/forgetpsw'


//dashboard
// import { userDashboardMenu } from '../userdashboard/userdashboardmenu';


import React from "react";
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements,outlet} from "react-router-dom";
import Profile from "./dashboardPages/profile/profile";
import Boards from "../boards/boards";
import Cards from "./dashboardPages/cards/cards";
import BoardPage from "../boardpage/boardpage";
import Team from "../team/team";
import CreateBoard from "../createboard/createboard";

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
  
  if(path[0] === "sign-in" | path[0] === "sign-up" | path[0] == null) {
    return (
      <>
        <div className="routes">
          {outlet}
        </div>
      </>
      
    )
  }
  else {
    return (
      <>
        <Header/>
  
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

          <Route path="/"  element={<Layout outlet={<Login/>}/>}/>

          <Route path="/boards" element={<Layout outlet={<Boards/>}/>}/>

          <Route path="/dashboard" element={<Layout outlet={<Dashboard layout={<Profile/>}/>}/>}/>
          <Route path="/dashboard/profile" element={<Layout outlet={<Dashboard layout={<Profile/>}/>}/>}/>
          <Route path="/dashboard/cards" element={<Layout outlet={<Dashboard layout={<Cards/>}/>}/>}/>


          <Route path="/board/:boardId" element={<Layout outlet={<BoardPage/>}/>}/>

          <Route path="/board/team/:boardId" element={<Layout outlet={<Team/>}/>}/>
          <Route path="/board/createboard" element={<Layout outlet={<CreateBoard/>}/>}/>


          <Route path="/sign-in" element={<Layout outlet={<Login/>}/>}/>
          <Route path="/sign-up" element={<Layout outlet={<SignUp/>}/>}/>

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

