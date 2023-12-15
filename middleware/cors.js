export const corsMiddleware = (req, res,  next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET , PUT , PATCH ,POST , DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, X-Requested-With, Authorization,Accept');
    next();
}