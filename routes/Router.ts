import { Router } from "express";
import { userAuth } from "./userAuth.routes";
import { adminPaths } from "./AdminPaths";

const router = Router();

router.use('/userAuth', userAuth);
router.use('/adminPaths', adminPaths)

export { router }