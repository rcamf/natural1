import { Document, FilterQuery, MongooseQueryOptions, ProjectionType } from "mongoose";
import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { IRoll, IUser } from "../interfaces";
import rollModel from "../models/roll";

@Service()
export default class RollService {
  constructor(
    @Inject("logger") private logger: Logger
  ) { }

  public async findRolls(filter: FilterQuery<IRoll & Document>, projection: ProjectionType<IRoll & Document>, options: MongooseQueryOptions): Promise<Array<IRoll & Document>> {
    try {
      const rollDocs = await rollModel.find(filter, projection, options);
      return rollDocs;
    } catch (error) {
      this.logger.error("Error: %o", error);
    }
  }

  public async pushRolls(rolls: Array<IRoll>): Promise<Array<IRoll & Document>> {
    try {
      const rollDocs = await rollModel.create(rolls);
      return rollDocs;
    } catch (error) {
      this.logger.error("Error: %o", error);
    }
  }

  public async deleteRollById(rollId: string): Promise<boolean> {
    try {
      const result = await rollModel.deleteOne({ _id: rollId });
      return result.acknowledged;
    } catch (error) {
      this.logger.error("Error: %o", error);
    }
  }
}

