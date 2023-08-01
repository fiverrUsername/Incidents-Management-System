import app from '../app';
import supertest from 'supertest';
import timelineEvent from '../models/timelineEvent';
import timelineEventService from '../services/timelineEventService';
import timelineEventRepository from '../repositories/timelineEventRepository';

describe("timeline events", () => {
    describe("get all timeline events", () => {
        describe("succed", () => {
            it("should return data", async () => {
                const res = await supertest(app).get("/timelineEvent");
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404", async () => {
                jest.spyOn(timelineEvent, 'find').mockRejectedValueOnce(new Error());
                const res = (await supertest(app).get("/timelineEvent"));
                expect(res.status).toBe(404);
            })
        })
    })
    describe("add timeline event", () => {
        describe("success", () => {
            it("should add a timeline event and return 201", async () => {
                const newtimelineEvent = {
                    "incidentId": "21d723cf-0ce9-4d37-9b76-e6d9873c8c57",
                    "userId": "14785",
                    "description": "description of a timeline event",
                    "priority": "P10",
                    "type": "technical",
                    "files": [
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
                    ],
                    "createdDate": "2023-07-21T11:39:23.414Z",
                    "updatedDate": "2023-07-19T12:43:07.004Z"
                }
                const res = await supertest(app)
                    .post("/timelineEvent/")
                    .send(newtimelineEvent);
                expect(res.status).toBe(201);
            });
        });
        describe("error", () => {
            it("should return 422 on missing required fields", async () => {
                const newtimelineEvent = {
                    "incidentId": "649cbeda942a5d4d8bcf3044",
                    "userId": "14785",
                    "description": "description",
                    // "priority": "P10",
                    "type": "technical",
                    "files": [
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
                    ],
                    "createdDate": Date.now(),
                    "updatedDate": Date.now()
                };
                const res = await supertest(app)
                    .post("/timelineEvent/")
                    .send(newtimelineEvent);
                expect(res.status).toBe(422);
            });
            it("should return 500 on error", async () => {
                jest.spyOn(timelineEvent, 'create').mockRejectedValueOnce(new Error());
                const newtimelineEvent = {
                    "incidentId": "649cbeda942a5d4d8bcf3044",
                    "userId": "14785",
                    "description": "description",
                    "priority": "P10",
                    "type": "technical",
                    "files": [
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
                    ],
                    "createdDate": Date.now(),
                    "updatedDate": Date.now()
                };
                const res = await supertest(app)
                    .post("/timelineEvent/")
                    .send(newtimelineEvent);
                expect(res.status).toBe(500);
            });  
        });
    })
    describe("delete a timeline event by id", () => {
        describe("success", () => {
            it("should delete a timeline event by id and return 200", async () => {
                const id = "55c701b9-b1f4-416c-944f-8b7cf6409d28";
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
    describe("get timeline event by ID", () => {
        describe("succeed", () => {
            it("should return data", async () => {
                const id = "160f92f8-48bf-425b-b44e-8fa5d8e8da7b"
                const res = await supertest(app).get(`/timelineEvent/${id}/`);
                expect(res.status).toBe(200);
            });
        });
        describe("error", () => {
            it("should return 404", async () => {
                const id = "987654";
                jest.spyOn(timelineEvent, 'find').mockRejectedValueOnce(new Error());
                const res = await supertest(app).get(`/timelineEvent/${id}/`);
                expect(res.status).toBe(404);
            });
        });
    })
    describe("get a file of a timeline event by id and index", () => {
        describe("success", () => {
            it("should get a file of a timeline event by id and index and return 200", async () => {
                const id = "6d8815c8-989c-4ad5-8e36-587c5ff46cc6";
                const index = "0";
                const timelineEvent = {
                    "_id": "6d8815c8-989c-4ad5-8e36-587c5ff46cc6",
                    "incidentId": "649cbeda942a5d4d8bcf3044",
                    "userId": "14785",
                    "description": "description",
                    "priority": "P10",
                    "type": "technical",
                    "files": [
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
                    ],
                    "createdDate": "2023-07-19T12:46:09.536Z",
                    "updatedDate": "2023-07-19T12:46:09.536Z",
                    "__v": 0
                };
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(timelineEvent);
                const res = await supertest(app)
                    .get(`/timelineEvent/${id}/files/?index=${index}`);
                expect(res.status).toBe(200);
                expect(res.body).toEqual("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU");
            })
        })
        describe("error", () => {
            it("should return 404 if timeline event id is not found", async () => {
                const id = "000";
                const index="0";
                const res = await supertest(app)
                    .get(`/timelineEvent/${id}/files/?index=${index}`);
                expect(res.status).toBe(404);
            })
            it("should return 400 if file is not found", async () => {
                const id = "f1ffdef3-4f15-45c9-840b-4099c63772ff";
                const index="8";
                const res = await supertest(app)
                    .get(`/timelineEvent/${id}/files/?index=${index}`);
                expect(res.status).toBe(400);
            })
            it("should return 500 on error", async () => {
                const id = "6d8815c8-989c-4ad5-8e36-587c5ff46cc6";
                const index = 0;
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockRejectedValueOnce(new Error());
                const res = await supertest(app)
                    .get(`/timelineEvent/${id}/files/?index=${index}`);
                expect(res.status).toBe(500);
            })
        })
    })
    describe("delete a file of a Timeline event by id and index", () => {
        const mockTimelineEventId = "63bd7e7a-4a4d-441a-9321-7352232e29ad";
        describe("success",()=>{
            it("should delete a file from a timeline event and return 200", async () => {
                const timelineEventWithFiles = {
                    "_id": mockTimelineEventId,
                    "files": ["file1", "file2", "file3"]
                };
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(timelineEventWithFiles);
                jest.spyOn(timelineEventRepository, 'updateTimelineEvent').mockResolvedValueOnce(timelineEventWithFiles);
                const deleteIndex = 0; 
                const res = await supertest(app).delete(`/timelineEvent/${mockTimelineEventId}/files?index=${deleteIndex}`);
                expect(res.status).toBe(200);
                expect(res.body).toEqual(timelineEventWithFiles);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).toHaveBeenCalledWith(mockTimelineEventId, timelineEventWithFiles);
            });
        })
        describe("error",()=>{
            it("should return 404 if timeline event is not found", async () => {
                const id="000";
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(null);
                const deleteIndex = 1; 
                const res = await supertest(app).delete(`/timelineEvent/${id}/files?index=${deleteIndex}`);
                expect(res.status).toBe(404);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).not.toHaveBeenCalledWith(mockTimelineEventId);
            })
            it("should return 400 if index is not valid", async () => {
                const timelineEventWithFiles = {
                    "_id": mockTimelineEventId,
                    "files": ["file1", "file2", "file3"]
                };
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(timelineEventWithFiles);
                const deleteIndex = 5; 
                const res = await supertest(app).delete(`/timelineEvent/${mockTimelineEventId}/files?index=${deleteIndex}`);
                expect(res.status).toBe(400);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).not.toHaveBeenCalledWith(mockTimelineEventId);
            })
            it("should return 500", async () => {
                const timelineEventWithFiles = {
                    "_id": mockTimelineEventId,
                    "files": ["file1", "file2", "file3"]
                };
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockRejectedValueOnce(timelineEventWithFiles);
                const deleteIndex = 0; 
                const res = await supertest(app).delete(`/timelineEvent/${mockTimelineEventId}/files?index=${deleteIndex}`);
                expect(res.status).toBe(500);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).not.toHaveBeenCalledWith(mockTimelineEventId);
            })
        })
    })
})