import express from "express";
import ItemsController from "./controllers/items_controller";
import PointsController from "./controllers/points_controller";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// listar items de coleta
routes.get("/items", itemsController.index);

// cadastro de ponto de coleta
routes.post("/", pointsController.create);

export default routes;
