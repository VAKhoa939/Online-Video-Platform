import "../../../css/form.css";
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AuthResponse, register, RegisterForm } from "../../interfaces/auth";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage = () => {
  const formRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<RegisterForm>({} as RegisterForm);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation<AuthResponse, Error, RegisterForm>(register, {
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
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            name="userName"
            ref={formRef}
            value={form.userName}
            onChange={onChange}
            placeholder="User name"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="email"
            ref={formRef}
            value={form.email}
            onChange={onChange}
            placeholder="E-mail"
            required
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
          />
          <FaLock className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="confirmPassword"
            ref={formRef}
            value={form.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            required
          />
          <FaLock className="icon" />
        </div>

        <button type="submit"> Register </button>
        <div className="register-link">
          <p>
            Already have an account? <Link to="/Login"> Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
