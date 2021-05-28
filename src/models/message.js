import mongoose from 'mongoose';

const Message = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isPalidrome: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

Message.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export default mongoose.model('Message', Message);
