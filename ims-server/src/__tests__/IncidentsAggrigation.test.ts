import app from '../app';
import supertest from 'supertest';
import aggregationService from '../services/aggregationService';

describe("aggregation", () => {
  describe("get aggregation", () => {
    describe("succeed", () => {
      it("should return data", async () => {
        const res = await supertest(app).get("/aggregation");
        expect(res.status).toBe(200);
      })
    })
    describe('error', () => {
      it('should return 404', async () => {
        jest.spyOn(aggregationService, 'aggregateIncident').mockResolvedValueOnce(new Error());
        const res = await supertest(app).get("/aggregation");
        expect(res.status).toBe(404);
      });
    });
  })
})