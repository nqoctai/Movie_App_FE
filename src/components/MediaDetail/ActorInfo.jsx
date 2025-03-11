import ImageComponent from "@components/Image";
import React from "react";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
      <ImageComponent
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        className={"rounded-lg"}
        width={276}
        height={350}
      />
      {/* <img
        className="rounded-lg"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        alt=""
        width={276}
        height={350}
      /> */}
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>{episodeCount} Episodes</p>
        {/* <p>18</p> */}
      </div>
    </div>
  );
};

export default ActorInfo;
