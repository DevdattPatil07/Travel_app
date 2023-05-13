import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { toast } from "react-toastify";

const Header = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state.auth }));
    const token = user?.token;

    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            toast.warning("Session Expired, Please Log in again");
            dispatch(setLogout());
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length) {
            dispatch(searchTours(search));
            navigate(`/tours/search?searchQuery=${search}`);
            setSearch("");
        } else {
            dispatch(searchTours(search));
            setSearch("");
            navigate("/");
        }
    };

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <MDBNavbar
            fixed="top"
            expand="lg"
            style={{ backgroundColor: "#f0e6ea" }}
        >
            <MDBContainer>
                <MDBNavbarBrand
                    href="/"
                    style={{
                        color: "#606080",
                        fontWeight: "600",
                        fontSize: "22px",
                    }}
                >
                    Tripito
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShow(!show)}
                    style={{ color: "#606080" }}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav
                        right
                        fullWidth={false}
                        className="mb-2 mb-lg-0"
                    >
                        {user?.result?._id && (
                            <h5
                                style={{
                                    marginRight: "30px",
                                    marginTop: "27px",
                                }}
                            >
                                Logged in as: {user?.result?.name}
                            </h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addTour">
                                        <p className="header-text">Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/dashboard">
                                        <p className="header-text">Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <p
                                            className="header-text"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/login">
                                        <p className="header-text">Login</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                    </MDBNavbarNav>
                    <form
                        className="d-flex input-group w-auto"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Tour"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            style={{
                                marginLeft: "5px",
                                border: "none",
                                background: "none",
                            }}
                        >
                            <MDBIcon fas icon="search" />
                        </button>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;
