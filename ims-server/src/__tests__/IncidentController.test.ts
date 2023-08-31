import app from '../app';
import supertest from 'supertest';
import IncidentModel from '../models/IncidentModel';
import { Priority, Status } from '../enums/enum';

describe("incidents", () => {
    describe("get all incidents", () => {
        describe("succed", () => {
            it("should return data", async () => {
                jest.spyOn(IncidentModel, 'find').mockResolvedValueOnce([]);
                const res = await supertest(app).get("/incident");
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404", async () => {
                jest.spyOn(IncidentModel, 'find').mockRejectedValueOnce(new Error());
                const res = (await supertest(app).get("/incident"));
                expect(res.status).toBe(404);
            })
        })
    })
    describe("get incident by ID", () => {
        describe("succeed", () => {
            it("should return data", async () => {
                const id = "1c740683-624e-4002-b79e-e526a755014a"
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
                    "name": "Stuck Incident",
                    "status": "Active",
                    "description": "Issue Description",
                    "currentPriority": "p0",
                    "type": "comment",
                    "durationHours": 72,
                    "channelName": "channel name",
                    "slackLink": "https://slack.com/app_redirect?channel=null",
                    "currentTags": [],
                    "date": "2023-07-29T13:30:00Z",
                    "createdAt": "2023-07-01T13:30:00Z",
                    "updatedAt": "2023-07-03T13:30:00Z",
                    "cost": 1600,
                    "createdBy": "aaa",
                    "channelId": ""
                  }
                const id = "f23d13fc-d1b3-46e9-a278-8cb820db8983";
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
        })
    })
    describe("get summary incident", () => {
        describe("succed", () => {
            it("should return data", async () => {
                const id = "1c740683-624e-4002-b79e-e526a755014a"
                const res = await supertest(app).get(`/incident/result/summary/${id}`);
                expect(res.status).toBe(200);
            })
        })
        describe("error", () => {
            it("should return 404", async () => {
                const id = "5555";
                const res = (await supertest(app).get(`/incident/result/summary/${id}`));
                expect(res.status).toBe(404);
            })
        })
    })
})
