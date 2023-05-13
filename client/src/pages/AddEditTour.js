import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
    MDBTextArea,
    MDBValidationItem,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initiaState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditTour = () => {
    const [tourData, setTourData] = useState(initiaState);
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const { title, description, tags } = tourData;
    const { id } = useParams();

    const { error, userTours } = useSelector((state) => ({
        ...state.tour,
    }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const singleTour = userTours.find((tour) => tour._id === id);
            setTourData({ ...singleTour });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tags.length) {
            setTagErrMsg("Please Provide Tags");
        }
        if (title && description && tags.length) {
            const updatedTourData = { ...tourData, name: user?.result?.name };

            if (!id) {
                dispatch(createTour({ updatedTourData, navigate, toast }));
            } else {
                dispatch(updateTour({ id, updatedTourData, toast, navigate }));
            }
            handleClear();
        }
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setTourData({ ...tourData, [name]: value });
    };
    const handleAddTag = (tag) => {
        setTourData({ ...tourData, tags: [...tourData.tags, tag] });
    };
    const handleDeleteTag = (deleteTag) => {
        setTourData({
            ...tourData,
            tags: tourData.tags.filter((tag) => tag !== deleteTag),
        });
    };
    const handleClear = () => {
        setTourData({ title: "", description: "", tags: [] });
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
            className="container"
        >
            <MDBCard alignment="center">
                <h5 className="mt-2">{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className="row g-3"
                        noValidate
                    >
                        <MDBValidationItem
                            feedback="Please Provide Title"
                            className="col-md-12"
                            invalid
                        >
                            <MDBInput
                                type="text"
                                label="Enter Title"
                                value={title || ""}
                                name="title"
                                onChange={onInputChange}
                                className="form-control"
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback="Please Provide Description"
                            className="col-md-12"
                            invalid
                        >
                            <MDBTextArea
                                style={{ height: "100px" }}
                                type="textarea"
                                label="Enter Description"
                                value={description}
                                name="description"
                                onChange={onInputChange}
                                className="form-control"
                                required
                            />
                        </MDBValidationItem>

                        <div className="col-md-12">
                            <ChipInput
                                allowDuplicates={false}
                                required
                                name="tags"
                                variant="filled"
                                label="Enter Tag"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {tagErrMsg && (
                                <div className="tagErrMsg">{tagErrMsg}</div>
                            )}
                        </div>
                        <div className="d-flex flex-column row justify-content-content-start">
                            <p
                                style={{
                                    textAlign: "start",
                                    marginTop: "10px",
                                }}
                            >
                                Select Photo
                            </p>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setTourData({
                                        ...tourData,
                                        imageFile: base64,
                                    })
                                }
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                {id ? "Update" : "Submit"}
                            </MDBBtn>
                            <MDBBtn
                                style={{ width: "100%" }}
                                className="mt-2"
                                color="danger"
                                onClick={handleClear}
                            >
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditTour;
