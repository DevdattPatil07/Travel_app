import express from "express";
import {
    createTour,
    getTours,
    getTour,
    getToursByUsers,
    deleteTour,
    updateTour,
    getToursBySearch,
    getToursByTag,
    getRelatedTours,
    likeTour,
} from "../Controllers/tour.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);
router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTour);

router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth, getToursByUsers);
router.patch("/like/:id", auth, likeTour);

export default router;
