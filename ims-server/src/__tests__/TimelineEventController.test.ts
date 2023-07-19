import app from '../app';
import supertest from 'supertest';
import { json } from 'express';
import timelineEvent from '../models/timelineEvent';

describe("timeline events", () => {
    describe("get all timeline events", () => {
        describe("succed", () => {
            it("should return data", async () => {
                const res = await supertest(app).get("/timelineEvent/");
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404", async () => {
                jest.spyOn(timelineEvent, 'find').mockRejectedValueOnce(new Error());
                const res = (await supertest(app).get("/timelineEvent/"));
                expect(res.status).toBe(404);
            })
        })
    })
})