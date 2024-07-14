import React from 'react';
import './dashboard.css'
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiTwotoneSetting } from 'react-icons/ai';
import { MdContentCopy } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';


import { message } from 'react-message-popup';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
                                                                                                                                                                                                                                                                     
import { useState,useEffect } from 'react';

import { DashboardMenu } from './dashboardmenu';
import { useNavigate } from 'react-router-dom';

import './dashboard.css';


function UserDashboard({layout}) {
    const [showSideBar,setShowSideBar] = useState(window.localStorage.getItem('showSideBar'));
    const [classButton,setClassButton] = useState("liSideMenuShow liSideMenu");
    const [Layout,setLayout] = useState(layout);
    const [active, setActive] = useState();

    const [username, setUsername] = useState(localStorage.getItem('username'));

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);


    const navigate = useNavigate();

    const loginMode = () => {
        return (
            navigate('/sign-in', { replace: true })
        )
    }

    const handleLogOut = () => {
        localStorage.setItem('token','');
        loginMode();
    }

    useEffect(() => {
        setShowSideBar(window.localStorage.getItem('showSideBar'));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('showSideBar', showSideBar);
    }, [showSideBar]);
     


    const handleShowSideBar = () => {
        const sidebar = document.getElementById("sidebar");
        const userInfo = document.getElementById("userInfo");
        const miniButtons = document.getElementById("center-container");
        const linktxt = document.getElementsByClassName("linktxt");
        const liSideMenu = document.getElementsByClassName("liSideMenu");
        const divider = document.getElementById("divider");
        const minibuttonsForCloseMenu = document.getElementById("minibuttonsForCloseMenu");
        const hideBarImage = document.getElementById("hideBarImage");
        const pages = document.getElementById("pages");


        
        if(showSideBar) {
            pages.className = "pages-openMenu";
            sidebar.className = "sidebar-open";
            userInfo.className = "userInfo";
            miniButtons.className = "center-container";
            Array.prototype.forEach.call(linktxt,(element) => {
                element.className = "linktxtShow linktxt";
            });
            Array.prototype.forEach.call(liSideMenu,(element) => {
                if(element.classList.contains("active")) {
                    setClassButton("liSideMenuShow liSideMenu active")
                }
                else {
                    setClassButton("liSideMenuShow liSideMenu")
                }
            });
            divider.style.display = "none";
            minibuttonsForCloseMenu.style.display = "none";
            hideBarImage.style.display = "none";

            setShowSideBar(false);
        }
        else {
            pages.className = "pages";
            sidebar.className = "sidebar";
            userInfo.className = "userInfoHide";
            miniButtons.className = "miniButtonsHide";
            Array.prototype.forEach.call(linktxt,(element) => {
                element.className = "linktxtHide linktxt";
            });
            Array.prototype.forEach.call(liSideMenu,(element) => {
                if(element.classList.contains("active")) {
                    setClassButton("liSideMenuHide liSideMenu active")
                }
                else {
                    setClassButton("liSideMenuHide liSideMenu")
                }
            });
            divider.style.display = "block";
            minibuttonsForCloseMenu.style.display = "flex";
            hideBarImage.style.display = "block";

            setShowSideBar(true);
        }
    }

    const copyUsername = () => {
        const username = document.getElementById("username");
    
        navigator.clipboard.writeText(username.innerText);
        message.success('copied', 3000);
    }

    const someMethod = (url) => {
        const { history } = this.props;
        history.push(url);
    }
    

    useEffect(() => {
        handleShowSideBar();


    }, []);

    return (
        <>
            <div className="dashboard dashboard-container">
                <div className="sidebar-open" id='sidebar'>
                    <div className="top">
                        {showSideBar ? <BiMenu className='icon_bar' onClick={()=> {handleShowSideBar()}}/> 
                        : <AiOutlineClose className='icon_close' onClick={()=> {handleShowSideBar()}}/>}
                    </div>
                    <div className="userInfo" id="userInfo">
                        <img className='userimage' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ggK4tBn1OOn82eIyQyQAfFR8j4hQiL60MMLw7X9rmlmgqloCZFqE8O2d_fRquNh-zK0&usqp=CAU'/>
                        <span className='username' id='username'>{username}</span>
                        <MdContentCopy className='copyUsername' onClick={()=> {copyUsername()}}/>
                    </div>
                    <div className="center-container" id="center-container">
                        <div className="minibuttons">
                            <Tippy content="Home" delay={200} duration={500} theme='material'>
                                <a href='/'><FaHome/></a>
                            </Tippy>
                            <Tippy content="Setting" delay={200} duration={500} theme='material'>
                                <a href='/'><AiTwotoneSetting/></a>
                            </Tippy>
                            <Tippy content="Log Out" delay={200} duration={500} theme='material'>
                                <a href='/' onClick={()=> {handleLogOut()}}><AiOutlineLogout/></a>
                            </Tippy>
                        </div>
                    </div>
                    
                    <div className="bottom">
                        <ul>
                            <li className='hideBarImage' id='hideBarImage' style={{display: "none"}}>
                                <img className='userimage' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ggK4tBn1OOn82eIyQyQAfFR8j4hQiL60MMLw7X9rmlmgqloCZFqE8O2d_fRquNh-zK0&usqp=CAU'/>
                            </li>
                            {
                                DashboardMenu.map((item,index) => (
                                    <li onClick={(event) => setActive(item) & setLayout(item.page) & someMethod(item.path) & event.preventDefault()} key={index} className={`${classButton} ${active === item ? 'active' : '' || index === 0 & active === null ? 'active' : "" || item.path === window.location.pathname ? 'active' : ""}`}><a href={item.path}>{item.icon}<span className='linktxt'>{item.title}</span></a></li>                                ))
                            }
                        </ul>
                    </div>


                    <hr id='divider' style={{
                        display: "none",
                        width: "80%",
                        background: "#0364F1",
                        height: "2px",
                        border: "none",
                    }}/>

                    <div className="minibuttonsForCloseMenu" id='minibuttonsForCloseMenu' style={{display: "none"}}>
                        <Tippy content="Home" delay={200} duration={500} theme='material' placement='right'>
                            <a href='/'><FaHome/></a>
                        </Tippy>
                        <Tippy content="Setting" delay={200} duration={500} theme='material' placement='right'>
                            <a href='/'><AiTwotoneSetting/></a>
                        </Tippy>
                        <Tippy content="Log Out" delay={200} duration={500} theme='material' placement='right'>
                            <a href='/' onClick={()=> {handleLogOut()}}><AiOutlineLogout/></a>
                        </Tippy>
                    </div>
                </div>

                <div id='pages' className='pages-openMenu'>
                    {Layout}
                </div>
            </div>
        </>
    );
}
 
export default UserDashboard;