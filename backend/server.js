import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import vulnerabilityRoutes from './routes/vulnerabilityRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/vulnerabilities', vulnerabilityRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'CyberGuard API is running', status: 'OK' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Don't crash the server on DB connection failure during dev
    // server.close(() => process.exit(1));
});
