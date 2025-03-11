import MovieCard from "@components/MovieCard";
import React, { useEffect, useState } from "react";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  useEffect(() => {
    const fetchPopularMovie = async () => {
      const url = tabs.find((tab) => tab.id === activeTabId)?.url;
      if (url) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODM3ZjEwZDk2MTljM2RmZjM1NDAxMTg3ZmIxODE1ZCIsIm5iZiI6MTc0MTUxNDczMS45NTYsInN1YiI6IjY3Y2Q2N2ViYWQ0ODZiNDNlYmUyYzQ5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9RBIMIS99wA3VWa1bApDpfC34VB0RH6vGmY2hxyJd-8`,
          },
        });
        const data = await res.json();
        console.log("check data>>>>", { data });
        const trendingMediaList = data.results.slice(0, 12);
        setMediaList(trendingMediaList);
      }
      // console.log("check>>>", popularMovies);
    };
    fetchPopularMovie();
  }, [activeTabId, tabs]);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              onClick={() => setActiveTabId(tab.id)}
              key={tab.id}
              className={`cursor-pointer select-none rounded px-2 py-1 outline-none ${tab.id === activeTabId ? "bg-white text-black" : ""}`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            id={media.id}
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaList;
