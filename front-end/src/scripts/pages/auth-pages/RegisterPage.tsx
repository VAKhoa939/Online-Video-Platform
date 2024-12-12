import "../../../css/login.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Form {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const RegisterPage = () => {
    const formRef = useRef<HTMLInputElement>(null);
    const errRef = useRef();
    const [form, setForm] = useState<Form>({}as Form);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
  
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      setForm(previous =>( {...previous, [event.target.name] : event.target.value}));
    }
    function onSubmit(event: React.ChangeEvent<HTMLFormElement>)
    {
      event.preventDefault();
      
    }
    useEffect(()=> {
      if (!formRef.current) return;
      formRef.current.focus();
    }, [])
    useEffect(()=> {
      setErrMsg('');
    }, [form.email, form.password])
  
  
    return(
    <div className = "wrapper">
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" name="userName" ref={formRef} value={form.userName} onChange={onChange} placeholder="User name" required />
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type="text" name="email" ref={formRef} value={form.email} onChange={onChange} placeholder="E-mail" required />
          <FaUser className="icon"/>
        </div>
        
        <div className="input-box">
          <input type="password" name="password" ref={formRef} value={form.password} onChange={onChange} placeholder="Password" required />
          <FaLock className="icon"/>
        </div>

        <div className="input-box">
          <input type="password" name="confirmPassword" ref={formRef} value={form.confirmPassword} onChange={onChange} placeholder="Confirm Password" required />
          <FaLock className="icon"/>
        </div>

        <button type = "submit"> Register </button> 
        <div className="register-link">
          <p>Already have an account? <Link to="/Login"> Login</Link></p>
        </div>
      </form>
      </div>
    );
  };
  
  export default RegisterPage;