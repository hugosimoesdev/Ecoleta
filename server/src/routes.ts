import express from "express";
import knex from "./database/connection";

const routes = express.Router();

routes.get("/items", async (request, response) => {
  // listando todos os items
  const items = await knex("items").select("*");

  const serializedItems = items.map((item) => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return response.json(serializedItems);
});

routes.post("/", async (request, response) => {
  const { name, email, whatsapp, latitude, longitude, city, uf, items } =
    request.body;

  // Evita que uma query seja executada e a outra não por algum erro.
  const trx = await knex.transaction();
  
  const insertedIds = await trx("points").insert({
    image: "image-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  // criando relacionamento
  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id
    };
  });

  await trx("points_items").insert(pointItems);

  return response.json({ sucess: true });
});

export default routes;
