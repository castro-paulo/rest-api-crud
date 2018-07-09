'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('task-models');
const logger = require('../../config/winston.js');

exports.get = (req, res, next) => {
    Task
        .find({}, 'title content CreationDate status')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            logger.error('GET all Error: ' + e);
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    Task
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            logger.error('GET By Id Error: ' + e);
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    let task = new Task(req.body);
    task
        .save()
        .then(data => {
            res.status(201).send({
                message: 'Task created with success'
            });
        }).catch(e => {
            logger.info('Failed to create task. Error: ' + e);
            res.status(400).send({
                message: 'Failed to create task',
                data: e
            });            
        });

};

exports.put = (req, res, next) => {
    Task
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                status: req.body.status
            }
        }).then(data => {
            res.status(201).send({
                message: 'Task updated with success'
            });
        }).catch(e => {
            logger.info('Failed to update task. Error: ' + e);
            res.status(400).send({
                message: 'Failed to update task',
                data: e
            });
        });
};

exports.deleteByid = (req, res, next) => {
    Task
        .findByIdAndRemove(req.params.id)
        .then(data => {
            res.status(200).send({
                message: 'Task removed with success'
            });
        }).catch(e => {
            logger.info('Failed to remove task. Error: ' + e);
            res.status(400).send({
                message: 'Failed to remove task',
                data: e
            });
        });
};