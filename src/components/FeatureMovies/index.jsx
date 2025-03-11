/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import useFetch from "@hooks/useFetch";

const FeatureMovie = () => {
  // eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODM3ZjEwZDk2MTljM2RmZjM1NDAxMTg3ZmIxODE1ZCIsIm5iZiI6MTc0MTUxNDczMS45NTYsInN1YiI6IjY3Y2Q2N2ViYWQ0ODZiNDNlYmUyYzQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9RBIMIS99wA3VWa1bApDpfC34VB0RH6vGmY2hxyJd-8
  // const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: popularMoviesResponse } = useFetch({
    url: "/movie/popular",
  });

  const movies = (popularMoviesResponse.results || []).slice(0, 4);

  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0]?.id);
    }
  }, [JSON.stringify(movies)]);

  console.log(movies);
  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovie;
