import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tag:String,
  category: String,
  
  createdDate: {
    type: Date,
    default: Date.now
  },
  isDraft:{
    type:Boolean,
    default:false
  }
})

const blogModel = mongoose.models.blog || mongoose.model('blog',blogSchema)

export default blogModel;