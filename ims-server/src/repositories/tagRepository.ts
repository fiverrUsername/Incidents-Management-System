import { ITag } from '../interfaces/tagInterface';
import tagModel from '../models/tagModel';

class TagRepository {

  async addTag(newTag: ITag): Promise<ITag | null> {

    try {
      const createdTag = await tagModel.create(newTag);
      return createdTag;
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async getAllTags(): Promise<ITag[] | null> {
    try {
      const tags = await tagModel.find();
      return tags;
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

}
export default new TagRepository();