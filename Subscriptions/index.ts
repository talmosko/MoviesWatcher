import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db';
import getAllMovies from './BLL/moviesBLL';
import getAllMembers from './BLL/membersBLL';
import Movie from './models/movieModel'
import {membersObject, moviesObject } from './interfaces/mongoose.gen';
import Member from './models/membersModel';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;


async function start()
{
  try{
    //connect to DB
    await connectDB();

    //clear movies collection, get all the movies from the API and save them to the DB
    await Movie.deleteMany({});
    const movies = await getAllMovies();
    movies.forEach(async (movie : moviesObject) => {
        const mov = new Movie(movie);
        await mov.save();
      })
    
    //clear members collection, get all the members from the API and save them to the DB
    await Member.deleteMany({});
    const members = await getAllMembers();
    members.forEach(async (member : membersObject) => {
      const mem = new Member(member);
      await mem.save();
    })
  
    //all good? start the server
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  }
  catch(err: any)
  {
    throw new Error(err);
  }
}




app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


start();