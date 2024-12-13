//import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
//import { useAuth } from "../../hooks/useAuth";
import { useRef, useState, useEffect } from "react";
//import { useMutation } from "react-query";
//import { RegisterForm, AuthResponse, register } from "../../interfaces/auth";
import UploadButton from "./UploadImageButton";
import "../../../css/form.css";
import { Video } from "../../interfaces/video";

const UploadVideo = () => {
  const formRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Video>({} as Video);
  const navigate = useNavigate();

  // const mutation = useMutation<AuthResponse, Error, RegisterForm>(register, {
  //   onSuccess: (data) => {
  //     toast.success(data.message);
  //     navigate("/");
  //   },
  //   onError: (error) => {
  //     const errorMessage =
  //       isAxiosError(error) && error.response
  //         ? error.response?.data?.message
  //         : "Something went wrong";
  //     toast.error(errorMessage);
  //   },
  // });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }
  function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    //mutation.mutate(form);
  }
  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.focus();
  }, []);
  return (
    <div className="wrapper">
      <h1>Add New Video</h1>
      <form onSubmit={onSubmit}>
        <div className="layout">
          <div className="input-box">
            <div>Video Title: </div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={onChange}
            />
          </div>
          <div className="input-box">
            <div>Video Link: </div>
            <input type="text" />
          </div>
          <div className="input-box">
            <div>Duration: </div>
            <input type="text" />
          </div>
          <div className="input-box">
            <div>Channel Name: </div>
            <input type="text" />
          </div>
          <div className="input-box">
            <div>Channel Link: </div>
            <input type="text" />
          </div>
          <div className="input-box">
            <div>Stats: </div>
            <input type="text" />
          </div>
          <div className="input-box">
            <div>Keyword: </div>
            <input type="text" />
          </div>
        </div>
        <div>Thumbnail: </div>
        <UploadButton />
        <div>Channel Avatar: </div>
        <UploadButton />
        <button className="submit-btn" type="submit">
          Confirm
        </button>
        <p> </p>
        <button className="submit-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
