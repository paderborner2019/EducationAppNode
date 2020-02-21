import mongoose, {model} from 'mongoose';
import { Role } from '../../features/shared/enums/role';
import { User }  from "../../features/user/api";
import mongoosePaginate from 'mongoose-paginate'

const schema = mongoose.Schema;

export const usersSchema = new schema({
    userName: { type: String, unique: true, required: true },
    email: {type: String, unique: true, required: true},
    avatar: {type: String},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: { type: Role, required: true, default: Role.User },
    removed_at: { type: Boolean, default: false }
});

usersSchema.plugin(mongoosePaginate);

interface userModel extends User,mongoose.Document {}
const userModel = model<userModel>('User', usersSchema);
export default userModel;

