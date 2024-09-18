import { db } from "@/lib/db/db";
import { inventories } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";

export async function POST(request: Request){
 const requestData = await request.json();
 let validatedData;
 try{
     validatedData = await inventorySchema.parse(requestData);
 }catch(err){   
        return Response.json({message: err}, {status:400});
    }
 try{ 
     await db.insert(inventories).values(validatedData);
     return Response.json({message: "Inventory created successfully"}, {status:201});
 }catch(err){
    return Response.json({message: err}, {status:500});
 }
}

// export async function GET(){
//     try{
//         const allDeliveryPersons = await db.select({
//             id:deliveryPersons.id,
//             name: deliveryPersons.name,
//             phone: deliveryPersons.phone,
//             warehouseId: deliveryPersons.warehouseId,
//             warehouseName: warehouses.name,
//             orderId: deliveryPersons.orderId,
//         }

//         ).from(deliveryPersons).leftJoin(warehouses,eq(deliveryPersons.warehouseId,warehouses.id)).orderBy(desc(deliveryPersons.id));
//         return Response.json(allDeliveryPersons);
//     }catch(err){
//         return Response.json({message: "Failed to fetchdelivery persons"}, {status:500});
//     }
 
// }