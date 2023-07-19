import app from '../app';
import supertest from 'supertest';
import { json } from 'express';

describe("timeline events", () => {
    describe("get all timeline events",()=>{
        describe("succed",()=>{
            it("should return data",async()=>{
                const res=await supertest(app).get("/timelineEvent/");
                expect(res.status).toBe(200);
            })
        })
    })
})