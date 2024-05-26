const mongoose = require("mongoose")
const { Schema, model } = mongoose;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoStore = new Schema({
     videoFiles:{
          type:String,
          require:true
     },
     thumbnail:{
          type:String,
          require:true
     },
     owner:{
          type: Schema.Types.ObjectId,
          ref:"user"
     },
     title:{
          type:String,
          require:true
     },
     description:{
          type:String,
          require:true
     },
     duration:{
          type:Number,
          require:true
     },
     view:{
          type:Number,
          default:0
     },
     isPublish:{
          type:Boolean,
          require:true
     }
     

},{timestamps:true})
     
videoStore.plugin(aggregatePaginate)  // able to write aggrigate piplines

const video=model("video",videoStore)

module.exports={
     video
}