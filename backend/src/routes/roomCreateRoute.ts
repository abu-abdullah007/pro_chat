import { Router } from "express";
import { createRoomController, createUserController } from "../controllers/createController";
import { uploadFiles } from "../middlewares/fileUploadMiddleware";
const chatRoutes = Router()

chatRoutes.post('/room', createRoomController)

chatRoutes.post('/user', uploadFiles, createUserController)

export default chatRoutes;