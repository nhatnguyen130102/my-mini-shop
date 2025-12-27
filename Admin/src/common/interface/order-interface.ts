import { BaseEntity, IItemDetail } from "./base-interface";
import { ICustomer } from "./customer-interface";
import { IEmployee } from "./employee-interface";
import { IOrderMethod } from "./order-method-interface";
import { IPaymentMethod } from "./payment-method-interface";
import { IVoucher } from "./voucher-interface";


export interface IOrder extends BaseEntity, UpdateOrderPayload {
    isDeleted: boolean,
    customer: ICustomer,
    orderMethod: IOrderMethod,
    paymentMethod: IPaymentMethod,
    employee: IEmployee,
    voucher: IVoucher,
    name: string,
}

export interface UpdateOrderPayload extends CreateOrderPayload {
    id: string,
}

export interface CreateOrderPayload {
    isActive: boolean,
    description: string,
    orderMethodId: string,
    paymentMethodId: string,
    employeeId?: string,
    voucherId?: string,
    orderItem: IItemDetail[],
    status: string,
    customerId?: string,
}
