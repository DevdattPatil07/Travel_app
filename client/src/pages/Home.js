import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const { tours, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.tour,
        })
    );
    const dispatch = useDispatch();

    const query = useQuery();
    const serachQuery = query.get("searchQuery");
    const location = useLocation();

    useEffect(() => {
        dispatch(getTours(currentPage));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
        >
            <MDBRow className="mt-5">
                {tours.length === 0 && location.pathname === "/" && (
                    <MDBTypography className="text-center mb-0 mt-5" tag="h2">
                        No Tours Found
                    </MDBTypography>
                )}
                {tours.length === 0 && location.pathname !== "/" && (
                    <MDBTypography className="text-center mb-0 mt-5" tag="h2">
                        We couden't find any match for "{serachQuery}"
                    </MDBTypography>
                )}
                {tours.length > 0 && (
                    <MDBCol>
                        <MDBContainer>
                            <MDBRow className="row-col-1 row-cols-md-3 g-2">
                                {tours &&
                                    tours.map((item) => (
                                        <CardTour key={item._id} {...item} />
                                    ))}
                            </MDBRow>
                        </MDBContainer>
                    </MDBCol>
                )}
            </MDBRow>
            {tours.length > 0 && (
                <Pagination
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    dispatch={dispatch}
                />
            )}
        </div>
    );
};

export default Home;
