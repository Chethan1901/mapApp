import mongoose from "mongoose";

let locationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    location: [
        {
            name: {
                type: String,
                required: true
            },
            locationName: {
                type: String,
                required: true
            },
            isAdded: {
                type: Boolean,
                default: false
            }
        }
    ]
})

export default mongoose.model("Location", locationSchema, "userLocation");