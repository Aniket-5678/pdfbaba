import express from "express";
import { requireSignIn, isAdmin } from "../middlewear/authmiddlewear.js";
import builderUpload from "../middlewear/builderUpload.js";
import { mySites, createSite, updateSite, deleteSite, publicSite, uploadImage, submitDeveloperRequest, adminRequests, updateRequestStatus } from "../controllers/builderController.js";

const router = express.Router();
router.get("/public/:slug", publicSite);
router.get("/mine", requireSignIn, mySites);
router.post("/sites", requireSignIn, createSite);
router.put("/sites/:id", requireSignIn, updateSite);
router.delete("/sites/:id", requireSignIn, deleteSite);
router.post("/upload", requireSignIn, builderUpload, uploadImage);
router.post("/connect", requireSignIn, submitDeveloperRequest);
router.get("/admin/requests", requireSignIn, isAdmin, adminRequests);
router.patch("/admin/requests/:id", requireSignIn, isAdmin, updateRequestStatus);
export default router;
