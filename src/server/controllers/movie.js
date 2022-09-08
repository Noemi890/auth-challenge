const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();

    res.json({ data: movies });
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const auth = req.get('Authorization')
    try {
        const token = jwt.verify(auth, process.env.JWT_SECRET)
        // todo verify the token
    } catch (e) {
        return res.status(401).json({ error: 'Invalid token provided.' })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins
        }
    });

    res.json(createdMovie);
};

module.exports = {
    getAllMovies,
    createMovie
};