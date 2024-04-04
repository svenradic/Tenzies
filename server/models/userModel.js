import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    highScore:{
      type: Number,
      default: 9999
    }
  }
)

export const User = mongoose.model('Cat', userSchema);