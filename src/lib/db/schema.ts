import { sql } from "drizzle-orm";
import { pgTable,serial,varchar,text, timestamp, integer, index } from "drizzle-orm/pg-core";

export const users = pgTable("users",
    {
        id:serial("id").primaryKey(),
        fname: varchar("fname", { length: 100 }).notNull(),
        lname: varchar("lname", { length: 100 }).notNull(),
        email: varchar("email", { length: 100 }).unique().notNull(),
        provider: varchar("provider",{length: 30}),
        external_id: varchar("external_id", { length: 100 }).notNull(),
        image: text("image").notNull(),
        role: varchar("role", { length:12}).notNull().default("customer"),
        updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
        created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),

    }
)

export const products = pgTable("products", {
    id:serial("id").primaryKey(),
    name:varchar("name" ,{length:100}).notNull(),
    image:text("image"),
    description: text("description"),
    price: integer("price").notNull(),
    updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),

})

export const warehouses = pgTable("warehouses",{
    id:serial("id").primaryKey(),
    name:varchar("name" ,{length:100}).notNull(),
    pincode: varchar('pincode', {length: 6}).notNull(), //to make search faster
    updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
},(table) => {
    return {
        pincodeIdx: index("pincode_idx").on(table.pincode)
    }
})