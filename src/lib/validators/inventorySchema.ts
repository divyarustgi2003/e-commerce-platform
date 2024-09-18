import { z } from "zod";

export const inventorySchema = z.object({
    sku:z.string({message:'SKU should be a string'}).length(8,'SKU should be 8 characters long'),
    warehouseId:z.number({message:"warehouseId should be a number"}),
    productId:z.number({message:"productId should be a number"}),

});