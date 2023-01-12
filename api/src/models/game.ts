import { Document, model, Schema, Types } from "mongoose";
import { IGame } from "../interfaces";
import { collectionNames } from "./config";

const IGameSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  owner: {
    type: Types.ObjectId,
    ref: collectionNames.USER,
    required: true
  },

  members: [{
    type: Types.ObjectId,
    ref: collectionNames.USER
  }],

  rolls: [{
    type: Types.ObjectId,
    ref: collectionNames.ROLL
  }]
}, { timestamps: true })

export default model<IGame & Document>(collectionNames.GAME, IGameSchema)