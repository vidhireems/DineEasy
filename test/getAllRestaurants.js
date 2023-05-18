var chai = require('chai');
const fs = require('../App.js');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test GET all Restaurants result', function () {

    var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/restaurants")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    // Test to check if the API is responding correctly
    it('Should return an array object of all restaurants with more than 1 object', function (){
		expect(response).to.have.headers;
        expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(2);
		
    });

    // Test to check all the properties in the response object array
	it('The elements in the array have the miniumum expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.include.keys('name');
                    expect(body[i]).to.have.property('_id');
                    expect(body[i]).to.have.property('resId').to.be.a.string;
                    expect(body[i]).to.have.property('image');
                    expect(body[i]).to.have.property('location');
                    expect(body[i]).to.have.property('rating').not.to.be.a.string;
                    expect(body[i]).to.have.property('reviews').not.to.be.a.string;
                    expect(body[i]).to.have.property('cost');
                    expect(body[i]).to.have.property('cuisines');
                    expect(body[i]).to.have.property('contact');
                    expect(body[i]).to.have.property('neighborhood');
                    expect(body[i]).to.have.property('hours');
                    expect(body[i]).to.have.property('parkingdetails');
                    expect(body[i]).to.have.property('isValetPark').not.to.be.a.string;
				}
				return true;
			});
            expect(response.body).to.not.be.a.string;
	});	
	
});