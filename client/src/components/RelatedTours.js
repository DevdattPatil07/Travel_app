import React from "react";
import { excerpt } from "../utility";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const RelatedTours = ({ relatedTours, tourId }) => {
    return (
        <>
            {relatedTours && relatedTours.length > 0 && (
                <>
                    {relatedTours && relatedTours.length > 1 && (
                        <h4>Related Tours</h4>
                    )}
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                        {relatedTours
                            .filter((item) => item._id !== tourId)
                            .splice(0, 3)
                            .map((item, index) => (
                                <MDBCol key={index}>
                                    <MDBCard>
                                        <Link to={`/tour/${item._id}`}>
                                            <MDBCardImage
                                                src={item.imageFile}
                                                alt={item.title}
                                                position="top"
                                            />
                                        </Link>
                                        <span className="text-start tag-card">
                                            {item.tags.map((tag) => (
                                                <Link
                                                    key={tag}
                                                    to={`/tours/tag/${tag}`}
                                                >
                                                    {" "}
                                                    #{tag}
                                                </Link>
                                            ))}
                                        </span>
                                        <Link
                                            to={`/tour/${item._id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <MDBCardBody>
                                                <MDBCardTitle className="text-start">
                                                    {item.title}
                                                </MDBCardTitle>
                                                <MDBCardText className="text-start">
                                                    {excerpt(
                                                        item.description,
                                                        45
                                                    )}
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </Link>
                                    </MDBCard>
                                </MDBCol>
                            ))}
                    </MDBRow>
                </>
            )}
        </>
    );
};

export default RelatedTours;
