import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  towerEventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })


TicketSchema.virtual('towerEvent', {
  localField: 'towerEventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})