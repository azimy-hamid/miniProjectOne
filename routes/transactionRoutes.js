const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.post("/", transactionController.createTransaction);
router.get("/:accountId", transactionController.getAccountTransactions);
router.get(
  "/allTransaction/:userId",
  transactionController.getAllTransactionsOfUser
);

module.exports = router;
