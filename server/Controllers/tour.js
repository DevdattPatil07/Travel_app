import mongoose from "mongoose";
import TourModel from "../Models/tour.js";

export const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new TourModel({
        ...tour,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    try {
        await newTour.save();
        res.status(200).json(newTour);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
        error: error;
    }
};

export const getTours = async (req, res) => {
    const { page } = req.query;
    try {
        // const tours = await TourModel.find();
        // res.status(200).json(tours);
        const limit = 6;
        const startIndex = (Number(page) - 1) * limit;
        const total = await TourModel.countDocuments({});
        const tours = await TourModel.find().limit(limit).skip(startIndex);
        res.json({
            data: tours,
            currentPage: Number(page),
            totalTours: total,
            numberOfPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(404).json({
            message: "Cannot get tours, Something went wrong",
            error: error.message,
        });
    }
};

export const getTour = async (req, res) => {
    const { id } = req.params;
    try {
        const tour = await TourModel.findById(id);
        res.status(200).json(tour);
    } catch (error) {
        res.status(404).json({
            message: "Cannot get tour, Something went wrong",
            error: error,
        });
    }
};

export const getToursByUsers = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json("User does not exist");
        }
        const userTours = await TourModel.find({ creator: id });
        res.status(200).json(userTours);
    } catch (error) {
        res.status(404).json({
            message: "Cannot get tours, Something went wrong",
            error: error,
        });
    }
};

export const deleteTour = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No tour exist with id: ${id}` });
        }
        await TourModel.findByIdAndDelete(id);
        res.json({ message: "Tour deleted successfilly" });
    } catch (error) {
        res.status(404).json({
            message: "Can not Delete tour, Something went wrong",
            error: error,
        });
    }
};

export const updateTour = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No tour exist with id: ${id}` });
        }

        const updatedTour = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id: id,
        };

        await TourModel.findByIdAndUpdate(id, updatedTour, { new: true });
        res.json(updatedTour);
    } catch (error) {
        res.status(404).json({
            message: "Can not Delete tour, Something went wrong",
            error: error,
        });
    }
};

export const getToursBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const tours = await TourModel.find({ title });
        res.json(tours);
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error: error,
        });
    }
};

export const getToursByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const tours = await TourModel.find({ tags: { $in: tag } });
        res.json(tours);
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error: error,
        });
    }
};

export const getRelatedTours = async (req, res) => {
    const tags = req.body;
    try {
        const tours = await TourModel.find({ tags: { $in: tags } });
        res.json(tours);
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error: error,
        });
    }
};

export const likeTour = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "User is not authenticated" });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No tour exist with id: ${id}` });
        }

        const tour = await TourModel.findById(id);

        const index = tour.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            tour.likes.push(req.userId);
        } else {
            tour.likes = tour.likes.filter((id) => id !== String(req.userId));
        }

        const updatedTour = await TourModel.findByIdAndUpdate(id, tour, {
            new: true,
        });

        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
