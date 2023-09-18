import React, { useState } from "react";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
import { Card, Space, Row, Col } from 'antd';

import './app.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { database } from './../firebaseConfig';
import { useAuth } from './../main';

function RegisterAndLogin() {

    let navigate = useNavigate();
    let location = useLocation();

    const history = useNavigate();
    const [login, setLogin] = useState(false);
    let authStore = useAuth();

    const handleSubmit = (e, type) => {

        // ngan reload lai trang, submit form
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
       
        if (type == "signup") {
            // goi ham firebase tao user dang ky
            // goi api dang nhap, dang ku
            createUserWithEmailAndPassword(database, email, password)
                .then((data) => {
                    console.log(data, "authData");
                    // auth.signin()
                    //   history("/data");
                    alert('dang ki thanh cong!');
                })
                .catch((err) => {
                    console.log(err, "==========")
                    setLogin(true);
                });
        } else {
            // goi ham signin dang nhap
            signInWithEmailAndPassword(database, email, password)
                .then((data) => {
                    console.log(data, "authData");
                    authStore.signin(data, navigate("/", { replace: true }));
                })
                .catch((err) => {
                    console.log(err, "==========") 
                });
        }
    };

    const handleReset = () => {
        history("/reset");
    }

    return (
        <Row>
            <Col span={16}>

            </Col>

            <Col span={10}>
                <Space direction="vertical" size={16}>
                    <Card extra={<a href="#">More</a>}>
                        <div className="">
                            {/* Registration and login Screen */}
                            <div className="row">
                                <div
                                    className={login == false ? "activeColor" : "pointer"}
                                    onClick={() => setLogin(false)}
                                >
                                    SignUp
                                </div>
                                <div
                                    className={login == true ? "activeColor" : "pointer"}
                                    onClick={() => setLogin(true)}
                                >
                                    SignIn
                                </div>
                            </div>
                            <h1>{login ? "SignIn" : "SignUp"}</h1>
                            <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
                            
                                <input name="email" placeholder="Email" />
                                <br />
                                <input name="password" type="text" placeholder="Password" />
                                <br />
                                <p onClick={handleReset}>Forgot Password?</p>
                                <br />
                                <button>{login ? "SignIn" : "SignUp"}</button>
                            </form>
                        </div>
                    </Card>
                </Space>
            </Col>
        </Row>

    );
}

export default RegisterAndLogin;