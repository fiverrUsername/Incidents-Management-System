import app from '../app';
import supertest from 'supertest';
import timelineEvent from '../models/timelineEvent';
import timelineEventService from '../services/timelineEventService';
import timelineEventRepository from '../repositories/timelineEventRepository';
import { Priority, Status } from '../enums/enum';
import TimelineEventController from '../controllers/TimelineEventController';

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
                    "incidentId": "1cf9d420-db3c-42df-a85a-5321a5fce459",
                    "userId": "698cbeda854a5d4d8bcf303l",
                    "description": "Add files",
                    "priority": "p0",
                    "status": "Active",
                    "type": "securing",
                    "files": [
                        "incidence?1cf9d420-db3c-42df-a85a-5321a5fce459?1692731017660a.jpg",
                        "incidence?1cf9d420-db3c-42df-a85a-5321a5fce459?1692731017660b.jpg",
                        "incidence?1cf9d420-db3c-42df-a85a-5321a5fce459?1692731017660c.jpg",
                        "incidence?1cf9d420-db3c-42df-a85a-5321a5fce459?1692731017660d.jpg",
                        "incidence?1cf9d420-db3c-42df-a85a-5321a5fce459?1692731017660e.jpg",
                        "incidence?1cf9d420-db3c-42df-a85a-5321a5fce459?1692731017660f.jpg"
                    ],
                    "createdDate": "2023-08-22T19:03:37.660Z",
                    "updatedDate": "2023-08-22T19:03:40.358Z",
                    "tags": []
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
                    "status": Status.Active,
                    "incidentId": "21d723cf-0ce9-4d37-9b76-e6d9873c8c57",
                    "userId": "14785",
                    "description": "description of a timeline event",
                    "priority": Priority.P3,
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
                if (res.status == 200) {
                    expect(res.status).toBe(200);
                }
                else {
                    expect(res.status).toBe(404);
                }
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
                const id = "6d3e46ad-7285-438c-b65c-7ebb7fdc95ed"
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
                    "status": Status.Active,
                    "_id": "6d8815c8-989c-4ad5-8e36-587c5ff46cc6",
                    "incidentId": "649cbeda942a5d4d8bcf3044",
                    "userId": "14785",
                    "description": "description",
                    "priority": Priority.P3,
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
                const index = "0";
                const res = await supertest(app)
                    .get(`/timelineEvent/${id}/files/?index=${index}`);
                expect(res.status).toBe(404);
            })
        })
    })
    describe("delete a file of a Timeline event by id and string file", () => {
        const mockTimelineEventId = "e850d073-44a4-4549-9cfd-066936cf02c5";
        describe("success", () => {
            it("should delete a file from a timeline event and return 200", async () => {
                const timelineEventWithFiles = {
                    "id": mockTimelineEventId,
                    "files": [
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760095Technical Interviews Preparation - week 4.docx",
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760096Support environment variable configuration1.pdf",
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760096React App (4).csv"
                    ]
                };
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(timelineEventWithFiles);
                jest.spyOn(timelineEventRepository, 'updateTimelineEvent').mockResolvedValueOnce(timelineEventWithFiles);
                const file: string = "incidence_649cbeda942a5d4d8bcf303b_1690964760096React App (4).csv";
                const res = await supertest(app).delete(`/timelineEvent/${mockTimelineEventId}/files?fileString=${file}`);
                if (res.status == 200) {
                    expect(res.status).toBe(200);
                }
                else {
                    expect(res.status).toBe(404);
                }
                expect(res.body).toEqual(timelineEventWithFiles);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).toHaveBeenCalledWith(mockTimelineEventId, timelineEventWithFiles);
            });
        })
        describe("error", () => {
            it("should return 404 if timeline event is not found", async () => {
                const id = "000";
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(null);
                const file: string = "incidence_649cbeda942a5d4d8bcf303b_IMS with Slack Integration.docx";
                const res = await supertest(app).delete(`/timelineEvent/${id}/files?fileString=${file}`);
                expect(res.status).toBe(404);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).not.toHaveBeenCalledWith(mockTimelineEventId);
            })
            it("should return 404 if string file is not valid", async () => {
                const timelineEventWithFiles = {
                    "id": mockTimelineEventId,
                    "files": [
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760095example (1).txt",
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760095Technical Interviews Preparation - week 4.docx",
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760096Support environment variable configuration1.pdf",
                        "incidence_649cbeda942a5d4d8bcf303b_1690964760096React App (4).csv"
                    ]
                };
                jest.spyOn(timelineEventService, 'getTimelineEventById').mockResolvedValueOnce(timelineEventWithFiles);
                const file: string = "xxx";
                const res = await supertest(app).delete(`/timelineEvent/${mockTimelineEventId}/files?fileString=${file}`);
                expect(res.status).toBe(404);
                expect(timelineEventService.getTimelineEventById).toHaveBeenCalledWith(mockTimelineEventId);
                expect(timelineEventRepository.updateTimelineEvent).not.toHaveBeenCalledWith(mockTimelineEventId);
            })
        })
    })
})