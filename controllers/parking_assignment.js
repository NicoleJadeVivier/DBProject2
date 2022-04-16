const express = require('express');
const allocation = require('../models/parking_assignment');

const postController = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await allocation.createAllocation(body.license_plate_number, body.vehicle_type, body.parking_space);
        res.status(201).json(result);
    } catch {
        console.error('Failed to create new parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }

};

const putController = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        console.log(req.params.assignment_id);
        const result = await allocation.updateAllocation(req.params.assignment_id, body.license_plate_number, body.vehicle_type);
        res.status(200).json(result);
    } catch {
        console.error('Failed to update parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }

};

const deleteController = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await allocation.deleteAllocation(req.params.assignment_id);
        res.status(204).json(result);
    } catch {
        console.error('Failed to delete parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }
}