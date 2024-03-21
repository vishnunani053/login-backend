const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const kycModel = require("../../models/kycModel");

const showKycByid = async (req, res) => {
  try {
    const id = req.params.id;

    // Retrieve the KYC document from the database
    const kycData = await kycModel.findById(id);
    console.log("kycData", kycData);
    // Create a new PDF document
    const doc = new PDFDocument();

    // Center the image at the top of the page
    const centerX = (doc.page.width - 150) / 2;
    const imagePath = path.join(__dirname, "../../assets/images/dark_logo NV.png");
    doc.image(imagePath, centerX, 20, { fit: [180, 180], align: "center" });
    // const imagePath = path.join(__dirname, "../../assets/images/logo-new.png");
    // doc.moveDown();


    // Add heading to the PDF with customized styling and reduced margin top
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#28AB9E")
      .text("KYC Details", { align: "center" });
      // doc.moveDown();

    // Reset styling to default for the rest of the document
    doc.font("Helvetica").fontSize(16).fillColor("black");

    // Add specific details to the PDF in text data format
  
    if (kycData) {
      const keys = Object.keys(kycData.toObject());

      keys.forEach((key) => {
        const value = kycData[key] || "N/A";
       
        //console.log("value", key);
        if (key == "aadharFront") {
          doc.image(
            path.join(
              __dirname,
              `../../assets/pdfFiles/${kycData.aadharFront}`
            ),

            { width: 500,height:250  }
          );

          doc.moveDown();
          doc.moveDown();
        
        }
        if (key == "aadharBack") {
          doc.image(
            path.join(__dirname, `../../assets/pdfFiles/${kycData.aadharBack}`),

            { width: 500,height:250 }
          );
          doc.moveDown();
          doc.moveDown();     
        
        }
       
        if (key == "panCard") {
          doc.image(
            path.join(__dirname, `../../assets/pdfFiles/${kycData.panCard}`),
            { width: 500,height:250  }
          );

          doc.moveDown();
          doc.moveDown();
     ;
        }
        if (key == "photo") {
          doc.image(
            path.join(__dirname, `../../assets/pdfFiles/${kycData.photo}`),
            { width: 500,height:250  }
          );

          doc.moveDown();
          doc.moveDown();
      
        }
        if (key == "signature") {
          doc.image(
            path.join(__dirname, `../../assets/pdfFiles/${kycData.signature}`),
            { width: 500,height:250  }
          );
          doc.moveDown();
          doc.moveDown();
    
        } else {
          doc.fontSize(16).text(`${key}: ${value}`);
        }
        doc.moveDown(); // Add space after each line
      });

      // Add a new line for better separation
      doc.moveDown();
    } else {
      doc.fontSize(14).text("No KYC data available");
      doc.moveDown(); // Add space after the line
    }

    // Specify the directory path
    const directoryPath = path.join(__dirname, "../../assets/kycMainpdf");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    // Create an absolute path for the PDF file
    const filePath = path.join(directoryPath, `kycData_${id}.pdf`);

    // Pipe the PDF content to a writable stream
    const stream = doc.pipe(fs.createWriteStream(filePath));

    // Finalize the PDF
    doc.end();
    // Send the PDF as a response to the client
    stream.on("finish", () => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=kycData_${id}.pdf`
      );

      // Send the file using an absolute path
      res.status(200).sendFile(filePath);
    });
  } catch (error) {
    console.log("Error generating KYC PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = showKycByid;
