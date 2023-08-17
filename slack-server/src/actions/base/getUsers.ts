import { client } from "../../constPage";

export async function getUsers() {
  try {
    await client.users.list();
  } catch (error) {
    console.error(error);
  }
}
