import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
})