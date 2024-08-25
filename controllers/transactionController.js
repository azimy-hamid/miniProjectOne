const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const User = require("../models/User");

// Create a new transaction
exports.createTransaction = async (req, res) => {
  const { user_id, account_id, type, amount, description, reciever } = req.body;

  try {
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const senderAccount = await Account.findById(account_id);
    if (!senderAccount) {
      return res.status(404).json({ error: "Sender account not found" });
    }

    if (type === "Deposit" || type === "deposit") {
      senderAccount.balance += parseInt(amount);
      await senderAccount.save();
    } else if (type === "Transfer" || type === "transfer") {
      // Find the receiver's account if the type is not "Deposit"
      recieverAccount = await Account.findById(reciever);
      if (!recieverAccount && type !== "deposit") {
        return res.status(404).json({ error: "Receiver account not found" });
      }

      if (senderAccount.balance < amount) {
        return res.status(400).json({ error: "Insufficient funds" });
      }

      senderAccount.balance -= parseInt(amount);
      await senderAccount.save();

      recieverAccount.balance += parseInt(amount);
      await recieverAccount.save();
    } else {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    // Create and save the transaction
    const transaction = new Transaction({
      user_id,
      account_id,
      type,
      amount,
      description,
      reciever:
        type === "Deposit" || type === "deposit"
          ? "Deposit - no receiver"
          : recieverAccount._id.toString(),
    });

    await transaction.save();

    return res.status(200).json({ message: "Transaction Complete" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transactions for an account
exports.getAccountTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      account_id: req.params.accountId,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In your controllers/transactionController.js
exports.getAllTransactionsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all transactions for the given user_id
    const transactions = await Transaction.find({ user_id: userId });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user." });
    }

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
