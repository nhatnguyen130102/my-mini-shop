import { BaseEntity } from "./base-interface";
import { ICustomer } from "./customer-interface";
import { IEmployee } from "./employee-interface";
import { IOrderMethod } from "./order-method-interface";
import { IPaymentMethod } from "./payment-method-interface";
import { IProduct } from "./product-interface";
import { IVoucher } from "./voucher-inteface";

export interface IOrderItem {
    productId: string;
    product: IProduct;
    quantity: number;
    price: number;
    total: number;
}

export interface IOrder extends BaseEntity, UpdateOrderPayload {
    isDeleted: boolean,
    customer: ICustomer,
    orderMethod: IOrderMethod,
    paymentMethod: IPaymentMethod,
    employee: IEmployee,
    voucher: IVoucher,
}

export interface UpdateOrderPayload extends CreateOrderPayload {
    id: string,
}

export interface CreateOrderPayload {
    isActive: boolean,
    description: string,
    name: string,
    orderMethodId: string,
    paymentMethodId: string,
    employeeId: string,
    voucherId: string,
    orderItem: IOrderItem[],
}
