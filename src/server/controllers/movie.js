const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
    const userId = Number(req.params.id)
    const movies = await prisma.movie.findMany({
        where: {
            userId
        }
    });

    res.json(movies);
};

const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const auth = req.get('Authorization')

    const token = jwt.verify(auth, process.env.JWT_SECRET)

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