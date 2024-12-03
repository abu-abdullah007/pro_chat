import { Request, Response, Router } from "express";
import { createProfileController, createRoomController, createUserController } from "../controllers/createController";
import { checkOneTimeTokenMiddleware } from "../middlewares/tokenValidateMiddleware";
import { fileUploadHandleMiddleware } from "../middlewares/fileUploadMiddleware";
import { loginController } from "../controllers/bdCheckController";
import { otpSendMidleware } from "../middlewares/otpSendMiddleware";
const chatRoutes = Router()

chatRoutes.post('/room', createRoomController)

chatRoutes.post('/user', createUserController)

chatRoutes.post('/profile', checkOneTimeTokenMiddleware, fileUploadHandleMiddleware, createProfileController)

chatRoutes.post('/login', loginController)

export default chatRoutes;