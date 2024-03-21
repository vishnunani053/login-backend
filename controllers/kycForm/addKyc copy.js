// const kycModel = require("../../models/kycModel");

// const submitKYC = async (formData, files,req) => {
//   const {
// name,
// email,
// phoneNumber,
// fatherOrSpouseName,
// dateOfBirth,
// gender,
// maritalStatus,
// occupationType,
// proofOfIdentity,
// aadharNumber,
// panNumber,
// idProof,
// grossAnnualSalary,
// occupation,
// proofOfAddress,
// declaration,
//   } =req.body ;

//   // Map file names from req.files to corresponding fields
// //   const {
// //     aadharFront,
// //     aadharBack,
// //     panCard,
// //     photo,
// //     signature,
// //   } = files;

//   const newKYC = new kycModel({
//     name,
//     email,
//     phoneNumber,
//     fatherOrSpouseName,
//     dateOfBirth,
//     gender,
//     maritalStatus,
//     occupationType,
//     proofOfIdentity,
//     aadharNumber,
//     panNumber,
//     idProof,
//     grossAnnualSalary,
//     occupation,
//     proofOfAddress,
//     // aadharFront: aadharFront ? aadharFront[0].filename : null,
//     // aadharBack: aadharBack ? aadharBack[0].filename : null,
//     // panCard: panCard ? panCard[0].filename : null,
//     // photo: photo ? photo[0].filename : null,
//     // signature: signature ? signature[0].filename : null,
//     declaration: declaration === "on",
//   });

//   try {
//     const savedKYC = await newKYC.save();
//     console.log("KYC submitted successfully:", savedKYC);
//     return { success: true, message: "KYC submitted successfully" };
//   } catch (error) {
//     console.error("Error submitting KYC:", error);
//     return { success: false, message: "Internal Server Error" };
//   }
// };

// module.exports =  submitKYC ;

const kycModel = require("../../models/kycModel");

const submitKYC = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      phoneNumber,
      fatherOrSpouseName,
      dateOfBirth,
      gender,
      maritalStatus,
      occupationType,
      aadharNumber,
      panNumber,
      idProof,
      grossAnnualSalary,
      occupation,
      proofOfAddress,
      proofOfIdentity,
      // aadharFront,
      aadharBack,
      panCard,
      photo,
      signature,
      declaration,
    } = req.body;

    const newKyc = await kycModel.create({
      name,
      email,
      phoneNumber,
      fatherOrSpouseName,
      dateOfBirth,
      gender,
      maritalStatus,
      occupationType,
      aadharNumber,
      panNumber,
      idProof,
      grossAnnualSalary,
      occupation,
      proofOfAddress,
      proofOfIdentity,
      // aadharFront,
      aadharBack,
      panCard,
      photo,
      signature,
      declaration,
    });

    await newKyc.save();
    console.log(newKyc);
    res.status(200).json({ message: "KYC submitted successfully", newKyc });
  } catch (error) {
    console.error("Kyc not added!!!", error);
    res.status(500).json({ error: "kyc  Not added" });
  }
};

module.exports = submitKYC;
