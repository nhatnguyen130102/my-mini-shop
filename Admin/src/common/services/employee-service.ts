import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iEmp from "../interface/employee-interface"

export const employeeService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iEmp.IEmployee[]>>(
            `${API.EMPLOYEE_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iEmp.IEmployee>>(API.EMPLOYEE_GETBY(id))
    },

    create(body: iEmp.CreateEmployeePayload) {
        return http.post<BaseResponse<iEmp.IEmployee>>(API.EMPLOYEE_CREATE, body)
    },

    createMany(body: iEmp.CreateEmployeePayload[]) {
        return http.post<BaseResponse<iEmp.IEmployee[]>>(API.EMPLOYEE_CREATE_MANY, body)
    },

    update(id: string, body: iEmp.UpdateEmployeePayload) {
        return http.put<BaseResponse<iEmp.IEmployee>>(API.EMPLOYEE_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iEmp.IEmployee>>(API.EMPLOYEE_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iEmp.IEmployee>>(API.EMPLOYEE_CHANGESTATUS(id))
    },
}