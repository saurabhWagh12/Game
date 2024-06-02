import mongoose,{Schema} from 'mongoose';

const ScoreModel = new mongoose.Schema({
    score:String,
})

export const Score = mongoose.models.Score || mongoose.model('Score',ScoreModel);
