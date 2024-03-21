const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const kycModel = require("../../models/kycModel");

// Function to generate KYC PDF
const generateKycPdf = async (id) => {
  try {
    const kycData = await kycModel.findById(id);

    if (!kycData) {
      throw new Error("KYC data not found");
    }

    const doc = new PDFDocument();

    // Center the image at the top of the page
    const centerX = (doc.page.width - 150) / 2;
    const imagePath = path.join(__dirname, "../../assets/images/logo-new.png");
    doc.image(imagePath, centerX, 20, { fit: [150, 150], align: "center" });

    // Move down after the image
    doc.moveDown();

    // Add heading to the PDF with customized styling and reduced margin top
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#30344d")
      .text("KYC Details", { align: "center" });

    // Reset styling to default for the rest of the document
    doc.font("Helvetica").fontSize(16).fillColor("black");

    // Add specific details to the PDF in text data format
    if (kycData) {
      const keys = Object.keys(kycData.toObject());

      keys.forEach((key) => {
        const value = kycData[key] || "N/A";

        doc.fontSize(16).text(`${key}: ${value}`);
        doc.moveDown(); // Add space after each line
      });

      // Add a new line for better separation
      doc.moveDown();
    } else {
      doc.fontSize(14).text("No KYC data available");
      doc.moveDown(); // Add space after the line
    }

    const directoryPath = path.join(__dirname, "../../assets/kycMainpdf");

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const filePath = path.join(directoryPath, `kycData_${id}.pdf`);
    const stream = doc.pipe(fs.createWriteStream(filePath));

    doc.end();

    return filePath;
  } catch (error) {
    console.error("Error generating KYC PDF:", error);
    throw error;
  }
};

// Controller for showing KYC details
const showKycById = async (req, res) => {
  try {
    const id = req.params.id;
    const filePath = await generateKycPdf(id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=kycData_${id}.pdf`
    );
    res.status(200).sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for downloading uploaded resume
const downloadResume = async (req, res) => {
  try {
    const id = req.params.id;
    const kycData = await kycModel.findById(id);

    if (!kycData || !kycData.uploadResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const pdfPath = path.join(
      __dirname,
      `../../assets/pdfFiles/${kycData.uploadResume}`
    );

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.sendFile(pdfPath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { showKycById, downloadResume };
