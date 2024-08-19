const express = require("express");
const accountController = require("../controllers/accountController");
const router = express.Router();

router.post("/", accountController.createAccount);
router.get("/:userId", accountController.getUserAccounts);
router.get("/details/allAccounts", accountController.getAllAccounts);
router.get("/details/:accountId", accountController.getAccount);

module.exports = router;
