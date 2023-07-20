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
    describe("add timeline event", () => {
        describe("success", () => {
            it("should add a timeline event and return 201", async () => {
                const newtimelineEvent = {
                    incidentId: "649cbeda942a5d4d8bcf3044",
                    userId: "14785",
                    description: "description",
                    priority: "P10",
                    type: "technical",
                    files: [
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
                    ],
                    createdDate: Date.now(),
                    updatedDate: Date.now(),
                }
                const res = await supertest(app)
                    .post("/timelineEvent/")
                    .send(newtimelineEvent);
                expect(res.status).toBe(201);
            });
        });
        describe("error", () => {
            it("should return 500 on error", async () => {
                jest.spyOn(timelineEvent, 'create').mockRejectedValueOnce(new Error());
                const newtimelineEvent = {
                    name: "i add this timeline event"
                };
                const res = await supertest(app)
                    .post("/timelineEvent/")
                    .send(newtimelineEvent);
                expect(res.status).toBe(500);
            });
        });
    })
    describe("delete  timeline event by id",()=>{
        describe("success", () => {
            it("should delete a timeline event by id and return 200", async () => {
                const id="55c701b9-b1f4-416c-944f-8b7cf6409d28";
                const res = await supertest(app)
                    .delete(`/timelineEvent/${id}`);
                expect(res.status).toBe(200);
            });
        });
        describe("error", () => {
            it("should return 404 if timeline event is not found", async () => {
              const id = "0000";
              jest.spyOn(timelineEvent, 'findByIdAndDelete').mockResolvedValueOnce(null);
              const res = await supertest(app)
                .delete(`/timelineEvent/${id}`);
              expect(res.status).toBe(404);
            });
          });
    })
})
