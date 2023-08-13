import app from '../app';
import supertest from 'supertest';
import aggregationService from '../services/aggregationService';

describe("aggregation", () => {
  describe("get aggregation", () => {
    describe("succeed", () => {
      it("should return data", async () => {
        const res = await supertest(app).get("/aggregation/");
        expect(res.status).toBe(200);
      })
    })
    describe('error', () => {
      it('should return 404', async () => {        const aggregationServiceMock = {
          aggregateIncident: jest.fn().mockRejectedValueOnce(new Error('Aggregation failed')),
        };
        const expectedResponse = { message: 'Aggregation failed', error: true };
        const controller = new AggregationController();//aggregationServiceMock
        const req = {} as Request;

        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;

        await controller.incidentAggregation(req, res);

        expect(aggregationServiceMock.aggregateIncident).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        jest.spyOn(aggregationService, 'aggregateIncident').mockResolvedValueOnce(new Error());
        const res = await supertest(app).get("/aggregation/");
        expect(res.status).toBe(404);
      });
    });
  })
})