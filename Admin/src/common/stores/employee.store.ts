"use client"
import { create } from "zustand";
import { IEmployee } from "../interface/employee-interface";

interface IEmployeeStore {
    employees: IEmployee[] | [];
    setEmployees: (employees: IEmployee[] | []) => void;

    selectedEmployee: IEmployee | null;
    setSelectedEmployee: (employee: IEmployee | null) => void;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
    employees: [],
    setEmployees: (s) => set({ employees: s }),

    selectedEmployee: null,
    setSelectedEmployee: (s) => set({ selectedEmployee: s }),
}));
