"use client"
import { create } from "zustand";
import { IOrder } from "../interface/order-interface";
import { IOrderMethod } from "../interface/order-method-interface";
import { IPaymentMethod } from "../interface/payment-method-interface";

interface IOrderStore {
    paymentMethods: IPaymentMethod[] | [];
    setPaymentMethods: (paymentMethods: IPaymentMethod[] | []) => void;

    selectedPaymentMethod: IPaymentMethod | null;
    setSelectedPaymentMethod: (paymentMethod: IPaymentMethod | null) => void;

    orderMethods: IOrderMethod[] | [];
    setOrderMethods: (orderMethods: IOrderMethod[] | []) => void;

    selectedOrderMethod: IOrderMethod | null;
    setSelectedOrderMethod: (orderMethod: IOrderMethod | null) => void;

    orders: IOrder[] | [];
    setOrders: (orders: IOrder[] | []) => void;

    selectedOrder: IOrder | null;
    setSelectedOrder: (order: IOrder | null) => void;
}

export const useOrderStore = create<IOrderStore>((set) => ({
    paymentMethods: [],
    setPaymentMethods: (s) => set({ paymentMethods: s }),

    selectedPaymentMethod: null,
    setSelectedPaymentMethod: (s) => set({ selectedPaymentMethod: s }),

    orderMethods: [],
    setOrderMethods: (s) => set({ orderMethods: s }),

    selectedOrderMethod: null,
    setSelectedOrderMethod: (s) => set({ selectedOrderMethod: s }),

    orders: [],
    setOrders: (s) => set({ orders: s }),

    selectedOrder: null,
    setSelectedOrder: (s) => set({ selectedOrder: s }),
}));
