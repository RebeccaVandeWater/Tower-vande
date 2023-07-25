import { Schema } from "mongoose";

export const EventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  description: { type: String, maxLength: 700, minLength: 3 },
  coverImg: { type: String, maxlength: 500, minLength: 3 },
  location: { type: String, maxLength: 500, minLength: 3 },
  capacity: { type: Number, max: 500000, min: 1, required: true },
  startDate: { type: Date, required: true },
  isCancelled: { type: Boolean, default: false, required: true },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'ticketId',
  ref: 'Ticket',
  count: true
})