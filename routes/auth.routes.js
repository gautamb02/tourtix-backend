const express = require('express');
const bypass = require('../middleware/bypass.middleware');
const { generateJWTToken, encryptPassword, decryptPassword } = require('../utils/authUtils');

const authRouter = express.Router();
const Organization = require('../models/organization.models');
const organizationMiddleware = require('../middleware/organization.middleware');


authRouter.post('/signup',bypass, async (req, res) => {
  const { organizationName, email, password } = req.body;
  // console.log("hitted signup")

  if (!organizationName || !email || !password) {
    return res.status(400).json({success : 0, message: 'All fields are required' });
  }

  try {
    const hashedPassword = await encryptPassword(password);
    const organization = new Organization({
      organizationName,
      email,
      password: hashedPassword
    });

    await organization.save();
    res.status(201).json({ success : 1, message: 'Organization created successfully' });
  } catch (err) {
    res.status(500).json({ success : 0,message: 'Error creating organization', error: err.message });
  }
});

authRouter.post('/login',bypass, async (req, res) => {
  const { email, password } = req.body;
  // console.log("hitted login")

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const organization = await Organization.findOne({ email });

    if (!organization) {
      return res.status(401).json({success : 0, message: 'Invalid email or password' });
    }

    const isMatch =  await decryptPassword(password, organization.password)

    if (!isMatch) {
      return res.status(401).json({success : 0, message: 'Invalid email or password' });
    }

    const token = await generateJWTToken({id : organization._id});
    res.status(200).json({ success : 1, message: 'Login successful', token, organization });
  } catch (err) {
    res.status(500).json({ success:0 ,message: 'Error logging in', error: err.message });
  }
});

authRouter.post('/change-password',organizationMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const success  = 0;
  if ( !oldPassword || !newPassword) {
    return res.status(400).json({success, message: 'Token, old password, and new password are required' });
  }

  try {
   
    const organization = req.organization;

    if (!organization) {
      return res.status(404).json({success, message: 'Organization not found' });
    }

    const isMatch = await decryptPassword(oldPassword, organization.password)

    if (!isMatch) {
      return res.status(401).json({success, message: 'Old password is incorrect' });
    }

    const hashedNewPassword = await encryptPassword(newPassword)
    organization.password = hashedNewPassword;
    await organization.save();

    res.status(200).json({ 'success' :1,message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success,message: 'Error changing password', error: err.message });
  }
});

module.exports = authRouter;

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup a new organization
 *     description: Allows an organization to sign up by providing organization name, email, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *                 example: "Example Org"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "tarun@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *             required:
 *               - organizationName
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Organization created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Organization created successfully"
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an organization
 *     description: Authenticates an organization by email and password, returning a JWT token and organization details if successful.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "tarun@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Password123!"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                 organization:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66cdda77b5dd03dc02a0a699"
 *                     organizationName:
 *                       type: string
 *                       example: "Example Org"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "tarun@example.com"
 *                     password:
 *                       type: string
 *                       format: password
 *                       example: "$2b$10$Nnzl0Bt50px.R.Nxh/7treSQzgxtFZS9XV6Fd7Xh9p1LiGRhxJD8."
 *                     onboarded:
 *                       type: boolean
 *                       example: false
 */


/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change password for an organization
 *     description: Allows an organization to change their password by providing a token, old password, and new password. The request must include an `Authorization` header with a Bearer token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: "OldPassword123!"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewPassword123!"
 *             required:
 *               - oldPassword
 *               - newPassword
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer your_jwt_token"
 *         description: "Bearer token for authentication"
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 */