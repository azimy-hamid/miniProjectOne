const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account_number: { type: String, required: true },
  account_type: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Account", accountSchema);
