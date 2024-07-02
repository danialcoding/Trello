import './forgetpsw.css'
import { MdEmail } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import {useState,useEffect} from 'react';
export default ForgetPsw


function ForgetPsw(props) {
    const {signUpMode,signInMode} = props;

    const [email,setEmail] = useState('');

    //DB
    const[users,setUsers] = useState([]);

    const fetchUsersData = async () => {
        const resault = await fetch('http://localhost:8080/users');
        const jsonResault = await resault.json();

        setUsers(jsonResault);
    }

    useEffect(()=>{
        fetchUsersData();
    },[]);
    //

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const errors = {
        email_i: "Invalid email",
        email_e: "Email field must not be empty",
    };

    const errors_type = {
        email: "email",
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
    
        if(users.find((user) => user.email === email)) {
            return true;
        }
        else {
            setErrorMessages({name: errors_type.email, message: errors.email_i});
            return false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isValidEmail(email)) {
            setErrorMessages({});
            setIsSubmitted(true)
            //change this
        }
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );

    return(
        <>
        <div className="forgetpsw-container forgetpsw">
            <form onSubmit={handleSubmit} className="form">
                <div className="top">
                    <h2 className='logo_name'>Traiding Team</h2>
                    <span className='pageName'>Forget Password</span>
                    <div className="img"><HiOutlineMail/></div>
                    
                    <div className='sing_div'>
                        <span className="link-primary" onClick={signInMode}>Sign In</span>
                        <span className='between'> / </span>
                        <span className="link-primary" onClick={signUpMode}>Sign Up</span>
                    </div>
                    
                </div>
                <div className='email_div'>     
                    <div className="icon"><MdEmail/></div>
                    <label><b>Email</b></label>
                    <input type={"text"} placeholder="Enter Email" name="email" onChange={(event)=>{setEmail(event.target.value)}}/>
                </div>
                {renderErrorMessage(errors_type.email)}
                <button className='submit' type="submit">Submit</button>
            </form>
        </div>
    </>
    )
}