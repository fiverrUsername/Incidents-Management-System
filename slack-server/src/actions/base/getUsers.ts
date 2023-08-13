import { client } from "../../const";

export async function getUsers() {
  try {
    await client.users.list();
  } catch (error) {
    console.error(error);
  }
}
