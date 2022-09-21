import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
 
function Chart(city) {
  //console.log(city.city);
  const refContainer = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [data,setData] =useState(null);
  const [cityName] = useState(city.city);
  const [done, setDone] = useState(false)
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=7&appid=90a7a54a319f3cb24209a039be3ef186`;
  const highTemp =[];
  const lowTemp = [];
  const day = new Date();
  const date = ['Tomorrow',day.getDate()+2,day.getDate()+3,day.getDate()+4,day.getDate()+5,day.getDate()+6,day.getDate()+7];
  //console.log(date);
  useEffect(()=>{
    const forecast = fetch(url).then(response=>response.json())
    .then(data=>{
      setData(data.list);
      DataSo(data.list)
    });
    
    // if(data !== null)
    // for(let i =0; i<7;i++){
    //   highTemp.push(data[i].main.temp_max);
    //   lowTemp.push(data[i].main.temp_min);
      
    // }
    setDone(true);
    // DataSo()
    //console.log(highTemp);
    //console.log(lowTemp);
  },[cityName]);

  
  useEffect(() => {

    const chart = Highcharts.chart(refContainer.current, {
      chart: {
        type: 'line'
      }, // type of the chart
      title: {
        text: '7 Days weather forecast'
      }, // title of the chart
      subtitle: {
        text: 'High and low temperature'
      }, // subtitle of the chart
      yAxis: {
        title: {
          text: 'Temperature in ℃'
        }, // the title of the Y Axis
      },
      xAxis: {
        min: 0.4,
        categories: date,
        title: {
          text: 'Days'
        } // the title of the X Axis
      },
      tooltip: {
        headerFormat: '<span style="font-size:13px;font-weight:bold;">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      }, // tooltip appears when hovering over a point
      credits: {
        enabled: false
      },
      series: dataSource // set of the data
    });
 
    if (dataSource.length > 0) {
      chart.hideLoading();
    }
    else {
      chart.showLoading();
    }
  }, [dataSource]);
 
  // useEffect(() => {
  //   // setTimeout(() => {
  //     console.log(highTemp)
  //     setDataSource([{
  //       name: 'High Temperature',
  //       data: highTemp
  //     }, {
  //       name: 'Low Temperature',
  //       data: lowTemp
  //     }]);
  //   // }, 2000);
  
  // }, [done]);


  function DataSo(data){
    console.log(highTemp)
    if(data !== null)
    for(let i =0; i<7;i++){
      highTemp.push(data[i].main.temp_max);
      lowTemp.push(data[i].main.temp_min);
      
    }
    setDataSource([{
      name: 'High Temperature',
      data: highTemp
    }, {
      name: 'Low Temperature',
      data: lowTemp
    }]);
  }
  
  return ( 
    <div className="App">
      <div ref={refContainer} />
    </div>
  );
}
 
export default Chart;