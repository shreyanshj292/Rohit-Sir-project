import React, { useState, useEffect } from "react";
import { Router, Routes, useLocation } from "react-router-dom";
import providers from "../data/providers";
import { getShowsByAllProviders } from "../services/tmdb-api";

function ProvidersPage({}) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [providerList, setProviderList] = useState([]);
  const [providerId, setProviderId] = useState();
  const [shows, setShows] = useState([]);
  const [validId, setValidId] = useState(true);

  const get_provider_shows = (id) => {
    getShowsByAllProviders(providers).then((result) => {
      // console.log(result);
      let i = 0;
      let tochange = false
      Object.keys(providers).map((key) => {
        // console.log(providers[key].id, id);
        if (providers[key].id === parseInt(id)) {
          setShows(result[i][1]);
          tochange = true
        }
        i = i + 1;
      });
      if(!tochange){
        setValidId(false);
      }
    });
  };
  
  const get_all_providers = async () => {
    const request = await fetch(`https://api.themoviedb.org/3/watch/providers/tv?api_key=02f5d3847dfcb55ed317924dc9b17d62&language=en-CA`);
    const response = await request.json();
    setProviderList(response["results"]);
     
  } 

  useEffect(() => {
    if (id) {
      setProviderId(id);
      let a = get_provider_shows(id);
    }
    get_all_providers();
    // setProviderList(providers);
    console.log(providerList);
  }, []);

  if (validId) {
    return (
      <div>
        {!providerId ? (
          <div className="providers-container">
            {Object.keys(providerList).map((key) => {
              console.log(providerList[key])
              return (
                <div>
                  <a href={`/providers?id=${providerList[key].provider_id}`}>
                    {providerList[key].provider_name}
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="provider-shows">
            {shows.map((show, index) => {
              if(index < 20){
                console.log(show)
                return (
                  <>
                  <div className="provider-show">
                    <img
                      className="provider-shows-poster"
                      src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                      height={200}
                      width={120}
                      />

                    {show.name}
                  </div>

                  {index % 5 === 4 && <div className="line-break"></div>}
                </>
              );
            }
            })}
          </div>
        )}
      </div>
    );
  }
  else{
    return (
      <div className="provider-id-wrong">
        Enter a valid Provider Id !!
      </div>
    )
  }
}

export default ProvidersPage;
