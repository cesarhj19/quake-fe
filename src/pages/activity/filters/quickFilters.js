import React from 'react';

var today = new Date();
const ymd = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
const endtime = ymd

const quakes = {
  'biggest': {
    'startime': '1880-01-01',
    'minmagnitude': 7,
    'maxmagnitude': 15,
    'maxradiuskm': 20000,
    'latitude': 37.78197,
    'longitude': -121.93992
  },
  'nukes': {
    'startime': '1880-01-01',
    'minmagnitude': 5,
    'maxmagnitude': 15,
    'maxradiuskm': 20000,
    'latitude': 37.78197,
    'longitude': -121.93992
  },
  'volcano': {
    'startime': '1880-01-01',
    'minmagnitude': 5,
    'maxmagnitude': 15,
    'maxradiuskm': 20000,
    'latitude': 37.78197,
    'longitude': -121.93992
  }
}
    
const filter = [
  {link: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100&starttime=${quakes.biggest.starttime}&endtime=${endtime}&minmagnitude=${quakes.biggest.minmagnitude}&maxmagnitude=${quakes.biggest.maxmagnitude}&maxradiuskm=${quakes.biggest.maxradiuskm}&latitude=${quakes.biggest.latitude}&longitude=${quakes.biggest.longitude}&orderby=magnitude`, text: 'All Time Biggest'},
  {link: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&starttime=${quakes.nukes.starttime}&endtime=${endtime}&minmagnitude=${quakes.nukes.minmagnitude}&maxmagnitude=${quakes.nukes.maxmagnitude}&maxradiuskm=${quakes.nukes.maxradiuskm}&latitude=${quakes.nukes.latitude}&longitude=${quakes.nukes.longitude}&eventtype=nuclear%20explosion&orderby=magnitude`, text: 'Caused by Nukes'},
  {link: `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&starttime=${quakes.volcano.starttime}&endtime=${endtime}&minmagnitude=${quakes.volcano.minmagnitude}&maxmagnitude=${quakes.volcano.maxmagnitude}&maxradiuskm=${quakes.volcano.maxradiuskm}&latitude=${quakes.volcano.latitude}&longitude=${quakes.volcano.longitude}&eventtype=volcanic%eruption&orderby=magnitude`, text: 'Caused by Volcanic Eruption'},
]

const QuickFilters = ({quickFilters}) => {
  return ( 
    <fieldset id="quick-filters" className="quick-filters">
      <legend id='quick-filters-label'>Quick Filters</legend>
      <div id="quick-filters-flex" className="quick-filters-flex">
      {filter.map((filter, index) => { return (
          <button onClick={quickFilters} className="quick-filters-button"
            name={filter.link} key={index}>{filter.text}
          </button>
        )})}
      </div>
    </fieldset>
   );
}
 
export default QuickFilters;