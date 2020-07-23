import React, { useState} from 'react'
import Button from "@material-ui/core/Button"

const updateTime = () => {
    var ajax = new XMLHttpRequest();
    let output
    let time 

    ajax.onreadystatechange = (parm) => {
        let input = parm.target
        if (input.readyState === 4 && input.status === 200) {
            output = JSON.parse(input.responseText)
        }
    };    

    ajax.open("GET", "http://date.jsontest.com", false)
    ajax.send()

    return time = output.milliseconds_since_epoch
}



const Ajaxtestt = ({timeId, timezone, country}) => {
    let time

    var int = setInterval(() => {
        time = new Date(updateTime())
        time.setUTCHours(time.getHours() + timezone)
        document.getElementById(timeId).innerHTML = time.getHours() + " : " + time.getMinutes() + " : " + time.getSeconds()    
    }, 1000);    

    return (
        <div>
            <h4>actual time in {country} is: <p id={timeId}></p></h4>
            <Button 
                onClick={() => {clearInterval(int); int = null}}
                variant="contained"
                color="secondary"
            >Stop</Button>
            <Button 
                onClick={() => {
                    if(int === null) {
                        int = setInterval(() => {
                        time = new Date(updateTime())
                        time.setUTCHours(time.getHours() + timezone)
                        document.getElementById(timeId).innerHTML = time.getHours() + " : " + time.getMinutes() + " : " + time.getSeconds()          
                        }, 1000)}}
                    }
                variant="contained"
                >Contine
            </Button>
        </div>
    )
}

export default Ajaxtestt
