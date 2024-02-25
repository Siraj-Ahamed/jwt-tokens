import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import StudentModel from "./models/student.model.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);

dotenv.config();

mongoose
    .connect("mongodb://localhost:27017/school")
    .then(() => {
        console.log("Connectet to database");
    })
    .catch((err) => {
        console.log(err);
        console.log("Connection failed!");
    });
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    StudentModel.create({ name, email, password })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    StudentModel.findOne({ email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    const accessToken = jwt.sign(
                        { email: email },
                        process.env.JWT_SECRET_ACCESS,
                        { expiresIn: "1m" }
                    );

                    const refreshToken = jwt.sign(
                        { email: email },
                        process.env.JWT_SECRET_REFRESH,
                        { expiresIn: "5m" }
                    );

                    res.cookie("accessToken", accessToken, { maxAge: 60000 });

                    res.cookie("refreshToken", refreshToken, {
                        maxAge: 60000,
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                    });
                    // console.log("success");
                    res.json({ success: true, message: "Login Successful" });
                } else {
                    return res.json({
                        success: false,
                        message: "Incorrect password",
                    });
                }
            } else {
                return res.json({ success: false, message: "No user found" });
            }
        })
        .catch((err) => res.json(err));
});

const verifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
    } else {
        jwt.verify(accesstoken, JWT_SECRET_ACCESS, (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                res.email = decoded.email;
                next();
            }
        });
    }
};

const renewToken = (req, res) => {
    const refreshtoken = req.cookie.refreshToken;
    if (!refreshtoken) {
        return res.json({ valid: false, message: "No Refresh token" });
    } else {
        jwt.verify(refreshtoken, JWT_SECRET_REFRESH, (err, decoded) => {
            if (err) {
                return res.json({
                    valid: false,
                    message: "Invalid Refresh Token",
                });
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

app.get("/dashboard", (req, res) => {
    return res.json({ valid: true, message: "authorized" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
