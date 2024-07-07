import { useEffect,useState } from 'react';
import { BiShow,BiHide } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserTie } from 'react-icons/fa';
import { IoFingerPrintOutline } from 'react-icons/io5';
//import Popup from 'reactjs-popup';

import { useNavigate } from 'react-router-dom';

import './signup.css'
export default SignUp


function SignUp(props) {
    const navigate = useNavigate();

    const signInMode = () => {
        return (
            navigate('/sign-in', { replace: true })
        )
    }

    //state
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);


    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmpasswordShown);
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const hanleSignUp = async (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Email: email,
            Password: password,
        };

        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    

          const result = await response.json();

          if (!response.ok) {
            setErrorMessages({name: errors_type.confpass, message: result.message});
          }
          else {
            signInMode();
          }
    }


    // error States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const errors = {
        email_i: "Invalid email",
        email_e: "Email field must not be empty",
        email_ex: "This email address is already used",
        uname_c: "Username length should be more than 3",
        uname_e: "Username field must not be empty",
        uname_ex: "This username is already used",
        pass_e: "Password field must not be empty",
    };

    const errors_type = {
        email: "email",
        uname: "uname",
        pass: "pass",
        confpass: "confpass"
    } 

    const isValidEmail = (email) => {
        if(email === "") {
            setErrorMessages({name: errors_type.email, message: errors.email_e});
            return false;
        }

        const checkMail =  /\S+@\S+\.\S+/.test(email);

        if(!checkMail) {
            setErrorMessages({name: errors_type.email, message: errors.email_i});
            return false;
        }
        else {
            return true;
        }
    }

    const isValidUsername = (username) => {
        if(username === "") {
            setErrorMessages({name: errors_type.uname,message:errors.uname_e});
            return false;
        }

        if(username.length < 3) {
            setErrorMessages({name: errors_type.uname,message:errors.uname_c});
            return false;
        }
        else {
            return true;
        }

    }

    const isValidPassword = (password) => {
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[0-9]/g;

        if(password === "") { 
            setErrorMessages({name: errors_type.pass,message:errors.pass_e});
            return false;
        }

        if (!password.match(lowerCase)) {
            setErrorMessages({name: errors_type.pass,message:"Password should contains lowercase letters"});
            return false;
        // } else if (!password.match(upperCase)) {
        //     setErrorMessages({name: errors_type.pass,message:"Password should contain uppercase letters"});
        //     return false;
        } else if (!password.match(numbers)) {
            setErrorMessages({name: errors_type.pass,message:"Password should contains numbers also"});
            return false;
        } else if (password.length < 8) {
            setErrorMessages({name: errors_type.pass,message:"Password length should be more than 8"});
            return false;
        } else {
            return true;
        }
    }

    const isSamePassword = () => {
        if(password === confirmPassword) {
            return true;
        }
        else {
            setErrorMessages({name: errors_type.confpass,message:"Password and confirm password should be same."});
            return false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isValidPassword(password) & isSamePassword() & isValidUsername(username) & isValidEmail(email)) {
            setErrorMessages({});
            hanleSignUp(event);
        }
        
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );

    return(
        <>
        <div className="signup-container signup">
            <form className="form" onSubmit={handleSubmit}>
                <div className="top">
                    <h2 className='logo_name'>Trello</h2>
                    <span className='pageName'>Sing Up</span>
                    <div className="img"><IoFingerPrintOutline/></div>
                    
                    <p className='link-text'>Already registered? </p>
                    <span className="link-primary" onClick={signInMode}>Sign In</span>
                </div>
                <div className='email_div'>
                    <div className="icon"><MdEmail/></div>
                    <label><b>Email</b></label>
                    <input type={"text"} placeholder="Enter Email" name="email" onChange={(event)=>{setEmail(event.target.value)}}></input>
                </div>
                {renderErrorMessage(errors_type.email)}

                <div className='uname_div'>
                    <div className="icon"><FaUserTie/></div>
                    <label><b>Username</b></label>
                    <input type={"text"} placeholder="Enter Username" name="uname" onChange={(event)=>{setUsername(event.target.value)}}></input>
                </div>
                {renderErrorMessage(errors_type.uname)}

                <div className='pass_div'>
                    <div className="icon"><RiLockPasswordFill/></div>
                    <label><b>Password</b></label>
                    <input type={passwordShown ? "text" : 'password'} placeholder="Enter Password" name="psw" onChange={(event)=>{setPassword(event.target.value)}}></input>
                    <div className="pass_icon" onClick={togglePassword}>{passwordShown ? <BiShow/> : <BiHide/>}</div>
                </div>
                {renderErrorMessage(errors_type.pass)}


                <div className="pass_div">
                    <div className="icon"><RiLockPasswordFill/></div>
                    <label><b>Confirm password</b></label>
                    <input type={confirmpasswordShown ? "text" : "password"} placeholder="Enter Password" name="conf-psw" onChange={(event) => {setConfirmPassword(event.target.value);}}/>
                    <div className="pass_icon" onClick={toggleConfirmPassword}>{confirmpasswordShown ? <BiShow /> : <BiHide />}</div>
                </div>
                {renderErrorMessage(errors_type.confpass)}

                {/* <div className="i-agree">
                    <input type="checkbox" name="i-agree" checked={agreePrivacyPolicy} onChange={() => {setAgreePrivacyPolicy(!agreePrivacyPolicy)}}/>   
                    <label id='i-agree-l' onClick={() => {setAgreePrivacyPolicy(!agreePrivacyPolicy)}}>I agree to</label><span id='i-agree-s' className='link-primary' onClick={togglePopUp}> privacy policy</span>
                </div> */}
                <button className='submit' type="submit" onClick={(event)=>{handleSubmit(event)}}>Submit</button>
            </form>


            {/* <Popup open={isOpenPopUp} position="right center">
                <h4>Privacy Policy</h4>
                <p>Popup content here !! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam eos est quibusdam. Repellendus provident perferendis repudiandae officiis delectus doloremque nemo non voluptatum corrupti, officia maxime, voluptatem vero consequuntur? A illo ratione beatae labore aliquid, asperiores suscipit assumenda eius ad quisquam harum quasi repellendus dignissimos aperiam! Pariatur animi, iusto qui quia, nulla rem a mollitia cupiditate dolorum atque velit modi quos accusamus asperiores voluptate fugit libero explicabo odio deserunt natus delectus sapiente? Veritatis, quasi. Harum inventore ducimus error, quod quas accusantium culpa impedit quasi eos esse. Maiores quidem aliquam ex delectus mollitia enim, quisquam earum ipsam, possimus repellendus aspernatur eos? Odio.</p>
            </Popup> */}
        </div>
    </>
    )
}