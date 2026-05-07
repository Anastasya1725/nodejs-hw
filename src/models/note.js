import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
