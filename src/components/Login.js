import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router";
import schema from "./loginValidation";
import * as yup from "yup";

const blankData = {
    username: "",
    password: "",
};
const errorStrings = {
    username: "",
    password: "",
};

function Login(rest)
{
    const { setLoggedIn , setIsOrganizer } = rest
    const [userData, setUserData] = useState(blankData);
    const [formErrors, setFormErrors] = useState(errorStrings);
    const [disabled, setDisabled] = useState(true);
    // const [userList, setUserList] = useState([]);
    let history = useHistory();

    const change = (evt) =>
    {
        const { name, value } = evt.target;
        validate(name, value);
        setUserData({ ...userData, [name]: value });
    };

    const submit = (evt) =>
    {
        evt.preventDefault();
        axiosWithAuth()
            .post("/api/auth/login", userData)
            .then((res) =>
            {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("organizer", true);
                setLoggedIn(true)
                setIsOrganizer(true)
                setUserData(blankData)
                history.push("/events");
            })
    };

    // const addUser = () => {
    //   setUserList([...userList, userData]);
    // };

    // useEffect(() => {

    // }, [userList]);

    const validate = (name, value) =>
    {
        yup
            .reach(schema, name)
            .validate(value)
            .then((valid) =>
            {
                setFormErrors({
                    ...formErrors,
                    [name]: "",
                });
                setDisabled(false)
            })

            .catch((err) =>
            {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                });
                setDisabled(true)
            });
    };

    // useEffect(() =>
    // {
    //     schema.isValid(userData).then((valid) =>
    //     {
    //         setDisabled(!valid);
    //     });
    // }, [userData]);

    return (
        <>
            <div className="formBG">
                <div className="loginBox">
                    <div className="mainForm">
                        <h2>Login</h2>
                        <form onSubmit={submit}>
                            <div className="item">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={userData.username}
                                    onChange={change}
                                />
                            </div>
                            <p className="errorMsg">{formErrors.username}</p>
                            <div className="item">
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={userData.password}
                                    onChange={change}
                                />
                            </div>
                            <p className="errorMsg">{formErrors.password}</p>
                            <div className="itemSub">
                                <button id="subutton"disabled={disabled}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login 