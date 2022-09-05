import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //Checking if the user's token is valid
        const token = req.headers.authorization?.split(" ")[1];
        const decodedData = jwt.verify(token, 'test');
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        console.error(error)
    }
    
}

export default auth;