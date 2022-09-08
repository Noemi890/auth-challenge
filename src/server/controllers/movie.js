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
    console.log('createmovie serverside')
    const { title, description, runtimeMins } = req.body;
    const auth = req.get('Authorization')

    const token = jwt.verify(auth, process.env.JWT_SECRET)
    
    if (!token) return res.status(401).json({ error: 'Invalid Token' })

    const user = await prisma.user.findFirst({
        where: {
            username: token.username
        }
    })

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins,
            userId: user.id
        }
    });

    res.json(createdMovie);
};

module.exports = {
    getAllMovies,
    createMovie
};