import { client } from "./const";
export async function getUsers() {
    try {
      const result = await client.users.list();
    } catch (error) {
      console.error(error);
    }
}
