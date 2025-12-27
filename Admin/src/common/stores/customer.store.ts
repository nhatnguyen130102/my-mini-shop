"use client"
import { create } from "zustand";
import { ICustomer } from "../interface/customer-interface";
import { ICustomerType } from "../interface/customer-type-interface";
import { ICart } from "../interface/cart-interface";

interface ICustomerStore {
    carts: ICart[] | [];
    setCarts: (carts: ICart[] | []) => void;

    selectedCart: ICart | null;
    setSelectedCart: (cart: ICart | null) => void;

    customerTypes: ICustomerType[] | [];
    setCustomerTypes: (customerTypes: ICustomerType[] | []) => void;

    selectedCustomerType: ICustomerType | null;
    setSelectedCustomerType: (customerType: ICustomerType | null) => void;

    customers: ICustomer[] | [];
    setCustomers: (customers: ICustomer[] | []) => void;

    selectedCustomer: ICustomer | null;
    setSelectedCustomer: (customer: ICustomer | null) => void;
}

export const useCustomerStore = create<ICustomerStore>((set) => ({
    carts: [],
    setCarts: (s) => set({ carts: s }),

    selectedCart: null,
    setSelectedCart: (s) => set({ selectedCart: s }),

    customerTypes: [],
    setCustomerTypes: (s) => set({ customerTypes: s }),

    selectedCustomerType: null,
    setSelectedCustomerType: (s) => set({ selectedCustomerType: s }),

    customers: [],
    setCustomers: (s) => set({ customers: s }),

    selectedCustomer: null,
    setSelectedCustomer: (s) => set({ selectedCustomer: s }),
}));
