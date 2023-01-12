import mongoose, { Document, model, mongo, Schema } from "mongoose";
import { IUser } from "../interfaces";
import { collectionNames } from "./config";

const IUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  },

  email: {
    type: String,
    required: true,
    index: true
  },

  displayName: {
    type: String,
    default: ""
  },

  password: {
    type: String,
    required: true
  },

  salt: {
    type: String,
    required: true
  },

  games: [{
    type: mongoose.Types.ObjectId,
    ref: collectionNames.GAME
  }],

  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default model<IUser & Document>(collectionNames.USER, IUserSchema);