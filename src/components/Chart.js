import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
 
function Chart(props) {
    //console.log(props);
  const refContainer = useRef(null);
  const [dataSource, setDataSource] = useState([]);
 
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
        categories: ['Today','Tomorrow','Sunday','Monday','Tuesday','Wednesday','Thursday'],
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
 
  useEffect(() => {
    setTimeout(() => {
      setDataSource([{
        name: 'High Temperature',
        data: [29, 31, 33, 35, 37, 32, 35]
      }, {
        name: 'Low Temperature',
        data: [27, 25, 28, 26, 24, 27, 25]
      }]);
    }, 2000);
  }, []);
 
  return (
    <div className="App">
      <div ref={refContainer} />
    </div>
  );
}
 
export default Chart;