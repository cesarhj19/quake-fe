import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { firstLoad, quakeFetch, updateSearchParams } from "../../../redux/actions";
// import QuickFilters from './quickFilters'
import RadiusFilter from './radiusFilter'
import DateFilter from "./dateFilter";
import MagFilter from "./magFilter";
 
function Filters({
 quakeFetch,
 firstLoad,
 updateSearchParams,
 maxradiuskm,
 starttime,
 endtime,
 minmagnitude,
 maxmagnitude,
 latitude,
 longitude,
}) {
 // Set Ref for off click to close search.
 const searchRef = useRef(null);
 
 function onClickRef(e) {
   const isOutside = searchRef.current.contains(e.target);
 
   if (isOutside === false) {
     toggleSearch();
   }
 }
 
 // The query parameters to be sent to USGS. Updates with state changes
 const USGSQuery = `&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}&maxmagnitude=${maxmagnitude}&maxradiuskm=${maxradiuskm}&latitude=${latitude}&longitude=${longitude}`;

//Dates
 var today = new Date();
 const ymd = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

 var days = 7; // Days you want to subtract
 var date = new Date();
 var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
 var day =last.getDate();
 var month=last.getMonth()+1;
 var year=last.getFullYear();
 const sevenDays = `${year}-${month}-${day}`;

 const startTime = sevenDays;
 const endTime = ymd;
 const minMagnitude = 0
 const maxMagnitude = 11
 const maxRadiuskm = 7000 //global
 const Latitude = 37.78197
 const Longitude = -121.93992
//  const firstLoadQuery = "https://quakelabs-be-production.herokuapp.com/api/activity/first-load";
//  const firstLoadQuery = "http://www.localhost:5000/api/activity/first-load";
 const firstLoadQuery = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=30&starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMagnitude}&maxmagnitude=${maxMagnitude}&maxradiuskm=${maxRadiuskm}&latitude=${Latitude}&longitude=${Longitude}&orderby=magnitude`;
 
 // Initial Quake Search, runs on first load
 useEffect(() => {
   firstLoad(firstLoadQuery, USGSQuery, quakeFetch);
 }, []);


  // dispatches quakeFetch actions with the query for USGS upon form submit
  const formSubmitCallback = (e) => {
    e.preventDefault();
    quakeFetch(USGSQuery);
  };

  // quick filters
  // const quickFilters = (e) => {
  //   e.preventDefault();
  //   console.log('request coming?', e.target.name)
  //   firstLoad(e.target.name, USGSQuery, quakeFetch);
  //   toggleSearch();
  // }

  // Updates the search state dynamically for each input due to shared key names
  const handleChanges = (e) => {
    e.preventDefault();

    updateSearchParams({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const toggleSearch = () => {
    // Toggles visibility of search menu
    const searchMenu = document.getElementById("search-menu");
    searchMenu.style.display === "flex"
      ? (searchMenu.style.display = "none")
      : (searchMenu.style.display = "flex");
  };

  return (
    <dialog id="search-menu" onClick={onClickRef} className="search-menu">
      <form ref={searchRef} onSubmit={formSubmitCallback} name="filters-form">
        {/* <QuickFilters quickFilters={quickFilters}/> */}
        <fieldset id="advanced-filters" className="advanced-filters">
          <legend id='advanced-filters-label'>Advanced Filters</legend>
          <RadiusFilter handleChanges={handleChanges} maxradiuskm={maxradiuskm}/>
          <DateFilter handleChanges={handleChanges} starttime={starttime} endtime={endtime}/>
          <MagFilter handleChanges={handleChanges} minmagnitude={minmagnitude} maxmagnitude={maxmagnitude}/>
        </fieldset>

        <button type="submit" onClick={toggleSearch} className="search-submit-button">
          Search For Activity
        </button>

        <p type="button" role="button" className="close-sort" onClick={toggleSearch}>
          Close
        </p>
        
      </form>
    </dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    starttime: state.searchReducer.starttime,
    endtime: state.searchReducer.endtime,
    minmagnitude: state.searchReducer.minmagnitude,
    maxmagnitude: state.searchReducer.maxmagnitude,
    maxradiuskm: state.searchReducer.maxradiuskm,
    latitude: state.searchReducer.latitude,
    longitude: state.searchReducer.longitude,
  };
};

export default connect(mapStateToProps, {
  firstLoad,
  quakeFetch,
  updateSearchParams,
})(Filters);
