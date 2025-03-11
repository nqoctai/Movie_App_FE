import MovieCard from "@components/MovieCard";
import useFetch from "@hooks/useFetch";

import React, { useState } from "react";

const MediaList = ({ title, tabs }) => {
  // const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const url = tabs.find((tab) => tab.id === activeTabId)?.url;
  const { data } = useFetch({
    url,
  });

  const mediaList = (data.results || []).slice(0, 12);

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
