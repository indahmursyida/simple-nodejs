/**
 * src/controllers/order.controller.ts
 */
import { Request, Response } from "express";

import {
  create,
  findAll
} from "../services/order.service";
import { IPaginationQuery } from "../utils/interfaces";
import { IRequestWithUser } from "../middlewares/auth.middleware";
import { ObjectId } from "mongoose";

export default {
  async create(req: IRequestWithUser, res: Response) {
    /**
     #swagger.tags = ['Orders']
     #swagger.security = [{
      "bearerAuth": []
     }]
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/OrderCreateRequest"
      }
     }
     */
    try {
      const userId = req.user?.id as unknown as ObjectId;
      req.body.createdBy = userId;
      const result = await create(req.body);
      res.status(201).json({
        data: result,
        message: "Success create order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create order",
      });
    }
  },
  async findAll(req: IRequestWithUser, res: Response) {
    /**
     #swagger.tags = ['Orders']
     */
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query = {};

      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i" },
        });
      }
      const userId = req.user?.id as unknown as ObjectId;
      const result = await findAll(userId, limit, page);
      res.status(200).json({
        data: result,
        message: "Success get all orders",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all orders",
      });
    }
  }
};
