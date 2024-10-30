import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { changeMode, logInUser, registerUser } from '../../store/authSlice'; // Assuming you have a registerUser action

import './loginOrRegister.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LoginOrRegister: React.FC = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState<any>({});
  const { mode } = useSelector((state: any) => state.authSlice);
  
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(()=>{
    const path=window.location.pathname
    dispatch(changeMode(path.substring(1)))
  },[])

  const token = sessionStorage.getItem('token');
 
  if (token) {
      return <Navigate to="/" />
  }

  const saveLoggedInUserDetails=(userDetails:any)=>{
    const {token,role,username,userId}=userDetails
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('role',role);
    sessionStorage.setItem('username',username)
    sessionStorage.setItem('userId',userId)
  }

  const openNewMode=(value:String)=>{
    setFormValues({ email: '', password: '', name: '' })
    setErrors({});
    dispatch(changeMode(value))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    setErrors({});
    event.preventDefault();
    
    const validationSchema = Yup.object().shape({
      name: mode === 'register' ? Yup.string().required('Name is required') : Yup.string(),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    });

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      
      let resultAction;
      if (mode === 'login') {
        resultAction = await dispatch<any>(logInUser({ email: formValues.email, password: formValues.password }));
      } else {
        resultAction = await dispatch<any>(registerUser({ name: formValues.name, email: formValues.email, password: formValues.password }));
      }

      if (logInUser.fulfilled.match(resultAction) || registerUser.fulfilled.match(resultAction)) {
        toast.success(`${mode === 'login' ? 'Logged in' : 'Registered'} successfully!`);
        if(mode==='register'){
          openNewMode('login')
          navigate('/login')
        }else{
          const {token,data}=resultAction.payload
          saveLoggedInUserDetails({token,...data})
          navigate('/')
        }
      } else {
        
        toast.error(resultAction.payload);    
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        const firstError: any = err.inner[0];
        validationErrors[firstError.path] = firstError.message;
        toast.error(firstError.message);
        setErrors(validationErrors);
      }
    }
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className='body'>
      <ToastContainer 
        autoClose={3000}  
        closeOnClick
        theme="dark"
      />
      <div className="ring">
        <i style={{ '--clr': '#f0b41d' } as React.CSSProperties}></i>

        <form onSubmit={handleSubmit} className="login">
          <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

          {mode === 'register' && (
            <div className="inputBx">
              <input name="name" value={formValues.name} onChange={handleChange} type="text" placeholder="Name"/>
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
          )}

          <div className="inputBx">
            <input name="email" value={formValues.email} onChange={handleChange} type="text" placeholder="Email"/>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="inputBx">
            <input name="password" value={formValues.password} onChange={handleChange} type="password" placeholder="Password"/>
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="inputBx">
            <input type="submit" value={mode === 'login' ? 'Sign in' : 'Register'}/>
          </div>
          
          <div className="links">
            {mode === 'login' ? (
              <>
                <a href="#/">Forgot Password</a>
                <Link to="/register" onClick={()=>openNewMode('register')}>Signup</Link>
              </>
            ) : (
              <Link to="/login" onClick={()=>openNewMode('login')}>Login</Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginOrRegister;
