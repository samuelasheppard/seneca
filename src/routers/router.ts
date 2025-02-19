import { Router } from "express";
import addCourseSession from "../controllers/addCourseSession";
import validateParams from "../middleware/validateParams";
import getCourseStats from "../controllers/getCourseStats";
import getSessionStats from "../controllers/getSessionStats";

const router = Router();

//to do make midleware to extract userId in header?
router.post("/courses/:courseId", validateParams, addCourseSession);

router.get("/courses/:courseId", validateParams, getCourseStats);
router.get(
  "/courses/:courseId/sessions/:sessionId",
  validateParams,
  getSessionStats
);

export default router;
