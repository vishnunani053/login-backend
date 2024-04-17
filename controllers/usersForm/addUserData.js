const userModel = require("../../models/usersFormModel");


const addUserData = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      city,
      dematAccount,
      language,
      tandc } = req.body;

    const usersData = await userModel.create({
      name,
      phoneNumber,
      email,
      city,
      dematAccount,
      language,
      tandc
    });

    await usersData.save();
    console.log(usersData)
    res.status(200).json({ message: "User added successfully", usersData });
  } catch (error) {
    console.error("user not added!!!", error);
    res.status(500).json({ error: "user Not added" });
  }
};


module.exports = addUserData;