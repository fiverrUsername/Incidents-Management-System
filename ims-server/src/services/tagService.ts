import tagRepository from '../repositories/tagRepository';
import { ITag } from '../interfaces/tagInterface';

class TagService {

  async addTag(newTag: ITag): Promise<void> {
    try {
      await tagRepository.addTag(newTag);
    } catch (error) {
      console.error(`error: ${error}`);
      throw error;
    }
  }

  async getAllTags(): Promise<ITag[]> {
    try {
      const tags = await tagRepository.getAllTags();
      if (tags === null) {
        throw new Error('Failed to retrieve tags');
      }
      return tags;
    } catch (error) {
      console.error(`error: ${error}`);
      throw error;
    }
  }

}

export default new TagService();