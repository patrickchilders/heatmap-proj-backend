process.env.NODE_ENV = 'test';

var express = require('express');

let geoIpData = [];

let getGeoIpData = require('../models/geoip').then((data) => {
    geoIpData = data;
});

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
describe('geoip', () => {
    describe('/GET geoip', () => {
        it('it should GET all the geoip coordinates', (done) => {
            chai.request(express)
                .get('/geoip')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1000);
                    done();
                });
        });
    });
});