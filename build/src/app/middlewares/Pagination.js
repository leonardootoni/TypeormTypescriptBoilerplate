/**
 * Default Pagination Middleware
 * @author Leonardo Otoni
 */
export default async (req, res, next) => {
    const { page = 1 } = req.query;
    const limit = 20;
    req.offset = (page - 1) * limit;
    req.limit = limit;
    return next();
};
//# sourceMappingURL=Pagination.js.map