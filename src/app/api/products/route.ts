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
    if (!validatedData.image || !(validatedData.image instanceof File)) {
        return new Response(
          JSON.stringify({ message: "Image is required and must be a valid file" }),
          { status: 400 }
        );
      }
    const filename = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`;

   
      
    try{
        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets", filename), new Uint8Array(buffer));
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
// import { db } from "@/lib/db/db";
// import { products } from "@/lib/db/schema";
// import { productSchema } from "@/lib/validators/productSchema";
// import { writeFile } from "node:fs/promises";
// import path from "node:path";

// export async function POST(request: Request) {
//   const data = await request.formData();
  
//   // Extract the image and check if it's valid
//   const image = data.get("image");
//   if (!image || !(image instanceof File)) {
//     return new Response(
//       JSON.stringify({ message: "Image is required and must be a valid file" }),
//       { status: 400 }
//     );
//   }

//   // Validate other fields
//   let validatedData;
//   try {
//     validatedData = productSchema.parse({
//       name: data.get("name"),
//       description: data.get("description"),
//       price: Number(data.get("price")),
//       image, // Now `image` is safely a File
//     });
//   } catch (err) {
//     console.error("Validation error:", err);
//     return new Response(JSON.stringify({ message: "Invalid data" }), { status: 400 });
//   }

//   const filename = `${Date.now()}.${image.name.split(".").pop()}`;
//   const assetsPath = path.join(process.cwd(), "public/assets");

//   try {
//     const buffer = Buffer.from(await image.arrayBuffer());
//     await writeFile(path.join(assetsPath, filename), new Uint8Array(buffer));
//   } catch (err) {
//     console.error("File write error:", err);
//     return new Response(
//       JSON.stringify({ message: "Failed to save the file to the filesystem" }),
//       { status: 500 }
//     );
//   }

//   try {
//     await db.insert(products).values({ ...validatedData, image: filename });
//   } catch (err) {
//     console.error("Database error:", err);
//     return new Response(
//       JSON.stringify({ message: "Failed to store product in the database" }),
//       { status: 500 }
//     );
//   }

//   return new Response(
//     JSON.stringify({ message: "Product created successfully" }),
//     { status: 201 }
//   );
// }
