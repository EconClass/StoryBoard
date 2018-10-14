const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const should = chai.should();
const Story = require('../models/story.js');

chai.use(chaiHttp);

const sampleStory =     {
    "title": "Romeo and Juliet",
    "aurhor": "William Shakespeare",
    "story": "A great story of love and loss."
}
describe('Stories', ()  => {

    // TEST INDEX
    it('should index ALL Stories on / GET', (done) => {
        chai.request(server).get('/').end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST NEW
    it('should display new form on /stories/new GET', (done) => {
        chai.request(server).get(`/stories/new`).end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });

    // TEST CREATE
    it('should create a SINGLE story on /stories POST', (done) => {
        chai.request(server).post('/stories').send(sampleStory).end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });

    // TEST SHOW
    it('should show a SINGLE story on /stories/<id> GET', (done) => {
        var story = new Story(sampleStory);
        story.save((err, data) => {
            chai.request(server).get(`/stories/${data._id}`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    // TEST EDIT
    it('should edit a SINGLE story on /stories/<id>/edit GET', (done) => {
        var story = new Story(sampleStory);
        story.save((err, data) => {
            chai.request(server).get(`/stories/${data._id}/edit`)
                .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    // TEST UPDATE
    it('should update a SINGLE story on /stories/<id> PUT', (done) => {
        var story = new Story(sampleStory);
        story.save((err, data)  => {
            chai.request(server).put(`/stories/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });

    // TEST DELETE
    it('should delete a SINGLE story on /stories/<id> DELETE', (done) => {
        var story = new Story(sampleStory);
        story.save((err, data)  => {
            chai.request(server)
            .delete(`/stories/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
});