const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const kycModel = require("../../models/kycModel");

const showKycByid = async (req, res) => {
    try {
        const id = req.params.id;

        // Retrieve the KYC document from the database
        const kycData = await kycModel.findById(id);

        // Create a new PDF document
        const doc = new PDFDocument();

        // Center the image at the top of the page
        const centerX = (doc.page.width - 150) / 2; 
        const imagePath = path.join(__dirname, "../../assets/images/logo-new.png");
        doc.image(imagePath, centerX, 20, { fit: [150, 150], align: 'center' });

        // Move down after the image
        doc.moveDown();

        // Add heading to the PDF with customized styling and reduced margin top
        doc.font('Helvetica-Bold')
            .fontSize(24)
            .fillColor('#30344d')
            .text("KYC Details", { align: "center" });

        // Reset styling to default for the rest of the document
        doc.font('Helvetica')
            .fontSize(16)
            .fillColor('black');
            

        // Add specific details to the PDF in text data format
        if (kycData) {
            const keys = Object.keys(kycData.toObject());
        
            keys.forEach((key) => {
                const value = kycData[key] || 'N/A';
        
                doc.fontSize(16).text(`${key}: ${value}`);
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
            res.setHeader("Content-Disposition", `attachment; filename=kycData_${id}.pdf`);

            // Send the file using an absolute path
            res.status(200).sendFile(filePath);
        });

    } catch (error) {
        console.error("Error generating KYC PDF:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = showKycByid;



const downloadResume = async (req, res) => {
    try {
        const id = req.params.id;
        const career = await kycModel.findById(id);

        if (!career) {
            return res.status(404).json({ error: "Career not found" });
        }

        const pdfPath = path.join(__dirname, `../../assets/pdfFiles/${career.uploadResume}`);
    
        // Check if the file exists
        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ error: "File not found" });
        }

        const fileExtension = path.extname(pdfPath).toLowerCase();
        let contentType = 'application/octet-stream'; // Default content type for unknown files

        // Set specific content types based on file extension
        if (fileExtension === '.pdf') {
            contentType = 'application/pdf';
        } else if (fileExtension === '.doc' || fileExtension === '.docx') {
            contentType = 'application/msword';
        } // Add more cases as needed

        res.setHeader('Content-Type', contentType);
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

module.exports = downloadResume;
