const Account = require("../models/Account");

// Create a new account
function generateAccountNumber() {
  return Math.random().toString().slice(2, 12); // Generate a random account number
}

exports.createAccount = async (req, res) => {
  try {
    const { user_id, account_type } = req.body;
    let account_number;

    do {
      account_number = generateAccountNumber();
    } while (await Account.findOne({ account_number }));

    const account = new Account({ user_id, account_type, account_number });
    await account.save();
    return res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all accounts for a user
exports.getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user_id: req.params.userId });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find(); // Fetch all accounts from the database
    res.status(200).json(accounts); // Return the accounts in JSON format with a 200 status code
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle any errors and return a 500 status code
  }
};

// Get account details
exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);
    if (!account) return res.status(404).json({ error: "Account not found" });
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
