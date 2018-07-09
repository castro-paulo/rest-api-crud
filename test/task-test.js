'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Task = require('../api/models/task-models');


const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const should = chai.should();


chai.use(chaiHttp);

describe('Tasks', () => {
    beforeEach((done) => {
        Task.remove({}, (err) => {
            done();
        });
    });
});

describe('/GET task', () => {
    it('It should list all tasks ', (done) => {
        chai.request(app)
            .get('/task')
            .end((err, res) => {
                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.be.a('Array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('status');
                done();
            });
    });
});

describe('/GET/:id task', () => {
    it('It should list task by id', (done) => {
        const task = new Task({ title: "Title new task", content: "Content new task" });
        task.save((err, task) => {
            chai.request(app)
                .get('/task/' + task.id)
                .send(task)
                .end((err, res) => {
                    res.should.have.property('status', 200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('content');
                    res.body.should.have.property('status');
                    done();
                });
        });
    });
});

describe('/POST task', () => {
    it('It should not POST a task without a title', (done) => {
        chai.request(app)
            .post('/task')
            .send({ 'content': 'Content new task' })
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Failed to create task');
                done();
            });
    });
    it('It should POST a task', (done) => {
        chai.request(app)
            .post('/task')
            .send({ 'title': 'Title new task', 'content': 'Content new task' })
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Task created with success');
                done();
            });
    });
});

describe('/PUT/:id task', () => {
    it('It should UPDATE a task give the id', (done) => {
        const task = new Task({ title: "Title task", content: "Content task" });
        task.save((err, task) => {
            chai.request(app)
                .put('/task/' + task.id)
                .send({ title: "Title task new version", content: "Content task new version" })
                .end((err, res) => {
                    res.should.have.property('status', 201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task updated with success');
                    done();
                });
        });
    });
});

describe('/DELETE/:id task', () => {
    it('It should DELETE a task give the id', (done) => {
        const task = new Task({ title: "Title task", content: "Content task" });
        task.save((err, task) => {
            chai.request(app)
                .delete('/task/' + task.id)
                .end((err, res) => {
                    res.should.have.property('status', 200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task removed with success');
                    done();
                });
        });
    });
});