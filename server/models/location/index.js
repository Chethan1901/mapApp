import mongoose from "mongoose";

let LocationSchema = new mongoose.Schema({
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
                type: Date,
                required: true
            },
            isAdded: {
                type: Boolean,
                default: false
            }
        }
    ]
})

export default mongoose.model("Location", LocationSchema, "userLocation");