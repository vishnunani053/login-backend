const app = require('./app');
const connectDatabase = require('./config/DBconfig');
const port = process.env.PORT || 5000

app.listen(port,async(req,res)=>{
    try {
        await connectDatabase()
        console.log(`listening on http://localhost:${port}`)
    } catch (error) {
        console.log("app.listen  error:", error);
        console.log(`error while listening on ${port}`);
    }
})



// Uncaught Exception Error
process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`);
    process.exit(1);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error:${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});