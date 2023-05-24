import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body;

    // Evita que uma query seja executada e a outra não por algum erro.
    const trx = await knex.transaction();

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    // criando relacionamento
    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("points_items").insert(pointItems);

    return response.json({ 
      id: point_id,
      ...point,
     });
  }
}

export default PointsController;
