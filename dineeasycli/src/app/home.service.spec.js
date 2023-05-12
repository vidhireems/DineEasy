"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const home_service_1 = require("./home.service");
describe('HomeService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(home_service_1.HomeService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
