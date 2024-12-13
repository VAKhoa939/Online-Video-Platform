import "../../../css/form.css";
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AuthResponse, login, LoginForm } from "../../interfaces/auth";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const formRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<LoginForm>({} as LoginForm);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<AuthResponse, Error, LoginForm>(login, {
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("email", form.email);
      setAuth((prev) => ({ ...prev, email: form.email }));
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        isAxiosError(error) && error.response
          ? error.response?.data?.message
          : "Something went wrong";
      toast.error(errorMessage);
    },
  });
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }
  function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate(form);
  }
  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.focus();
  }, []);

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
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit"> Login </button>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/Register"> Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
