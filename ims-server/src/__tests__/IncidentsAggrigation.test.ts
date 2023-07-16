import app from '../app';
import supertest from 'supertest';
import IncidentModel from '../models/IncidentModel';

  describe("aggregate incidents", () => {
    describe("succeed", () => {
      it("should return aggregated incident data", async () => {
        const expectedResult = {
          activeCount: 10,
          averageCost: 500,
          averageDurationHours: 5,
        };
        jest.spyOn(IncidentModel, 'aggregate').mockResolvedValueOnce([expectedResult]);

        const res = await supertest(app).get("/incident/aggregate");
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expectedResult);
      });
    });

    describe("no result", () => {
      it("should return default aggregated incident data if no result", async () => {
        jest.spyOn(IncidentModel, 'aggregate').mockResolvedValueOnce([]);

        const res = await supertest(app).get("/incident/aggregate");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          activeCount: 0,
          averageCost: 0,
          averageDurationHours: 0,
        });
      });
    });

    describe("error", () => {
      it("should return 404 if an error occurs during aggregation", async () => {
        jest.spyOn(IncidentModel, 'aggregate').mockRejectedValueOnce(new Error());

        const res = await supertest(app).get("/incident/aggregate");
        expect(res.status).toBe(404);
      });
    });
  });
;



