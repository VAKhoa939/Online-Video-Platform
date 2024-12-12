import "../../../css/login.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface Form {
  email: string;
  password: string;
}
const LoginPage = () => {
  const formRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();
  const [form, setForm] = useState<Form>({} as Form);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }
  function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [form.email, form.password]);

  return (
    <div className="wrapper">
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            name="email"
            ref={formRef}
            value={form.email}
            onChange={onChange}
            placeholder="E-mail"
            required
            autoComplete="on"
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            ref={formRef}
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            required
            autoComplete="on"
          />
          <FaLock className="icon" />
        </div>
      <div className="remember-forgot">
        <label><input type="checkbox"/>Remember me</label>
      </div>
      <button type = "submit"> Login </button> 
      <div className="register-link">
        <p>Don't have an account? <Link to = "/Register"> Register</Link></p>
      </div>
    </form>
    </div>
  );
};

export default LoginPage;
