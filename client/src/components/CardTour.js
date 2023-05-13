import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

const CardTour = ({
    imageFile,
    description,
    title,
    tags,
    _id,
    name,
    likes,
}) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id;

    const dispatch = useDispatch();

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip
                            tag="a"
                            title={`You and ${
                                likes.length - 1
                            } other people likes`}
                        >
                            {likes.length} Likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} Like${likes.length > 1 ? "s" : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon="thumbs-up" />
                    &nbsp;{likes.length}
                    {likes.length === 1 ? " Like" : " Likes"}
                </>
            );
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        );
    };

    const handleLike = () => {
        dispatch(likeTour({ id: _id }));
    };

    return (
        <MDBCardGroup>
            <MDBCard
                className="h-100 mt-2 d-sm-flex"
                style={{ maxWidth: "20rem" }}
            >
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position="top"
                    style={{ maxWidth: "100%", height: "180px" }}
                />
                <div className="top-left">{name}</div>
                <span className="text-start tag-card">
                    {tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`} key={tag}>
                            #{tag}{" "}
                        </Link>
                    ))}
                    <MDBBtn
                        style={{ float: "right", marginRight: "4px" }}
                        color="tertiary"
                        size="lg"
                        onClick={!user?.result ? null : handleLike}
                    >
                        {!user?.result ? (
                            <MDBTooltip
                                title="Please login to like tour"
                                tag="a"
                            >
                                <Likes
                                    onClick={!user?.result ? null : handleLike}
                                />
                            </MDBTooltip>
                        ) : (
                            <Likes />
                        )}
                    </MDBBtn>
                </span>
                <MDBCardBody className="p-3">
                    <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                    <MDBCardText className="text-start">
                        {excerpt(description, 45)}
                        <Link to={`/tour/${_id}`}>
                            <MDBBtn block size="sm" color="info">
                                Read More
                            </MDBBtn>
                        </Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
};

export default CardTour;
