import { Document, model, Schema, Types } from "mongoose";
import { IRoll } from "../interfaces";
import { collectionNames } from "./config";

const IRollSchema = new Schema({
  formula: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: Object.values(ERollType),
    required: true
  },

  playerId: String,

  playerName: String,

  description: String,

  individualRolls: [{
    type: {
      result: {
        type: Number,
        required: true
      },
      formula: {
        type: String,
        required: true
      }
    }
  }],

  result: {
    type: Number,
    required: true
  },

  author: {
    type: Types.ObjectId,
    ref: collectionNames.USER,
    required: true
  }
}, { timestamps: true })

export default model<IRoll & Document>(collectionNames.ROLL, IRollSchema)