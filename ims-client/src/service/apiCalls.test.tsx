import axios from "axios";

import apiCalls from "./apiCalls";

jest.mock("axios"); // Mock the axios module

describe("apiCalls", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mock usage between tests
    });

    describe("getIncidents", () => {
        test("makes an HTTP GET request to the correct endpoint", async () => {
            (axios.get as jest.Mock).mockResolvedValue({ data: [] }); // Mock a successful response

            await apiCalls.getIncidents();

            expect(axios.get).toHaveBeenCalledWith("/incident");
        });

        test("returns a non-empty array", async () => {
            (axios.get as jest.Mock).mockResolvedValue({
                data: [{
                    _id: "649cbeda942a5d4d8bcf303c",
                    name: "Stuck Incident",
                    status: " Resolved",
                    description: "Issue Description",
                    priority: "P0",
                    type: "securing",
                    durationHours: " 24",
                    channelId: "",
                    slackLink: "",

                    channelName: "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",



                    tags:
                    {
                        _id: "64ad683127bcfa39135bf6cb",
                        id: "59cbeda942a5dd8bcf203h",
                        name: " inbox"
                    },
                    date: "2023-07-29T10:30:00.000Z",
                    createdAt: "2023-06-20T10:30:00.000Z",
                    updatedAt: "2023-06-28T10:30:00.000Z",
                    cost: "850"
                }]
            });

            const result = await apiCalls.getIncidents();

            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String)
                })
            ]));
        });

        test("handles errors", async () => {
            const error = new Error("Failed to create user");
            (axios.get as jest.Mock).mockRejectedValue(error); // Mock a rejected promise with an error
            await expect(apiCalls.getIncidents()).rejects.toThrowError(error);
        });
    });
});