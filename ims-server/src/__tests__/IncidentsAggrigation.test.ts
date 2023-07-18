import app from '../app';
import supertest from 'supertest';
import IncidentModel from '../models/IncidentModel';

describe("aggregate incidents", () => {
  describe("request validation", () => {
    it("should return 200 for the /aggregation route", async () => {
      const res = await supertest(app).get("/aggregation");
      expect(res.status).toBe(200);
    }, 10000); 
  });

  describe("success", () => {
    it("should return aggregated incident data", async () => {
      const expectedResult = {
        activeCount: 10,
        averageCost: 500,
        averageDurationHours: 5,
      };
      jest.spyOn(IncidentModel, 'aggregate').mockResolvedValueOnce([expectedResult]);

      const res = await supertest(app).get("/aggregation");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expectedResult);
    });
  });

  describe("no result", () => {
    it("should return default aggregated incident data if no result", async () => {
      jest.spyOn(IncidentModel, 'aggregate').mockResolvedValueOnce([]);

      const res = await supertest(app).get("/aggregation");
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
      const errorMessage = "Aggregation error";
      jest.spyOn(IncidentModel, 'aggregate').mockRejectedValueOnce(new Error(errorMessage));

      const res = await supertest(app).get("/aggregation");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: errorMessage });
    });
  });

  describe("integration", () => {
    it("should return the correct aggregated incident data from the database", async () => {
      const incidents = [
        { status: "Active", cost: 100, durationHours: 4 },
        { status: "Active", cost: 600, durationHours: 6 },
        { status: "Inactive", cost: 200, durationHours: 2 },
      ];
      await IncidentModel.create(incidents);

      const res = await supertest(app).get("/aggregation");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        activeCount: 2,
        averageCost: 350,
        averageDurationHours: 5,
      });
    });
  });
});
