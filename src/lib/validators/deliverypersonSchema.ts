import { z } from "zod";

export const deliveryPersonSchema = z.object({
    name: z.string({message:"Delivery Person's name should be a string" }),
    phone:z
    .string({message:"phone should be a string with length 13"})
    .length(13,'Phone number of delivery person should be 13 digits with country code +91'),
    warehouseId:z.number({message:"warehouseId should be a number"}),
});