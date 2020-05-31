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
      data: [],
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
    title: {
        text: "Temperature VS Infection Rate",
        align: "left"
    },
    xaxis: {
        type: "numeric",
        min: 0,
        max: 65,
        tickAmount: 1,
        labels: {
            show: true
        },
        title: {
            text: "Temperature",
            style: {
                fontSize: "14px",
            }
        }
    },
    yaxis: {
        type: "numeric",
        min: 0,
        max: 19000,
        title: {
            // rotate: -90,
            text: "Confirmed Cases",
            style: {
                fontSize: "14px",
                cssClass: 'apexcharts-yaxis-title',
            }
        },
        labels: {
            formatter: function(val) {
                return val.toFixed(0);
            }
        }
    },
    legend: {
        show: false
    }
  });

  const handleForce = (data, fileInfo) => {
    // Create a map of places and respective info
    // Set the map as Data state
    let map = new Map();
    data.map((countyInfo) =>
      map.has(countyInfo.name)
        ? map
            .get(countyInfo.name)
            .push({ temp: countyInfo.temp, avgCase: countyInfo.avg_case })
        : (map.set(countyInfo.name, [
            { temp: countyInfo.temp, avgCase: countyInfo.avg_case },
          ]),
          setplaceName((placeName) => [...placeName, countyInfo.name]))
    );
    setData(map);

    // Set graph information
    const targetCounty = map.get("15 States");
    console.log(targetCounty);
    let getTemperature = (county) => {
      let temperature = county.temp;
      return temperature;
    };

    let getAvgCase = (county) => {
        let avgCase = county.avgCase;
        return avgCase;
      };

    let targetCountyTemp = targetCounty.map(getTemperature);
    let targetCountyAvgCase = targetCounty.map(getAvgCase);
    console.log(targetCountyTemp);
    setSeries([
      {
        name: "Temperature",
        data: targetCountyTemp,
      },
      {
        name: "Average Case",
        data: targetCountyAvgCase,
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
        {/* <select>
          {placeName && placeName.map((name) => <option> {name}</option>)}
        </select> */}
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
