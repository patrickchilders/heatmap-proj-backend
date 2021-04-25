process.env.NODE_ENV = 'test';

var server = require('../app');

let geoIpData = [];

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(chaiHttp);


describe('geoip', function() {
    describe('load data', function() {
        it("should load the CSV geoip data", function() {
            return expect(require('../models/geoip').then(function(data){ geoIpData = data; return data; })).to.eventually.not.have.lengthOf(0);
        })
    });
    describe('/GET geoip', function() {
        this.timeout(15000);
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
});