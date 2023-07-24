import app from '../app';
import supertest from 'supertest';
import IncidentModel from '../models/IncidentModel';
import AggregationController from '../controllers/AggregateController';
import { Request, Response } from 'express';

describe("aggregation", () => {
  describe("get aggregation", () => {
    describe("succeed", () => {
      it("should return data", async () => {
        const res = await supertest(app).get("/aggregation/");
        expect(res.status).toBe(200);
      })
    })
    // describe("error", () => {
    //   it("should return 404", async () => {
    //     jest.spyOn(incidentAggregation).mockRejectedValueOnce(new Error());
    //     const res = (await supertest(app).get("/aggregation/"));
    //     expect(res.status).toBe(404);
    //   })
    // })
    describe('error', () => {
      it('should return 404', async () => {
        const aggregationServiceMock = {
          aggregateIncident: jest.fn().mockRejectedValueOnce(new Error('Aggregation failed')),
        };
        const expectedResponse = { message: 'Aggregation failed', error: true };
        const controller = new AggregationController();//aggregationServiceMock
        const req = {} as Request;

        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;

        console.log('Before incidentAggregation');

        await controller.incidentAggregation(req, res);
        console.log('After incidentAggregation');

        console.log('Calls to aggregateIncident:', aggregationServiceMock.aggregateIncident.mock.calls);
        expect(aggregationServiceMock.aggregateIncident).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
      });
    });
  })
})