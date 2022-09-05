import mongoose from "mongoose";
// import Campgrounds from "../../client/src/components/Campgrounds/Campgrounds.js";
import Campground from "../models/Campground.js";

export const getCampgrounds = async (req, res) => {
    const { page } = req.query;

    try {
        //Number of post per page
        const LIMIT = 9;

        //Get the starting index of every page
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await Campground.countDocuments({});

        const campgrounds = await Campground.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)
        // console.log(campgrounds)
        res.status(200).send({ data: campgrounds, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });  
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error.message });
    }
}
export const getCampgroundsBySearch = async (req, res) => {
    //Getting data from the query
    const { searchQuery } = req.query;
    try {
        //Conveerting title to regular expression
        const title = new RegExp(searchQuery, 'i') //i means ignore case

        //Searching the database for a campground
        const campgrounds = await Campground.find({ $or: [{title}]});

        res.send({ data: campgrounds });
    } catch (error) {
        console.log(error)
        res.status(404).send({ message: error.message });
    }
}
export const getCampground = async (req, res) => {
    const { id } = req.params;

    try {
        const campground = await Campground.findById(id);

        res.status(200).send(campground);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
// ...campground, creator: req.userId, createdAt: new Date().toISOString()}
export const createCampground = async (req, res) => {
    //Creating a new campground
    const newCampground = new Campground({ ...req.body, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        const createdCampground = await newCampground.save();

        console.log(createdCampground);

        res.status(201).send(createdCampground);

    } catch (error) {
        console.error(error);
        res.status(409).send({ message: error.message });
    }
}

export const updateCampground = async (req, res) => {
    const { id: _id } = req.params;
    const campground = req.body;

    //Checking if _id is a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No campground with that id');

    const updatedCampground = await Campground.findByIdAndUpdate(_id, { ...campground, _id }, { new: true })

    res.send(updatedCampground);
}

export const deleteCampground = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No campground with that id');

    await Campground.findByIdAndRemove(id);

    res.send({ message: 'campground deleted successfully' });
}

export const likeCampground = async (req, res) => {
    const { id } = req.params;

    //Check if a user is authenticated
    if (!req.userId) {
        return res.send({ message: 'unauthenticated' })
    }

    //Checking if the actual campground is present
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('No campground with that id');
    }

    const campground = await Campground.findById(id);

    //Checking if the user's id is already in the like section
    const index = campground.likes.findIndex((id) => id === String(req.userId));

    //If the user wants to
    if (index === -1) {
        campground.likes.push(req.userId);
    } else {
        campground.likes = campground.likes.filter((id) => id !== String(req.userId));
    }

    const updatedCampground = await Campground.findByIdAndUpdate(id, campground, { new: true })

    res.send(updatedCampground);
}

export const commentCampground = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    //Fetching a campground
    const campground = await Campground.findById(id);

    //Pushing the content of our comment into the campground
    campground.comments.push(value);

    //Updating the database as well
    const updatedCampground = await Campground.findByIdAndUpdate(id, campground, { new: true });

    res.send(updatedCampground);

}