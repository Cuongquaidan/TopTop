const router = require("express").Router();
const LikePostController = require("../controllers/LikePostController");


router.post("/click", LikePostController.handleClick);
router.get("/user/:userId", LikePostController.getLikesByUserId);


module.exports = router;