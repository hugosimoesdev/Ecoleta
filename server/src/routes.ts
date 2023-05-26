import express from "express";
import ItemsController from "./controllers/items_controller";
import PointsController from "./controllers/points_controller";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// listar items de coleta
routes.get("/items", itemsController.index);

// cadastro de ponto de coleta
routes.post("/points", pointsController.create);

// listar ponto de coleta específico
routes.get("/points/:id", pointsController.show);

// filtrar por items
routes.get("/points", pointsController.index);

export default routes;
