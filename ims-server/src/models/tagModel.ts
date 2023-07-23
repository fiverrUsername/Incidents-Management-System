import mongoose, { Schema } from 'mongoose'
import { type ITag } from '../interfaces/tagInterface'

export const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})
export default mongoose.model<ITag>('Tag', TagSchema)
