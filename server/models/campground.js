import mongoose from 'mongoose';

const campgroundSchema = mongoose.Schema({
    name: String,
    creator: String,
    title: String,
    location: String,
    campgroundPrice: Number,
    description: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: { type: [String], default: []},
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Campground = mongoose.model('Campground', campgroundSchema);

export default Campground;