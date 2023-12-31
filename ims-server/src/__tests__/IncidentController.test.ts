import app from '../app';
import supertest from 'supertest';
import IncidentModel from '../models/IncidentModel';
import { Priority, Status } from '../enums/enum';

describe("incidents", () => {
    describe("get all incidents", () => {
        describe("succed", () => {
            it("should return data", async () => {
                const res = await supertest(app).get("/incident/");
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404", async () => {
                jest.spyOn(IncidentModel, 'find').mockRejectedValueOnce(new Error());
                const res = (await supertest(app).get("/incident/"));
                expect(res.status).toBe(404);
            })
        })
    })
    describe("get incident by ID", () => {
        describe("succeed", () => {
            it("should return data", async () => {
                const id = "649cbeda942a5d4d8bcf303b"
                const res = await supertest(app).get(`/incident/${id}`);
                expect(res.status).toBe(200);
            });
        });
        describe("error", () => {
            it("should return 404", async () => {
                const id = "987654";
                jest.spyOn(IncidentModel, 'findOne').mockRejectedValueOnce(new Error());
                const res = await supertest(app).get(`/incident/${id}`);
                expect(res.status).toBe(404);
            });
        });
    })
    describe("add incident", () => {
        describe("success", () => {
            it("should add an incident and return 201", async () => {
                const newIncident = {
                    "name": "Stuck Incident",
                    "status": Status.Active,
                    "description": "Issue Description",
                    "currentPriority": "p0",
                    "type": "comment",
                    "durationHours": 71,
                    "slackLink": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
                    "currentTags": [],
                    "date": "2023-07-29T13:30:00Z",
                    "createdAt": "2023-07-01T13:30:00Z",
                    "updatedAt": "2023-07-03T13:30:00Z",
                    "cost": 1600,
                    "createdBy": "aaa",
                    "channelName": "channel name"
                }
                const res = await supertest(app)
                    .post("/incident/addIncident")
                    .send(newIncident);
                expect(res.status).toBe(201);
            });
        });
        describe("error", () => {
            it("should return 500 on error", async () => {
                jest.spyOn(IncidentModel, 'create').mockRejectedValueOnce(new Error());
                const newIncident = {
                    name: "i add this incident"
                };
                const res = await supertest(app)
                    .post("/incident/addIncident")
                    .send(newIncident);
                expect(res.status).toBe(500);
            });
        });
    })
    describe("update incident", () => {
        describe("success", () => {
            it("should update an incident and return 200", async () => {
                const updatedIncident = {
                    "name": "Unresolved Incident adding",
                    "status": Status.Active,
                    "description": "Issue Description",
                    "currentPriority": "P3",
                    "type": "technical",
                    "durationHours": 24,
                    "channelId": "",
                    "slackLink": "",
                    "channelName": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
                    "currentTags": [
                        {
                            "id": "45sfeda992a5dd8bcf403m",
                            "name": "checkout",
                            "_id": "64b3b4e485111aaa57652310"
                        }
                    ],
                    "date": "2023-07-29T10:30:00.000Z",
                    "createdAt": "2023-07-05T10:30:00.000Z",
                    "updatedAt": "2023-08-15T10:30:00.000Z",
                    "cost": 900,
                    "createdBy":"someone"
                }
                const id = "649cbeda942a5d4d8bcf303b";
                const res = await supertest(app)
                    .put(`/incident/updateIncident/${id}`)
                    .send(updatedIncident);
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404 if incident not found", async () => {
                jest.spyOn(IncidentModel, 'findByIdAndUpdate').mockResolvedValueOnce(null);
                const updatedIncident = {
                    id: "555",
                    name: "Unresolved Incident adding",
                    status: Status.Active,
                    description: "Issue Description",
                    priority: Priority.P3,
                    type: "technical",
                    durationHours: 24,
                    channelId: "",
                    slackLink: "",

                    channelName: "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
                    tags: [
                        {
                            "id": "45sfeda992a5dd8bcf403m",
                            "name": "checkout",
                            "_id": "64b3b4e485111aaa57652310"
                        }
                    ],
                    date: "2023-07-29T10:30:00.000Z",
                    createdAt: "2023-07-05T10:30:00.000Z",
                    updatedAt: "2023-08-15T10:30:00.000Z",
                    cost: 900
                }
                const id = "aaa111";
                const res = await supertest(app)
                    .put(`/incident/updateIncident/${id}`)
                    .send(updatedIncident);
                expect(res.status).toBe(404);
            })
            it("should return 500 on error", async () => {
                jest.spyOn(IncidentModel, 'findOneAndUpdate').mockRejectedValueOnce(new Error());
                const updatedIncident = {
                    name: "Unresolved Incident adding"
                }
                const id = "649cbeda942a5d4d8bcf303b";
                const res = await supertest(app)
                    .put(`/incident/updateIncident/${id}`)
                    .send(updatedIncident);
                expect(res.status).toBe(500);
            })
        })
    })
    describe("get summary incident", () => {
        describe("succed", () => {
            it("should return data", async () => {
                const id = "0de79832-339b-49df-bdeb-aa9425f77564"
                const res = await supertest(app).get(`/incident/result/summary/${id}`);
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404", async () => {
                // jest.spyOn(IncidentModel, 'findById').mockResolvedValueOnce(new Error());
                const id = "5555";
                const res = (await supertest(app).get(`/incident/${id}`));
                expect(res.status).toBe(404);
            })
        })
    })
})
