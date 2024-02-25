import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
      e.preventDefault();
      // console.log({  email, password });
      axios
          .post("http://localhost:3000/login", { email, password })
          .then((res) => {
            if(res.data.success) {
                   navigate("/dashboard");
            } else {
                navigate("/");
            }

           
          })
          // .catch((err) => console.log(err));
  };
  
    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="on"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Password"
                            autoComplete="on"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't Have an Account?</p>
                <button>Register</button>
            </div>
        </div>
    );
}
