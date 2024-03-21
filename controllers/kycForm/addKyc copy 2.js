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
//   } =formData;

//   //Map file names from req.files to corresponding fields
//   const {
//     aadharFront,
//     aadharBack,
//     panCard,
//     photo,
//     signature,
//   } = files;

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
//     aadharFront: aadharFront ? aadharFront[0].filename : null,
//     aadharBack: aadharBack ? aadharBack[0].filename : null,
//     panCard: panCard ? panCard[0].filename : null,
//     photo: photo ? photo[0].filename : null,
//     signature: signature ? signature[0].filename : null,
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

const submitKyc = async (req, res) => {
  try {
    const uploadResume = res.locals.pdfUrl.pdfName;

    const jsonData = req.body.jsonData ? JSON.parse(req.body.jsonData) : {};
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
      declaration,
    } = jsonData;

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
      aadharFront,
      aadharBack,
      panCard,
      uploadResume,
      signature,
      declaration,
    });

    console.log(newKyc);
    res.status(200).json({ message: "Kyc added successfully", newKyc });
  } catch (error) {
    console.error("Kyc not added!!!", error);
    res.status(500).json({ error: "Kyc Not added" });
  }
};

module.exports = submitKyc;
