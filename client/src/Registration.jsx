import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, password });
        axios
            .post("http://localhost:3000/register", { name, email, password })
            .then((res) => {
                console.log(res.data);
                navigate("/login");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
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
                            autoComplete="off"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>Already Have an Account?</p>
                <button>Login</button>
            </div>
        </div>
    );
}
