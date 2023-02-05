import { Document, model, Schema, Types } from "mongoose";
import { ERollType, IRoll } from "../interfaces";
import { collectionNames } from "./config";

const IRollSchema = new Schema({
  // type: {
  //   type: String,
  //   enum: Object.values(ERollType),
  //   required: true
  // },

  messageId: {
    type: String,
    unique: true
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
      },
      label: {
        type: String
      },
      rawResult: {
        type: Number,
        required: true
      }
    }
  }],

  author: {
    type: Types.ObjectId,
    ref: collectionNames.USER,
    required: true
  },

  game: {
    type: Types.ObjectId,
    ref: collectionNames.GAME,
    required: true
  }
}, { timestamps: true })

export default model<IRoll & Document>(collectionNames.ROLL, IRollSchema)