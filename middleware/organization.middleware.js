const { verifyToken } = require('../utils/authUtils');
const Organization = require('../models/organization.models');

const organizationMiddleware = async (req, res, next) => {
    const authHeader = await req.headers['authorization'];
    console.log(authHeader)
    const success = 0;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        try {
            // Verify the token and extract the payload
            const { id } = verifyToken(token);

            // Find the organization by ID
            const organization = await Organization.findById(id);

            if (!organization) {
                return res.status(404).json({success, message: 'Organization not found' });
            }

            // Attach the organization to the request object
            req.organization = organization;

            // Pass control to the next middleware or route handler
            next();
        } catch (err) {
            return res.status(403).json({success, message: 'Forbidden: Invalid token' });
        }
    } else {
        // If the token is missing or the scheme is not 'Bearer', return an unauthorized response
        return res.status(401).json({success, message: 'Unauthorized: No token provided or invalid scheme' });
    }
};

module.exports = organizationMiddleware;
