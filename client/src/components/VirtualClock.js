import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import {BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill} from 'react-icons/bs'
import Calendar from 'react-calendar';
import {Clock} from "../Clock.js";

function VirtualClock(){
    const [hour, setHour] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [flagSunday, setFlagSunday] = useState(0);
    const clock = new Clock();


    useEffect(() => {
        const interval = setInterval(
            () => setHour(new Date()),
            1000
        );
        return () => {
            clearInterval(interval);
        }
    }, []);

    function nextWeekdayDate(date, day_in_week) {
        var ret = new Date(date||new Date());
        ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
        console.log(ret);
        clock.reset(ret);
        return ret;
    }



    return (
        <>
            <ButtonToolbar>
                <ButtonGroup size="lg" className="clock mx-auto">
                    <Button variant="outline-success" disabled={flagSunday} onClick={()=> clock.setFarmerEstimatesMilestone()}>
                        Saturday 09:00
                    </Button>
                    <Button variant="outline-success" onClick={()=> {clock.setOrdersAcceptedMilestone(); setFlagSunday(1);}}>
                        Sunday 23:00
                    </Button>
                    <Button variant="outline-success" disabled={true} onClick={()=> clock.setAvailabilityConfirmedMilestone()}>
                        Monday 09:00
                    </Button>
                    <Button variant="outline-success" disabled={true} onClick={() => clock.setWalletOKMilestone()}>
                        Monday 20:00
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
            <div className='calendar-container d-flex justify-content-center mt-3'>
                <Calendar onChange={setDate} value={date} minDate={new Date()} minDetail='month' maxDate={new Date(2021, 12, 1)}/>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <Button variant="success" className='ml-3 mr-1' onClick={()=> setDate(nextWeekdayDate(date, 2) )} disabled={true}>
                    Next week
                    <BsFillArrowRightSquareFill className='ml-3 mr-1' size={30} fill="green"/>
                </Button>
            </div>
            <h1 className='text-center mt-3'></h1>
        </>
    )
}
export default VirtualClock;
