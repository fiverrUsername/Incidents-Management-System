import IncidenceController from '../controllers/IncidentController';
import app from '../app';
import supertest from 'supertest';
import { json } from 'express';
import IncidentModel from '../models/IncidentModel';

describe("incidents", () => {
    describe("get all incidents",()=>{
        describe("succed",()=>{
            it("should return data",async()=>{
                const res=await supertest(app).get("/incident/");
                expect(res.status).toBe(200);
            })
        })
        describe("error",()=>{
            it("should return 404", async()=>{
                jest.spyOn(IncidentModel, 'find').mockRejectedValueOnce(new Error());
                const res=(await supertest(app).get("/incident/"));
                expect(res.status).toBe(404);
            })
        })
    })
    describe("get incident by ID", () => {
        describe("succeed", () => {
            it("should return data", async () => {
                const id="649cbeda942a5d4d8bcf3044"
                const res = await supertest(app).get(`/incident/${id}`);
                expect(res.status).toBe(200);
            });
        });
        describe("error", () => {
            it("should return 404", async () => {
                const id="987654";
                jest.spyOn(IncidentModel, 'findById').mockRejectedValueOnce(new Error());
                const res = await supertest(app).get(`/incident/${id}`);
                expect(res.status).toBe(404);
            });
        });
    })
    describe("add incident", () => {
        describe("success", () => {
            it("should add an incident and return 201", async () => {
                const newIncident = {
                    id: "444",
                    name: "Unresolved Incident adding",
                    status: "Active",
                    description: "Issue Description",
                    priority: "P3",
                    type: "technical",
                    durationHours: 24,
                    slackLink: "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
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
                    cost: 800
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
                    name:"i add this incident"
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
                    id: "555",
                    name: "Unresolved Incident adding",
                    status: "Active",
                    description: "Issue Description",
                    priority: "P3",
                    type: "technical",
                    durationHours: 24,
                    slackLink: "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
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
                const id="aaaf742a-12a2-4599-8825-d0f15917f9eb";
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
                    status: "Active",
                    description: "Issue Description",
                    priority: "P3",
                    type: "technical",
                    durationHours: 24,
                    slackLink: "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
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
                const id="aaa111";
                const res = await supertest(app)
                    .put(`/incident/updateIncident/${id}`)
                    .send(updatedIncident);
                expect(res.status).toBe(404);      
            })
            it("should return 422 on missing required fields",async()=>{
                jest.spyOn(IncidentModel, 'findByIdAndUpdate').mockRejectedValueOnce(new Error(''));
                const updatedIncident = {
                    name: "Unresolved Incident adding"
                }
                const id="aaaf742a-12a2-4599-8825-d0f15917f9eb";
                const res = await supertest(app)
                    .put(`/incident/updateIncident/${id}`)
                    .send(updatedIncident);
                expect(res.status).toBe(500);
            })
            it("should return 500 on error", async () => {
                jest.spyOn(IncidentModel, 'findByIdAndUpdate').mockRejectedValueOnce(new Error(''));
                const updatedIncident = {
                    name: "Unresolved Incident adding"
                }
                const id="aaaf742a-12a2-4599-8825-d0f15917f9eb";
                const res = await supertest(app)
                    .put(`/incident/updateIncident/${id}`)
                    .send(updatedIncident);
                expect(res.status).toBe(500);
            })
        })
    })
    describe("get summary incident",()=>{
        describe("succed",()=>{
            it("should return data",async()=>{
                const id="649cbeda942a5d4d8bcf3044"
                const res=await supertest(app).get(`/incident/${id}`);
                expect(res.status).toBe(200);
            })
        })
        describe("error",()=>{
            it("should return 404", async()=>{
                jest.spyOn(IncidentModel, 'findById').mockRejectedValueOnce(new Error());
                const id="5555";
                const res=(await supertest(app).get(`/incident/${id}`));
                expect(res.status).toBe(404);
            })
        })
    })
})
