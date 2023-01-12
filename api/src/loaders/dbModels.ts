const gameModel = { name: "gameModel", model: require("../models/game").default }
const rollModel = { name: "rollModel", model: require("../models/user").default }
const userModel = { name: "userModel", model: require("../models/user").default }

export const models = [
  gameModel,
  rollModel,
  userModel
]