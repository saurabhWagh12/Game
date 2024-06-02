import { ConnectDB } from "@/app/DB/ConnectDB";
import { Score } from "@/app/DB/model";
import { NextResponse } from "next/server";
ConnectDB()

export async function GET(request){
    try{
        const score = await Score.findById('65a3dcb297bcaa38545c6084');
        return NextResponse.json({status:200,message:'Success',score:Number(score.score)});
    }catch(error){
        return NextResponse.json({status:400,message:'Error in Get'});
    }
}

export async function POST(request){
    try {
        const data = await request.json();
        const score = await Score.findById('65a3dcb297bcaa38545c6084');
        score.score = data.score;
        score.save();
        return NextResponse.json({status:200,message:'Success'});
    } catch (error) {
        return NextResponse.json({status:400,message:'Error In Post'});
    }
}


