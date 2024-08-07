import { Router } from "express";
import { userAuth } from "./userAuth.routes";

const router = Router();

router.use('/userAuth', userAuth);

export { router }