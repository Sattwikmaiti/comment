const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//making model (dabase)
const Todoschema = new Schema({
text: {
    //objects
    type:String,
    default:"",
    required:true


},
author: {
    //objects
    type:String,
    default:"",
    required:true


},
complete:
{
    type:Boolean,
    default:false

}
,
timestamp:
{
 type:String,
 default:new Date().getTime()
}
})
//exporting the model of todo list
const Todo =mongoose.model("Todo",Todoschema)
module.exports=Todo