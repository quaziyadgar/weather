import {useState} from 'react';

function Weather(){
    const [data,setData] = useState({});
    const [inp,setInp] = useState('');
    const[show,setShow]=useState(false);
    const handleChange = (e)=>{
        setInp(e.target.value);
    }
    
    const city = inp;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e2408ff9486a3c4e6ee08c5b1e6bf6e`;
    const weather = fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        return data;
    }).catch(err=>console.log(err));

    const searchForWeather = ()=>{
        console.log(inp);
        console.log(weather);
    }
    return(
    <>
        <div className='input'>
            <input type="text" placeholder="Enter Location" onChange={handleChange} />
            <button onClick={searchForWeather}>Fetch</button>
        </div>
        <div className='desc1'>
            <p>Weather Description - Cloudy</p>
            <p>Current  temperature - 29℃</p>
            <p>Today's high temperature - 32℃</p>
            <p>Today's low temperature - 25℃</p>
        </div>
        <div className='desc2'>
            {
                show?
                <div>
                    <p>Wind speed - 20 Km/h</p>
                    <p>Humidity - 35 %</p>
                    <p>Pressure - 1 mbar</p>
                    <p>Sunrise - 05:48 am Sunset - 6.48pm</p>
                </div>
                :null
            }
            <button onClick={()=>setShow(!show)}>{!show?"More info":"Less info"}</button>
        </div>
        <div className='chart'>
            
        </div>
    </>
    );
}
export default Weather;
