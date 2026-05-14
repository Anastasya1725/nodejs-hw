import createHttpError from "http-errors";
import Note from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const {
    tag,
    search,
    page = 1,
    perPage = 10
  } = req.query;

  const limit = parseInt(perPage);
  const skip = (parseInt(page) - 1) * limit;

 const notesQuery = Note.find();

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  if (search) {
  notesQuery.or([
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ]);
  }

const [totalNotes, notes] = await Promise.all([
    Note.countDocuments(notesQuery.getFilter()), 
    notesQuery.skip(skip).limit(limit).exec()
]);

  const totalPages = Math.ceil(totalNotes / limit);

  res.status(200).json({
    page: parseInt(page),
    perPage: limit,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;


  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: "after",
  });

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  res.status(200).json(note);
};
