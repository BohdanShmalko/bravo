const UNAUTHORIZED_REQUEST = 'Unauthorized request'

module.exports = (requiredStatus) => (req, res, next) => {
    if(!req.jwtParams) return res.status(401).send(UNAUTHORIZED_REQUEST);

    const { userId, userStatus } = req.jwtParams
    if (!userId || !userStatus) return res.status(401).send(UNAUTHORIZED_REQUEST);

    if(userStatus !== requiredStatus) return res.status(403).send('You don\'t have access');

    next()
}