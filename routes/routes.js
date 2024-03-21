const Router = require("express");
const submitKyc = require("../controllers/kycForm/addKyc");
const anyFileUpload = require("../middlewares/uploadEmpResume/multer");
const pdfUploadHandler = require("../middlewares/uploadEmpResume/pdfUpload");
const showKycDetails = require("../controllers/kycForm/showKyc");
const showkycByid = require("../controllers/kycForm/showKycByid");
const loginForm = require("../controllers/login/loginController");


const router = Router();

// router.post("/submit-kyc",submitKyc)
// router.post('/submit-kyc',pdfUpload.single("pdfFile"), imageUpload.any("aadhaarFront", "", "") ,pdfUploadHandler,submitKyc)
router.post(
  "/submit-kyc",
  anyFileUpload.any(
    "aadharFront",
    "aadharBack",
    "panCard",
    "photo",
    "signature"
  ),
  pdfUploadHandler,
  submitKyc
);
router.get("/showKyc", showKycDetails);
router.get("/showKyc/:id", showkycByid);
router.post("/login",loginForm)
// router.get("/showKyc/:id/download", showkycByid);

module.exports = router;
