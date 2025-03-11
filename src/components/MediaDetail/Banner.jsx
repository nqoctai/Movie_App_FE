import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupBy } from "lodash";
import React from "react";
import CircularProgressBar from "../CircularProgressBar";

const Banner = ({ mediaInfo }) => {
  const certification = mediaInfo?.release_dates?.results?.find(
    (result) => result.iso_3166_1 === "US",
  )?.release_dates[0]?.certification;

  const crews = (mediaInfo?.credits?.crew || [])
    .filter((crew) => ["Director", "Writer", "Screenplay"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  console.log("check crews>>>>", { crews });
  const groupedCrews = groupBy(crews, "job");
  console.log("check groupedCrews>>>>", { groupedCrews });
  return (
    <div className="relative overflow-hidden text-white shadow-md shadow-slate-800">
      <img
        className="absolute inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${mediaInfo.backdrop_path}`}
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div>
          <img
            className="h-[40vw] flex-1"
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mediaInfo.poster_path}`}
            alt=""
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{mediaInfo.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{mediaInfo.release_date}</p>
            <p>
              {(mediaInfo.genres || []).map((genre) => genre.name).join(",")}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round((mediaInfo.vote_average || 0) * 10)}
                size={3.5}
                strokeWidth={0.3}
              />
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="text-[1.3vw] font-bold">Overview</p>
            <p>{mediaInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(",")}</p>
              </div>
            ))}
            {/* <div>
              <p className="font-bold">Director</p>
              <p>Jennifer Phang</p>
            </div>
            <div>
              <p className="font-bold">Writter</p>
              <p>Jennifer Phang</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
