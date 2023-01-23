import { Document, FilterQuery, MongooseQueryOptions, ProjectionType } from "mongoose";
import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { IGameInputDTO, IGame } from "../interfaces";
import gameModel from "../models/game";

@Service()
export default class GameService {
  constructor(
    @Inject("logger") private logger: Logger
  ) { }

  public async createGame(newGame: IGameInputDTO): Promise<{ game: IGame }> {
    try {
      const gameDoc = await gameModel.create(newGame);
      const game = gameDoc.toObject<IGame>();
      return { game }
    } catch (error) {
      this.logger.error("Error: %o", error);
    }
  }

  public async findGames(filter: FilterQuery<IGame>, projection: ProjectionType<IGame>, options: MongooseQueryOptions): Promise<Array<IGame & Document>> {
    try {
      const gameDocs = await gameModel.find(filter, projection, options);
      return gameDocs;
    } catch (error) {
      this.logger.error("Error: %o", error);
    }
  }

  public async deleteGameById(gameId: string): Promise<boolean> {
    try {
      const result = await gameModel.deleteOne({ _id: gameId });
      return result.acknowledged;
    } catch (error) {
      this.logger.error("Error: %o", error);
    }
  }
}