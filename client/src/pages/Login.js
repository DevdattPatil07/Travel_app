import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBSpinner,
    MDBIcon,
    MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, googleSignIn } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const googleSuccess = (response) => {
        const result = {
            jwtToken: response.credential,
        };
        dispatch(googleSignIn({ result, navigate, toast }));
    };
    const googleFailure = (error) => {
        toast.error(error);
    };
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px",
            }}
        >
            <MDBCard alignment="center" style={{ paddingTop: "10px" }}>
                <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        noValidate
                        className="row g-3"
                    >
                        <MDBValidationItem
                            feedback="Please provide your email"
                            invalid
                            className="col-md-12"
                        >
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback="Please provide your password"
                            invalid
                            className="col-md-12"
                        >
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                            />
                        </MDBValidationItem>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br />
                    <GoogleLogin
                        style={{ width: "100%" }}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account? Sign up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
};

export default Login;
