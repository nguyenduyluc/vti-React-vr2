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
import { Card, Space, Row, Col } from "antd";

import "./app.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { database } from "./../firebaseConfig";
import { useAuth } from "./../main";
import { AccoutCreateApi , loginApi} from "../environtment";
import { useRef } from "react";
import axios from "axios";

function RegisterAndLogin() {
  let navigate = useNavigate();
  let location = useLocation();

  const history = useNavigate();
  const [login, setLogin] = useState(true);
  let authStore = useAuth();
  const displayButton = login == false ? "" : "displayLogin";

  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);
  const inputRefUsername = useRef(null);
  const inputRefRole = useRef(null);
  const inputRefAddress = useRef(null);
  const inputRefPhoneNumber = useRef(null);

  const handleSubmit = async (e, type) => {
    // ngan reload lai trang, submit form

    const dataAccount = {
      email: e.target.email.value,
      password: e.target.password.value,
      username: e.target.username.value,
      role: e.target.role.value,
      address: e.target.address.value,
      phoneNumber: e.target.phoneNumber.value,
    };

    const dataLogin = {
        username: e.target.username.value,
        password: e.target.password.value,
    }
    e.preventDefault();

    if (type == "signup") {
      await axios
        .post(AccoutCreateApi, dataAccount)

        // goi ham firebase tao user dang ky
        // goi api dang nhap, dang ku
        .then((data) => {
          // auth.signin()
          //   history("/data");
          alert("dang ki thanh cong!");
           setLogin(true);
        })
        .catch((err) => {
         
        });
    } else {
      // goi ham signin dang nhap
      await axios
        .post(loginApi, dataLogin)

        .then((data) => {
           
          authStore.signin(data, navigate("/", { replace: true }));
        })

        .catch((err) => {});
    }
  };

  const handleReset = () => {
    history("/reset");
  };

  return (
    <Row>
      <Col span={16}></Col>

      <Col span={10}>
        <Space direction="vertical" size={16}>
          <Card extra={<a href="#">More</a>}>
            <div className="">
              {/* Registration and login Screen */}
              <div className="row">
                <div className={displayButton}>Tạo Account moi</div>
                <div  className={login == true ? "" : "displayLogin"}>Đăng nhập</div>
              </div>
              <h1>{login ? "SignIn" : "SignUp"}</h1>
              <form
                onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}
              >
                <input name="email" placeholder="Email"  className={displayButton}
                ref={inputRefEmail} />
                <br />


                <input
                  name="username"
                  placeholder="username"
                  ref={inputRefUsername}
                />
                <br />

                <input
                  name="password"
                  type="text"
                  placeholder="Password"
                  ref={inputRefPassword}
                />
                <br />
                <input
                  className={displayButton}
                  name="role"
                  placeholder="role"
                  ref={inputRefRole}
                />
                <br />
                <input
                  className={displayButton}
                  name="address"
                  placeholder="address"
                  ref={inputRefAddress}
                />
                <br />
                <input
                  className={displayButton}
                  name="phoneNumber"
                  placeholder="phoneNumber"
                  ref={inputRefPhoneNumber}
                />
                <br />
                <button className={displayButton}>Đăng ký</button>
                <p onClick={handleReset}>Forgot Password?</p>
                <br />
                  <button onClick={() => setLogin(true)}>SignIn</button>
              </form>
            
              <button
                onClick={() => setLogin(false)}
                className={login == true ? "" : "displayLogin"}
              >
                Signup
              </button>
            </div>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}

export default RegisterAndLogin;
