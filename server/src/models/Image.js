import mongoose from "mongoose";

const imageSchema= new mongoose.Schema(
    {
        fileUrl:{
            type: String,
            required: true
        },
        fileName:{
            type: String,
            required: true
        }
    }
);

const model = mongoose.model("Image", imageSchema);
export default model;
