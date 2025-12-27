"use client"
import { create } from "zustand";
import { IVoucher } from "../interface/voucher-interface";

interface IVoucherStore {
    vouchers: IVoucher[] | [];
    setVouchers: (vouchers: IVoucher[] | []) => void;

    selectedVoucher: IVoucher | null;
    setSelectedVoucher: (voucher: IVoucher | null) => void;
}

export const useVoucherStore = create<IVoucherStore>((set) => ({
    vouchers: [],
    setVouchers: (s) => set({ vouchers: s }),

    selectedVoucher: null,
    setSelectedVoucher: (s) => set({ selectedVoucher: s }),
}));
