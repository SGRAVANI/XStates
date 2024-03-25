import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"

export default function StateSelection() {
    let [coData,setCoData]=useState([])
    let [sData,setSData]=useState([])
    let [ciData,setCiData]=useState([])
    let [country,setCountry]=useState("")
    let [state,setState]=useState("")
    let [city,setCity]=useState("")
    async function getData(url,fn)
    {
        try{
    let response=await fetch(url)
    let data=await response.json()
    // let s=new Set()
    // for(let ele of data)
    // {
    //     let e=ele.toLowerCase();
    //     e=e.charAt(0).toUpperCase() + e.slice(1);
    //     s.add(e)
    // }
      //s.add(ele.toCa)  
    //}
    //let s=new Set(data);
    //data=[...s]
    //console.log(data);
    //setData(data);
    fn(data)

        }
        catch(e)
        {
            console.error(e.message)
        }
    }
    useEffect(()=>{
     getData("https://crio-location-selector.onrender.com/countries",setCoData)
    },[])
    useEffect(()=>{
   getData(`https://crio-location-selector.onrender.com/country=${country}/states`,setSData)
    },[country])
    useEffect(()=>{
    getData(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`,setCiData)
    },[state])
    function selectItemData(source)
    {
        let list=source.map((ele)=>{return <option value={ele} key={ele}>{ele}</option>

        })
        console.log(list)
        return list;
    //return (<></>)
    }
   function displaySelected()
   {
    if(country && state && city)
    {
        
        return <p style={{marginTop:"2.5rem",fontWeight:"bold"}}> You selected <span style={{fontSize:"1.5rem"}}>{city}</span>, <span style={{fontWeight:"bold",color:"gray",fontSize:"1.2rem"}}>{state}, {country}</span></p>
    }
   }
    return (
    <div className={styles.container}>
        <h1>Select Location</h1>
        <div className={styles.selectContainer}>
        <select name="coutry" onChange={(e)=>{setCountry(e.target.value)}} >
            <option value="">Select Country</option>
           { selectItemData(coData)}
        </select>
        <select name="state" onChange={(e)=>{setState(e.target.value)}} disabled={country?false:true}>
            <option value="">Select State</option>
            {country?selectItemData(sData):null}
        </select>
        <select name="city" onChange={(e)=>{setCity(e.target.value)}} disabled={state?false:true}>
            <option value="">Select City</option>
            {state?selectItemData(ciData):null}
        </select>
        
        </div>
        {displaySelected()}
    </div>
  )
}
