import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { writeFile } from "node:fs/promises";
import path from "node:path";


export async function POST(request: Request){
    const data = await request.formData();
    let validatedData;
    try{
        validatedData = productSchema.parse({
            name:data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image')
        });
    } catch(err){
        return Response.json({message: err}, {status: 400});
    }
    const filename = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`;

    try{
        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets", filename), buffer);
    }catch(err){
        return Response.json({message: "Failed to save the file to fs"}, {status: 500});
    }

    try{
        await db.insert(products).values({...validatedData, image: filename})
    } catch(err){
        return Response.json({message: "failed to store product into the database"}, {status: 500});
    }

    return Response.json({message: "Product created successfully"}, {status: 201});
}

export async function GET(){
   try{
     const allproducts = await db.select().from(products).orderBy(desc(products.id));
     return Response.json(allproducts);
   }catch(err){
    return Response.json({message: 'Failed to get all the products'}, {status: 500});
   }

}
