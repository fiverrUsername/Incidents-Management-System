// import app from '../app';
// import supertest from 'supertest';
// import IncidentModel from '../models/IncidentModel';


// describe("get all incidents",()=>{
//        describe("succed",()=>{
//          it("should return data",async()=>{
//            const res=await supertest(app).get("/incident/");
//            expect(res.status).toBe(200);
//          })
//        })
//        describe("error",()=>{
//          it("should return 404", async()=>{
//            jest.spyOn(IncidentModel, 'find').mockRejectedValueOnce(new Error());
//            const res=(await supertest(app).get("/incident/"));
//            expect(res.status).toBe(404);
//          })
//        })
//      });

//      describe("get incident by ID", () => {
//        describe("succeed", () => {
//          it("should return data", async () => {
//            const res = await supertest(app).get("/incident/d268a4a4-4e4f-440a-b590-59a0c8dc6ce3");
//            expect(res.status).toBe(200);
//          });
//        });
//        describe("error", () => {
//          it("should return 404", async () => {
//            jest.spyOn(IncidentModel, 'findById').mockRejectedValueOnce(new Error());
//            const res = await supertest(app).get("/incident/987654");
//            expect(res.status).toBe(404);
//          })
//        })
//      });
     
//      describe("update incident", () => {
//               describe("success", () => {
//                  it("should update an incident and return 200", async () => {
//                     const updatedIncident = {
//                         "id": "999",
//                         "name": "Critical Eventttt",
//                         "status": "Active",
//                         "description": "Issue Description",
//                         "priority": "P1",
//                         "type": "comment",
//                         "durationHours": 48,
//                         "slackLink": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
//                         "tags": [
//                           {
//                             "id": "59cbeda942a5dd8bcf203h",
//                             "name": "inbox",
//                             "_id": "64ac02d0cd338c6156f363ec"
//                           },
//                           {
//                             "id": "45sfeda992a5dd8bcf403m",
//                             "name": "checkout",
//                             "_id": "64ac02d0cd338c6156f363ed"
//                           }
//                         ],
//                         "date": "2023-07-29T10:30:00.000Z",
//                         "createdAt": "2023-07-05T10:30:00.000Z",
//                         "updatedAt": "2023-08-15T10:30:00.000Z",
//                         "cost": 1000,
//                       }
//                     const res = await supertest(app)
//                        .put("/incident/updateIncident/d268a4a4-4e4f-440a-b590-59a0c8dc6ce3")
//                        .send(updatedIncident);
//                     expect(res.status).toBe(200);
//                  })
//               })
//               describe("error", () => {
//                  it("should return 404 if incident not found", async () => {
//                     jest.spyOn(IncidentModel, 'findByIdAndUpdate').mockResolvedValueOnce(null);
//                     const updatedIncident = {
//                         "id": "999",
//                         "name": "Critical Eventttt",
//                         "status": "Active",
//                         "description": "Issue Description",
//                         "priority": "P1",
//                         "type": "comment",
//                         "durationHours": 48,
//                         "slackLink": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
//                         "tags": [
//                           {
//                             "id": "59cbeda942a5dd8bcf203h",
//                             "name": "inbox",
//                             "_id": "64ac02d0cd338c6156f363ec"
//                           },
//                           {
//                             "id": "45sfeda992a5dd8bcf403m",
//                             "name": "checkout",
//                             "_id": "64ac02d0cd338c6156f363ed"
//                           }
//                         ],
//                         "date": "2023-07-29T10:30:00.000Z",
//                         "createdAt": "2023-07-05T10:30:00.000Z",
//                         "updatedAt": "2023-08-15T10:30:00.000Z",
//                         "cost": 1000
//                       }
//                     const res = await supertest(app)
//                        .put("/incident/updateIncident/d268a4a4-4e4f-440a-b590-59a0c8dc6ct4")
//                        .send(updatedIncident);
//                     expect(res.status).toBe(404);
//                  })
//                  it("should return 422 on error", async () => {
//                     jest.spyOn(IncidentModel, 'findByIdAndUpdate').mockRejectedValueOnce(new Error());
//                     const updatedIncident = {
//                         "name": "Critical Eventttt",
//                         "status": "Active",
//                         "description": "Issue Description",
//                         "priority": "P1",
//                         "type": "comment",
//                         "durationHours": 48,
//                         "slackLink": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
//                         "tags": [
//                           {
//                             "id": "59cbeda942a5dd8bcf203h",
//                             "name": "inbox",
//                             "_id": "64ac02d0cd338c6156f363ec"
//                           },
//                           {
//                             "id": "45sfeda992a5dd8bcf403m",
//                             "name": "checkout",
//                             "_id": "64ac02d0cd338c6156f363ed"
//                           }
//                         ],
//                         "date": "2023-07-29T10:30:00.000Z",
//                         "createdAt": "2023-07-05T10:30:00.000Z",
//                         "updatedAt": "2023-08-15T10:30:00.000Z",
//                         "cost": 1000,
//                       }
//                     const res = await supertest(app)
//                        .put("/incident/updateIncident/d268a4a4-4e4f-440a-b590-59a0c8dc6ce3")
//                        .send(updatedIncident);
//                     expect(res.status).toBe(422);
//                  })
//               })
//            });

//      describe("add incident", () => {
//        describe("success", () => {
//          it("should add an incident and return 201", async () => {
//            const newIncident = {
//             "id": "11",
//             "name": "Critical Eventttt",
//             "status": "Active",
//             "description": "Issue Description",
//             "priority": "P1",
//             "type": "comment",
//             "durationHours": 48,
//             "slackLink": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
//             "tags": [
//                 {
//                     "id": "59cbeda942a5dd8bcf203h",
//                     "name": "inbox",
//                     "_id": "64ac02d0cd338c6156f363ec"
//                 },
//                 {
//                     "id": "45sfeda992a5dd8bcf403m",
//                     "name": "checkout",
//                     "_id": "64ac02d0cd338c6156f363ed"
//                 }
//             ],
//             "date": "2023-07-29T10:30:00.000Z",
//             "createdAt": "2023-07-05T10:30:00.000Z",
//             "updatedAt": "2023-08-15T10:30:00.000Z",
//             "cost": 1000
//            }
//            const res = await supertest(app)
//               .post("/incident/addIncident")
//               .send(newIncident);
//            expect(res.status).toBe(201);
//          });
//        });
//        describe("error", () => {
//          it("should return 500 on error", async () => {
//            jest.spyOn(IncidentModel, 'create').mockRejectedValueOnce(new Error());
//            const newIncident = {
//               name:"i add this incident"
//            };
//            const res = await supertest(app)
//               .post("/incident/addIncident")
//               .send(newIncident);
//            expect(res.status).toBe(500);
//          });
//        });
//      })


