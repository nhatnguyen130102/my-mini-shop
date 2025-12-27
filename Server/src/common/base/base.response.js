//@ts-check
export const BaseResponse = (records, message = "success", isSuccess = true, totalRecord) => {
    const total = totalRecord ? totalRecord : Array.isArray(records) ? records.length : records != null ? 1 : 0;
    return {
        isSuccess,
        message,
        total,
        data: records
    }
}