import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import ReactApexChart from "react-apexcharts";
import USAMap from "react-usa-map";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import "../style.css";

export default function () {
  const [data, setData] = useState();
  const [placeName, setplaceName] = useState([]);
  const [series, setSeries] = useState([
    {
      name: "",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 20,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
        "2018-09-19T07:00:00.000Z",
        "2018-09-19T07:30:00.000Z",
        "2018-09-19T08:00:00.000Z",
        "2018-09-19T08:30:00.000Z",
        "2018-09-19T09:00:00.000Z",
        "2018-09-19T09:30:00.000Z",
        "2018-09-19T10:00:00.000Z",
        "2018-09-19T10:30:00.000Z",
        "2018-09-19T11:00:00.000Z",
        "2018-09-19T11:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  const handleForce = (data, fileInfo) => {
    // Create a map of places and respective info
    // Set the map as Data state
    let map = new Map();
    data.map((countyInfo) =>
      map.has(countyInfo.name)
        ? map.get(countyInfo.name).push({ date: countyInfo.date, avgTemp: 18 })
        : (map.set(countyInfo.name, [{ date: countyInfo.date, avgTemp: 10 }]),
          setplaceName((placeName) => [...placeName, countyInfo.name]))
    );
    setData(map);
    console.log("place name array");
    console.log(placeName);

    // Set graph information
    const targetCounty = map.get("NY CITY CENTRAL PARK, NY US");
    let getTemperature = (county) => {
      let temperature = county.avgTemp;
      return temperature;
    };

    let targetCountyTemp = targetCounty.map(getTemperature);
    console.log(targetCountyTemp);
    setSeries([
      {
        name: "Temperature",
        data: targetCountyTemp,
      },
    ]);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  /**
   * Current not being used, for usa map with border for states only
   */
  const showInfo = (e) => {
    alert(e.target.dataset.name);
  };

  // Map type for displaying map
  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  return (
    <div className="container">
      <div className="CSVReader_container">
        <div className="CSVText">Upload CSV File</div>
        <CSVReader
          cssClass="react-csv-input"
          label=""
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />
      </div>
      <div className="apexChart_container">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
        <select>
          {placeName && placeName.map((name) => <option> {name}</option>)}
        </select>
      </div>
      <div className="map_container">
        {/* <USAMap width="60%" onClick={(e) => showInfo(e)} /> */}
        <ComposableMap projection="geoAlbers">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#DDD"
                  stroke="#FFF"
                />
              ))
            }
          </Geographies>
          <Marker coordinates={[-74.006, 40.7128]}>
            <circle r={8} fill="#F53" />
          </Marker>
        </ComposableMap>
      </div>
    </div>
  );
}
