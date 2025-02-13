import mongoose , {Schema, models, model} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser{
    email:string,
    name : string,
    password : string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

const UserSchema = new Schema <IUser>(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }

    }
    ,
    {timestamps: true}
)

    //prehook for password hashing
    UserSchema.pre("save", async function(next){
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password , 10)
        }
        next()
    })

    const user = models?.user || model("user", UserSchema)

    export default user
