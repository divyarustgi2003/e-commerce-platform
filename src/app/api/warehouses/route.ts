import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request){
    const requestData = await request.json();

    let validatedData;
    try{
        validatedData = await warehouseSchema.parse(requestData);
    }catch(err){
        return Response.json({message: err}, {status: 400});
    }

    try{
        await db.insert(warehouses).values(validatedData);
        return Response.json({message: "Warehouse created successfully"}, {status: 201});
    }catch(err){
        return Response.json({message: "Failed to store warehouse into the database"}, {status: 500});
    }
}
export async function GET(){
    try{
      const allwarehouse = await db.select().from(warehouses);
      return Response.json(allwarehouse);
    }catch(err){
     return Response.json({message: 'Failed to get all the warehouses'}, {status: 500});
    }

 }