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
      required: false,
      default: '',
      trim: true
    },
    tag: {
     type: String,
    required: false,
    default: 'Todo',
    trim: true,
    enum: ['Todo', 'In Progress', 'Done', 'Archive']
    }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
