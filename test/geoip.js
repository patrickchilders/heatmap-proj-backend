process.env.NODE_ENV = 'test';

var server = require('../app');

let geoIpData = [];

let _ = require('lodash');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

let nonWrappingBoundingBoxTest = {
    "bounds": [
        "53,-46",
        "53,46",
        "1,-46",
        "1,46"
    ],
    "pointInsideBounds": ["37.3422","-2.0399"],
    "pointOutsideBounds": ["-33.8591","151.2002"]
}

let wrappingBoundingBoxTest = {
    "bounds": [
        "15,100",
        "15,-130",
        "-58,100",
        "-58,-130"
    ],
    "pointOutsideBounds": ["37.3422","-2.0399"],
    "pointInsideBounds": ["-33.8591","151.2002"]
}


describe('geoip', function() {
    describe('load data', function() {
        it("should load the CSV geoip data", function() {
            return expect(require('../models/geoip').then(function(data){ geoIpData = data; return data; })).to.eventually.not.have.lengthOf(0);
        })
    });
    describe('/GET geoip', function() {
        it('should GET all the geoip coordinates', function(done) {
            chai.request(server)
            .get('/geoip')
            .end(function(err, res) {
                chai.should().exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });

        });
    });
    describe('/GET geoip/boundingBox', function() {
        it('should GET all the geoip coordinates within a bounding box that does not wrap the 180th prime meridian', function(done) {
            chai.request(server)
            .get('/geoip/boundingBox')
            .query({"bounds[]":nonWrappingBoundingBoxTest["bounds"]})
            .end(function(err, res) {
                chai.should().exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(_.find(res.body, (latlong) => _.isEqual(latlong, nonWrappingBoundingBoxTest["pointInsideBounds"]))).not.equal(undefined);
                expect(_.find(res.body, (latlong) => _.isEqual(latlong, nonWrappingBoundingBoxTest["pointOutsideBounds"]))).equal(undefined);
                done();
            });
        });
        it('should GET all the geoip coordinates within a bounding box that wraps the 180th prime meridian', function(done) {
            chai.request(server)
            .get('/geoip/boundingBox')
            .query({"bounds[]":wrappingBoundingBoxTest["bounds"]})
            .end(function(err, res) {
                chai.should().exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(_.find(res.body, (latlong) => _.isEqual(latlong, wrappingBoundingBoxTest["pointInsideBounds"]))).not.equal(undefined);
                expect(_.find(res.body, (latlong) => _.isEqual(latlong, wrappingBoundingBoxTest["pointOutsideBounds"]))).equal(undefined);
                done();
            });
        });
    });
});