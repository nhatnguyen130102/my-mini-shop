//@ts-check
export const HelperPopulate = (query, populate = []) => {
    populate.forEach(field => query.populate(field));
    return query;
};