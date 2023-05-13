import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn,
} from "mdb-react-ui-kit";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTours";

const SingleTour = () => {
    const dispatch = useDispatch();
    const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
    const { id } = useParams();
    const navigate = useNavigate();
    const tags = tour?.tags;

    useEffect(() => {
        if (id) {
            dispatch(getTour(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        tags && dispatch(getRelatedTours(tags));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);

    return (
        <>
            <MDBContainer className="mt-5">
                <MDBCard className="mb-3 mt-5">
                    <MDBCardImage
                        className="mt-4"
                        position="top"
                        style={{ width: "100%", maxHeight: "600px" }}
                        src={tour.imageFile}
                        alt={tour.title}
                    />
                    <MDBCardBody>
                        <MDBBtn
                            tag="a"
                            color="none"
                            style={{ float: "left", color: "#000" }}
                            onClick={() => navigate("/")}
                        >
                            <MDBIcon
                                fas
                                size="lg"
                                icon="long-arrow-alt-left"
                                style={{ float: "left" }}
                            />
                            <MDBIcon
                                fas
                                size="lg"
                                icon="home"
                                style={{ float: "left", marginLeft: "5px" }}
                            />
                        </MDBBtn>
                        <h3>{tour.title}</h3>
                        <span>
                            <p className="text-start tourName">
                                Created by: {tour.name}
                            </p>
                        </span>
                        <div style={{ float: "left" }}>
                            <MDBIcon fas icon="tags" className="m-2" />

                            <span className="text-start">
                                {tour &&
                                    tour.tags &&
                                    tour.tags.map((tag) => (
                                        <Link
                                            to={`/tours/tag/${tag}`}
                                            key={tag}
                                        >
                                            #{tag}{" "}
                                        </Link>
                                    ))}
                            </span>
                        </div>
                        <br />
                        <MDBCardText className="text-start mt-2">
                            <MDBIcon
                                far
                                icon="calendar-alt"
                                size="lg"
                                className="m-2"
                            />
                            <small className="text-muted">
                                {moment(tour.createdAt).fromNow()}
                            </small>
                        </MDBCardText>
                        <MDBCardText className="lead mb-0 text-start">
                            {tour.description}
                        </MDBCardText>
                    </MDBCardBody>
                    <RelatedTours relatedTours={relatedTours} tourId={id} />
                </MDBCard>
            </MDBContainer>
        </>
    );
};

export default SingleTour;
