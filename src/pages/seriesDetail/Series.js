import React, { useEffect, useState } from "react";
import "./series.css"; // Assuming you'll have separate CSS for TV series
import { useParams } from "react-router-dom";

const Series = () => {
  const [currentSeriesDetail, setSeries] = useState();
  const [seriesTrailer, setSeriesTrailer] = useState("");
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setSeries(data));

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const trailer = data.results.find(
            (video) => video.type === "Trailer"
          );

          if (trailer) {
            setSeriesTrailer(trailer.key);
          }
        }
      });
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cast && data.cast.length > 0) {
          setCast(data.cast.slice(0, 6));
        }
      });
  };

  return (
    <div className="series">
      {/* Series intro, detail, and trailer sections similar to the Movie component */}

      <div className="series__heading"> Cast </div>
      <div className="series__cast">
        <div className="cast__container">
          {cast.map((actor) => (
            <div key={actor.id} className="cast__item">
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="cast__image"
                />
              )}
              <div className="cast__name">{actor.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="series__heading"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        Trailer
      </div>

      {seriesTrailer && (
        <div className="series__trailer">
          <iframe
            width="800" // Increase the width
            height="450" // Increase the height
            src={`https://www.youtube.com/embed/${seriesTrailer}`}
            title="Series Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="series__heading">Production companies</div>
      <div className="series__production">
        {currentSeriesDetail &&
          currentSeriesDetail.production_companies &&
          currentSeriesDetail.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="series__productionCompany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Series;
