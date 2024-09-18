import { model, Schema } from 'mongoose';
const schema = new Schema({
    name: { type: String, required: true, min: 2, max: 20 },
    street: { type: String, required: true, min: 2, max: 20 },
    city: { type: String, required: true, min: 2, max: 20 },
    postCode: { type: String, required: true, min: 2, max: 20 },
    country: { type: String, required: true, min: 2, max: 20 },
    email: { type: String, required: true, min: 6, max: 50 },
    phone: { type: String, required: true, min: 6, max: 50 },
    password: { type: String, required: true, min: 6, max: 50 },
    avatar: { type: String },
    rank: {
        type: String,
        enum: ['OWNER', 'CAPTAIN', 'OFFICER', 'BUSON', 'AB', 'OS'],
        required: true,
    },
    token: { type: String },
});
export default model('CrewMember', schema);
