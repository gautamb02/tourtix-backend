const express = require('express');
const router = express.Router();
const { Activity, Package } = require('../models/ticketsystem.models'); // Adjust the path as needed
const organizationMiddleware = require('../middleware/organization.middleware');
const BusinessProfile = require('../models/business.models');

router.post('/activity',organizationMiddleware, async (req, res) => {
  try {
    const orgId = req.organization._id //.organization._id;
    const {businessId} = req.body;
    // console.log(orgId, businessId)
    const business = await BusinessProfile.findOne({orgId , _id : businessId})
    // console.log(business)
    if(!business){
      res.status(401).json({success :0, message : 'Unauthorized!'});
    }
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

// Read All Activities
router.post('/activities',organizationMiddleware, async (req, res) => {
  try {
    const orgId = req.organization._id //.organization._id;
    const {businessId} = req.body;

    console.log(orgId, businessId)
    const business = await BusinessProfile.findOne({orgId , _id : businessId})
    console.log(business)
    if(!business){
      res.status(401).json({success :0, message : 'Unauthorized!'});
    }
    const activities = await Activity.find({businessId});
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Single Activity
router.get('/activity/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Activity
router.put('/activity/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Activity
router.delete('/activity/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Package CRUD operations
// Create Package
router.post('/package', async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).json(package);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read All Packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find().populate('activities');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Single Package
router.get('/package/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id).populate('activities');
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Package
router.put('/package/:id', async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.json(package);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Package
router.delete('/package/:id', async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    if (!package) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;