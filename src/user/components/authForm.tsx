import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../styles/authForm.css'; 

import { existUser, logInUser, registerUser } from './../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoadingView } from './loading';

interface FormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

const AuthForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [isSignIn, setIsSignIn] = useState(true);
    const [values, setValues] = useState<FormValues>({ username: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [isAdmin,setIsAdmin]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
  
    const toggleForm = () => {
      setIsSignIn((prev) => !prev);
      setValues({ username: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      setTouched({});
    };
  
    useEffect(() => {
      setTimeout(() => {
        setIsSignIn(true);
      }, 200);
    }, []);

    const token = sessionStorage.getItem('token');
 
    if (token) {
      const role=sessionStorage.getItem('role')
      if(role==='admin') return <Navigate to='/admin-dashboard'/>
      else  return <Navigate to="/" />
    }
  
    const validateField = (name: string, value: string) => {
      let error = '';
      
      if (name === 'username' && !isSignIn && !value.trim()) {
        error = 'Username is required';
      }
  
      if (name === 'email') {
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
        }else if (!value.endsWith('@g7cr.com')) {
          error = 'Email does not exist. Please use a G7CR email address.';
        }
      }
  
      if (name === 'password') {
        if (!value.trim()) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
      }
  
      if (name === 'confirmPassword') {
        if (!value.trim()) {
          error = 'Confirm password is required';
        } else if (value !== values.password) {
          error = 'Passwords do not match';
        }
      }
  
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
      validateField(name, value); // Validate on change
    };
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTouched({ ...touched, [name]: true });
      validateField(name, value); // Validate on blur
    };

    const saveLoggedInUserDetails=(userDetails:any)=>{
      const {token,username,userId}=userDetails
      sessionStorage.setItem('token',token);
      sessionStorage.setItem('role','admin');
      sessionStorage.setItem('username',username)
      sessionStorage.setItem('userId',userId)
    }

    const handleAdminLogin=async (e:any)=>{
      e.preventDefault();
      setIsLoading(true);
      try {
            const response = await dispatch<any>(logInUser({ email: values.email, password: values.password }));
            if (logInUser.fulfilled.match(response)) {
                toast.success("Logged in successfully!");
                const {payload}=response
                saveLoggedInUserDetails(payload)
                navigate('/admin-dashboard')
            } else {
                toast.error(response.payload || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred while logging in");
        }
      setIsLoading(false)
    }

    const handleLogin=async (e:any)=>{
      e.preventDefault();
      setIsLoading(true)
      try{
        const existUserResponse=await dispatch<any>(existUser(values.email))
      if(existUser.fulfilled.match(existUserResponse)){

        const {payload}=existUserResponse
        console.log(payload.roles.includes('user'))
        if(!payload.roles.includes('user') && payload.roles.includes('admin')){
          toggleForm()
        }else if (payload.roles.includes('user')){
          const tenantId = process.env.REACT_APP_TENANT_ID;
          const clientId = process.env.REACT_APP_CLIENT_ID;
      
          toast.success('Redirecting to Microsoft Login...', {
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme:"dark"  
          });
          setIsLoading(false)
      
          const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/runway&response_mode=query&scope=offline_access%20User.Read https://management.azure.com/user_impersonation`;
          window.location.href = authUrl;
        }
      }else{
        toast.error(existUserResponse.payload || "Login failed");
      }
      }catch(err){
        toast.error("You do not have access");
      } 
      setIsLoading(false)
      
    }

  return (
    <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
      <ToastContainer />
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <form onSubmit={handleAdminLogin} className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
          <div className="form sign-up">
              <h2 style={{color:'#303030'}}>Admin Login</h2>
              <div className="input-group">
                {/* <i className="bx bx-mail-send"><MdEmail/></i> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <p className="error">{errors.email}*</p>}
              </div>
              
              <div className="input-group">
                {/* <i className="bx bxs-lock-alt"><RiLockPasswordFill/></i> */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              {touched.password && errors.password && <p className="error">{errors.password}*</p>}
              </div>
              
              <div style={{ position: 'relative', display: 'block', opacity:isLoading ? '0.7':'10' }}>
                <button disabled={isLoading} type="submit" style={{ position: 'relative' }}>Sign in</button>
                {isLoading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1, // Ensure loader is above the button
                    }}
                  >
                    <LoadingView size={24}/>
                  </div>
                )}
              </div>
              <p>
                <span>Are you not an admin? </span>
                <b onClick={toggleForm} className="pointer">
                  Sign in here
                </b>
              </p> 
             
              
            </div>
          </div>
        </form>

        {/*USER SIGN IN */}
        <form onSubmit={handleLogin} className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <h2 style={{color:'#303030'}}>User Login</h2>
              <div className="input-group">
                {/* <i className="bx bx-mail-send"><MdEmail/></i> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <p className="error">{errors.email}*</p>}
              </div>
              {/* <div className="input-group">
                 <i className="bx bxs-lock-alt"><RiLockPasswordFill/></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && <p className="error">{errors.password}*</p>}
              </div> */}
              <div style={{ position: 'relative', display: 'block', opacity:isLoading ? '0.7':'10' }}>
                <button disabled={isLoading} type="submit" style={{ position: 'relative' }}>
                  Sign in with
                  <span className="ms-2">
                    <img
                      width="25px"
                      alt="microsoft"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWjxuZx__a25hgj1JCqKkQF-6_UiqrUG7_g&s"
                    />
                  </span>
                </button>
                {isLoading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1, // Ensure loader is above the button
                    }}
                  >
                    <LoadingView size={24}/>
                  </div>
                )}
              </div>

              
              <p>
                <span>Are you admin? </span>
                <b onClick={toggleForm} className="pointer">
                  Sign in here
                </b>
              </p> 
             
              
            </div>
          </div>
        </form>
      </div>

      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in m-0 p-0">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in m-0 p-0">
            <img alt="logo" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1730293073/restaurant_logo-removebg-preview_zxbaip.png"/>
          </div>
        </div>

        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up m-0 p-0">
            <img alt="logo" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1730293073/restaurant_logo-removebg-preview_zxbaip.png"/>
          </div>
          <div className="text sign-up m-0 p-0">
            <h2>Welcome Back!</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
