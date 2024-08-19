const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  reciever: { type: String, required: true },
  transaction_date: { type: Date, required: true, default: Date.now },
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
