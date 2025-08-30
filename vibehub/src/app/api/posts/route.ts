import { connectDB } from "@/app/lib/mongoDB";


export async function GET(){
    await connectDB();
    

}