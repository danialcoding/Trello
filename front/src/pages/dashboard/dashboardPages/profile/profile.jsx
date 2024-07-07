import React from "react";
import { useState , useEffect  } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BiShow,BiHide } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';



import './profile.css';



export default Profile;

function Profile() {
    const [username, setUsername] = useState("username");
    const [usernameEditMode, setUsernameEditMode] = useState(false);

    const [password, setPassword] = useState("password");
    const [passwordEditMode, setPasswordEditMode] = useState(false);

    const [email, setEmail] = useState("email");
    const [emailEditMode, setEmailEditMode] = useState(false);

    const [registeryDate, setRegisteryDate] = useState("registery date");


    
    const [errorMessages, setErrorMessages] = useState({});

    
    const [passwordShown, setPasswordShown] = useState(true);
    
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    useEffect(()=>{
        // fetchUserData();
        handleLoadDashboard();
    },[]);

    const handleLoadDashboard = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        const response = await fetch(`http://localhost:8080/users/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            const result = await response.json();

            setUsername(result.Username);
            setEmail(result.Email);
            setRegisteryDate(result.CreatedAt);
          }
    }

    const handleSaveEditUser = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        const data = {
            email: email,
            password: password
        }

        const response = await fetch(`http://localhost:8080/users/${username}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });
    
          if (response.ok) {
            const result = await response.json();
          }
    }


    //backend check
      const checkUsername = async () => {
      
        const response = await fetch(`${URL}/api/users/check/username?user_name=${username}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
    
        const result = await response.json();
        return result;
      }
    
      const checkEmail = async () => {
      
        const response = await fetch(`${URL}/api/users/check/email?email=${email}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });
    
        return  await response.json();
      }

    const errors = {
        username: "username already exist",
        username_empty: "invalid username",
        pass_s: "The password and confirm passwor are not the same",
        pass_empty: 'invalid password',
        date: "invalid date",
        email_empty: "invalid email",
        email: "email already exist",
      };
      const errors_type = {
        username: "username",
        pass: "pass",
        confpass: 'confpass',
        date: "date",
        email: "email",
      };
    
      const isValidEmail = (email) => {
          return /\S+@\S+\.\S+/.test(email);
      }
      const isValidPhoneNumber = (phoneNumber) => {
        return /[0-9]{11}/.test(phoneNumber);
    }
    

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );



    const navigate = useNavigate();

    const loginMode = () => {
        return (
            navigate('/sign-in', { replace: true })
        )
    }
    
    const removeAccHandler = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        const response = await fetch(`http://localhost:8080/users/${username}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
    
          if (response.ok) {
            const result = await response.json();

            loginMode();
          }
    }





    //handle edit
    const cancelEditMode = (event,param)  => {
        switch (param) {
            case 'username':
                setErrorMessages({});
                setUsernameEditMode(false);
                break;
            case 'password':
                setErrorMessages({});
                setPasswordEditMode(false);
                break;
            case 'email':
                setErrorMessages({});
                setEmailEditMode(false);
                break;
            default:
        }
    }
    const closeEditMode = (event,param)  => {
        switch (param) {
            case 'username':
                if(username === '') {
                    setErrorMessages({name: "username", message: errors.username_empty });
                }
                else if(!checkUsername()) {
                    setErrorMessages({name: "username", message: errors.username});
                }
                else {
                    setErrorMessages({});
                    setUsernameEditMode(false);
                    
                }
                break;
            case 'password':
                if(password === '') {
                    setErrorMessages({name: "pass", message: errors.pass_empty});
                }
                else {
                    setErrorMessages({});
                    setPasswordEditMode(false);
                }
                break;
            case 'email':
                if(email === '') {
                    setErrorMessages({name: "email", message: errors.email_empty});
                }
                else if(isValidEmail(email) !== true) {
                    setErrorMessages({name: "email", message: errors.email_empty});
                }
                else if(!checkEmail()) {
                    setErrorMessages({name: "email", message: errors.email});
                }
                else {
                    setErrorMessages({});
                    setEmailEditMode(false);
                }
                break;
            default:
        }
        
    }
    
    const openEditMode = (param) => {
        
        switch (param) {
            case 'username':
                setUsernameEditMode(true);
                break;
            case 'password':
                setPasswordEditMode(true);
                break;
            case 'email':
                setEmailEditMode(true);
                break;
            default:

        }
    }
    
    const onEditHandler = (event,param) => {
        closeEditMode(event,param);
    }

    return(
        <>
            <div className="profile profile-container">
                <div className="form">

                    <div className="username_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Username</label>
                        {usernameEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'username')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={usernameEditMode ? (e)=> {onEditHandler(e,'username')} : ()=> {openEditMode('username')}} aria-label={usernameEditMode ? 'Save' : 'Edit'} title={usernameEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {usernameEditMode ? (<IoIosSave onClick={handleSaveEditUser} aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!usernameEditMode} type={"text"} value={username} onChange={(event) => {setUsername(event.target.value);}}/>
                        {renderErrorMessage(errors_type.username)}
                    </div>
                    
                    
                    <div className="email_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Email</label>
                        {emailEditMode && (
                            <button className="textfield--header-action"onClick={(e)=> {cancelEditMode(e,'email')}} aria-label="Cancel" title="Cancel" >
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={emailEditMode ? (e)=> {onEditHandler(e,'email')} : ()=> {openEditMode('email')}} aria-label={emailEditMode ? 'Save' : 'Edit'} title={emailEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {emailEditMode ? (<IoIosSave onClick={handleSaveEditUser} aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!emailEditMode} type={"text"} value={email} onChange={(event) => {setEmail(event.target.value);}}/>
                        {renderErrorMessage(errors_type.email)}
                    </div>
                    

                    <div className="password_div info-item">
                        <div className="icon">
                            <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Password</label>
                        {passwordEditMode && (
                            <button className="textfield--header-action" onClick={(e)=> {cancelEditMode(e,'password')}} aria-label="Cancel" title="Cancel">
                                <IoClose aria-hidden="true" />
                            </button>
                            )}
                            <button onClick={passwordEditMode ? (e)=> {onEditHandler(e,'password')} : ()=> {openEditMode('password')}} aria-label={passwordEditMode ? 'Save' : 'Edit'} title={passwordEditMode ? 'Save' : 'Edit'} className="textfield--header-action">                  
                                {passwordEditMode ? (<IoIosSave onClick={handleSaveEditUser} aria-hidden="true" />) : (<MdEditSquare aria-hidden="true" />)}
                            </button>
                        </div>
                        <input readOnly={!passwordEditMode} type={passwordShown ? "text" : "password"} value={password} onChange={(event) => {setPassword(event.target.value);}}/>
                        <div className="pass_icon" onClick={togglePassword}>
                            {passwordShown ? <BiShow /> : <BiHide />}
                        </div>
                        {renderErrorMessage(errors_type.pass)}
                    </div>



                    <div className="rdate_div info-item">
                        <div className="icon">
                                <MdDashboard />
                        </div>
                        <div className="top">
                        <label>Registery Date</label>
                        </div>
                        <input readOnly={true} type={"text"} value={registeryDate}/>
                    </div>


                    

                </div>

                <div className='btn-div'>
                        <a href='/' onClick={()=> {removeAccHandler()}} className='btn-rmacc'>Remove Account</a>
                </div>
                
                   
                
            </div>
        </>
    );
}