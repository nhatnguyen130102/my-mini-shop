// @ts-check

export const HelperPopulate = (data, populate = []) => {
    if (populate.length > 0) {
        populate.forEach(f => {
            data = data.populate(f);
        });
    }
    return data;
};
