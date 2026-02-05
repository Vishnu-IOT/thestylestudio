import axios from 'axios'
import React, { useState } from 'react'
import Lottie from 'react-lottie';
import LoginData from '../lottie/Login.json';
import animationData from '../lottie/register.json';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Auth/firebase";
import { handleLoginError, handleRegisterError } from '../lottie/helper';
import "../styles/login.css"
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();

    const [isSignup, setIsSignup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [lemail, setLEmail] = useState('')
    const [lpassword, setLPassword] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [conpassword, setConPassword] = useState('')


    // Login Component //
    const login = async (e) => {
        e.preventDefault();
        try {
            const userCred = await signInWithEmailAndPassword(auth, lemail, lpassword);

            await auth.currentUser.reload();

            const token = await userCred.user.getIdToken();

            if (userCred.user.emailVerified) {
                try {
                const data = await axios.post(`/api/login`,
                        { uid: userCred.user.uid, email: userCred.user.email, emailVerified: auth.currentUser.emailVerified },
                        {
                            headers: {
                                Authorization: token
                            }
                        }
                    );

                    // cookies to auth
                    if (data.data.datas[0].admin === "ADMIN") {
                        alert("Enjoy Shopping!");
                        document.cookie = "auth=true; path=/;";
                        router.replace("/home");
                    }
                    else{
                        alert("Please Login With Admin Credentials!");
                    }
                }
                catch (error) {
                    alert("Error in Login");
                }
            }
            else {
                alert("Please Verify Your Email!");
            }
        }

        catch (error) {
            alert(handleLoginError(error));
        }

        setLEmail('')
        setLPassword('')
    }

    // Register Component //
    const register = async (e) => {
        e.preventDefault();

        if (password !== conpassword) {
            return alert("Mismatched Password!..")
        }

        if (number.length !== 10) {
            return alert("Invalid Phone Number")
        }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);

            // console.log(userCred, userCred.user);

            await sendEmailVerification(userCred.user);

            const token = await userCred.user.getIdToken();

            // console.log(auth.currentUser.emailVerified);


            await axios.post(`/api/register`,
                { name: name, email: email, phonenumber: number, uid: userCred.user.uid, emailverified: false, admins: "ADMIN" },
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
                .then((data) => { alert("Registered Successfully!\nVerify Your Email To Continue!..") })
                .catch((err) => { alert("Error in Register"); })
        }

        catch (error) {
            return alert(handleRegisterError(error));
        }

        setName('')
        setEmail('')
        setNumber('')
        setPassword('')
        setConPassword('')
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOption = {
        loop: true,
        autoplay: true,
        animationData: LoginData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
            {
                isSignup ? (
                    <>
                        <div className='login-wrapper'>
                            <div className='login-box'>
                                <div className='Registerbox-box'>
                                    {/* <h1>Create Account ✨</h1> */}
                                    {/* <h3 className='h3'>Register to manage your tasks</h3> */}
                                    <Lottie
                                        options={defaultOptions}
                                        height={400}
                                        width={400}
                                    />
                                </div>
                                <div className='logging-box'>
                                    <form onSubmit={(e) => { register(e) }} className='login-form'>
                                        <FaArrowLeftLong className='arrow' onClick={() => setIsSignup(!isSignup)} />
                                        <div>
                                            <h1 className='main-content'>Create an Account</h1>
                                            <p className='account'>
                                                Already have an account?
                                                <span
                                                    style={{ color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
                                                    onClick={() => setIsSignup(!isSignup)}>
                                                    Login
                                                </span>
                                            </p>
                                        </div>

                                        <input value={name} required onChange={(e) => { setName(e.target.value) }}
                                            className='login-inputs' type="text" placeholder='Enter your name...' />

                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required
                                            className='login-inputs' type="email" placeholder='Enter your email...' />

                                        <input value={number} onChange={(e) => { setNumber(e.target.value) }} required
                                            className='login-inputs' type="tel" maxLength={10} placeholder='Enter Mobile Number...' pattern="[1-9]{1}[0-9]{9}" />

                                        <div className='left'>

                                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} required
                                                className='login-input' type="password" placeholder='Enter password...' />

                                            <input value={conpassword} onChange={(e) => { setConPassword(e.target.value) }} required
                                                className='login-input' type="password" placeholder='Enter Confirm password...' />

                                        </div>
                                        {/* </div> */}
                                        <button className='signup'>Sign Up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                ) :
                    (
                        <>
                            <div className='login-wrapper'>
                                <div className='login-box'>
                                    <div className='Message-box'>
                                        {/* <h1 >Welcome Back 👋</h1> */}
                                        {/* <h3 className='h3'>Login to access your tasks</h3> */}
                                        <Lottie className='registerlottie'
                                            options={defaultOption}
                                            height={400}
                                            width={400}
                                        />
                                    </div>
                                    <div className='logging-box'>
                                        {
                                            !isLogin ?
                                                (
                                                    <>
                                                        <form onSubmit={(e) => { login(e) }} className='login-form'>
                                                            <FaArrowLeftLong className='arrow' onClick={() => setIsSignup(!isSignup)} />
                                                            <div>
                                                                {/* <div className='mobilelogin'>
                                                                    <h2 className='main-content-login active' onClick={() => setIsLogin(true)}>Email Login</h2>
                                                                    <h2 className='main-content-login active' onClick={() => setIsLogin(false)}>Mobile Login</h2>
                                                                </div> */}
                                                                <h1 className='main-content'>Login to your Account</h1>
                                                                <p className='account'>
                                                                    Don’t have an account?
                                                                    <span
                                                                        style={{ color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
                                                                        onClick={() => setIsSignup(!isSignup)}>
                                                                        Create an Account
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <input value={lemail} onChange={(e) => { setLEmail(e.target.value) }} required
                                                                className='login-inputs' type="email" placeholder='Enter your email ...' />
                                                            <input value={lpassword} onChange={(e) => { setLPassword(e.target.value) }} required
                                                                className='login-inputs' type="password" placeholder='Enter password ...' />
                                                            <p className="forgot-password" >Forgot password?</p>
                                                            <button className='login-btn'>Log In</button>
                                                        </form>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <form onSubmit={(e) => { login(e) }} className='login-form'>
                                                            <FaArrowLeftLong className='arrow' onClick={() => setIsSignup(!isSignup)} />
                                                            <div>
                                                                {/* <div className='mobilelogin'>
                                                                        <h2 className='main-content-login active' onClick={() => setIsLogin(true)}>Email Login</h2>
                                                                        <h2 className='main-content-login active' onClick={() => setIsLogin(false)}>Mobile Login</h2>
                                                                    </div> */}
                                                                <h1 className='main-content'>Login to your Account</h1>
                                                                <p className='account'>
                                                                    Don’t have an account?
                                                                    <span
                                                                        style={{ color: "#2563eb", cursor: "pointer", fontWeight: "600" }}
                                                                        onClick={() => setIsSignup(!isSignup)}>
                                                                        Create an Account
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <input value={lemail} onChange={(e) => { setLEmail(e.target.value) }} required
                                                                className='login-inputs' type="email" placeholder='Enter your Mobile Number ...' />
                                                            <input value={lpassword} onChange={(e) => { setLPassword(e.target.value) }} required
                                                                className='login-inputs' type="password" placeholder='Enter OTP ...' />
                                                            {/* <p className="forgot-password" >Forgot password?</p> */}
                                                            <button className='login-btn'>Verify OTP</button>
                                                        </form>
                                                    </>
                                                )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default Login




