import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import NextLink from 'next/link';
import ProgressBar from './progressBar';
import 'react-circular-progressbar/dist/styles.css';
import dotenv from 'dotenv';

/*
Api from TMDB 
Movie Grid on Index Page
Hidden API key
*/

dotenv.config();

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const GetApi: React.FC<{ selectedSortOption: 'top_rated' | 'popular' | 'upcoming' }> = ({ selectedSortOption }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const api_image = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const api_key = `api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const api_database = "https://api.themoviedb.org/3";
    const api_top_rated = "/movie/top_rated?&";
    const api_popular = "/movie/popular?&";
    const api_upcoming = "/movie/upcoming?&";

    const queries = {
      top_rated: api_database + api_top_rated + api_key,
      popular: api_database + api_popular + api_key,
      upcoming: api_database + api_upcoming + api_key,
    };

    axios
      .get(queries[selectedSortOption])
      .then((response) => {
        const moviesData: Movie[] = response.data.results;
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedSortOption]);

  const renderMoviesGrid = () => {
    const rows = Math.ceil(movies.length / 5);

    return (
      <div className="grid gap-4">
        {Array.from({ length: rows }, (_, i) => i).map((rowIndex) => {
          const row = movies.slice(rowIndex * 5, (rowIndex + 1) * 5);

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-4 pb-1">
              {row.map((movie) => {
                const formattedDate = format(new Date(movie.release_date), 'MMM d, yyyy');

                return (
                  <div key={movie.id} className="w-full h-[320px] relative shadow-md rounded mt-14">
                    <NextLink href={`/movies/${movie.id}`}>
                      <img
                        className="rounded-t"
                        src={api_image + movie.poster_path}
                        alt={movie.title}
                        style={{
                          width: "100%",
                          height: "77%",
                          objectFit: "cover",
                        }}
                      />
                    </NextLink>
                    <div className="mt-2 p-2 h-[20%] flex flex-col justify-center items-center text-black text-[12px] font-semibold">
                      <div className="w-full text-center font-semibold">{movie.title}</div>
                      <div className="text-gray-400">{formattedDate}</div>
                      <ProgressBar value={movie.vote_average} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {renderMoviesGrid()}
    </div>
  );
};

export default GetApi;
