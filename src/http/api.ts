import {
    DeliveryPerson,
    Inventory,
    InventoryData,
    OrderData,
    OrderStatusData,
    Warehouse,
} from '@/types';
import { api } from './client'

//Products

export const getAllProducts = async () => {
    const response = await api.get("/products");
    return await response.data;
}

export const createProduct = async(data: FormData)=> {
    const response = await api.post('/products', data, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })

    return response.data;
}

//Warehouses
export const getAllWarehouses = async () => {
    const response = await api.get('/warehouses');
    return await response.data;
};

export const createWarehouse = async (data: Warehouse) => {
    const response = await api.post('/warehouses', data);
    return response.data;
};

//Delivery Person
export const getAllDeliveryPersons = async () => {
    const response = await api.get('/delivery-persons');
    return await response.data;
};


export const createDeliveryPerson = async (data: DeliveryPerson) => {
    const response = await api.post('/delivery-persons', data);
    return response.data;
};

//Inventories

export const getAllInventories = async () => {
    const response = await api.get('/inventories');
    return await response.data;
};

export const createInventory = async (data: InventoryData) => {
    const response = await api.post('/inventories', data);
    return response.data;
};