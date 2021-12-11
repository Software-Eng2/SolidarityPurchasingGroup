import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import {BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill} from 'react-icons/bs'
import Calendar from 'react-calendar';
import {Clock} from "../Clock.js";

function VirtualClock(){
    const [hour, setHour] = useState(new Date());
    const [date, setDate] = useState(new Date());

    const [flagSaturday, setFlagSaturday] = useState(false);
    const [flagSunday, setFlagSunday] = useState(false);
    const [flagMonday9, setFlagMonday9] = useState(false);
    const [flagMonday20, setFlagMonday20] = useState(false);
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

    useEffect(() => {
        let day = new Date().getDay();
        // TODO: verificare anche l'orario
        switch(day) {
            case 6 :
                clock.setFarmerEstimatesMilestone();
                setFlagSaturday(true);
                console.log('ok');
                break;
            case 0 :
                clock.setFarmerEstimatesMilestone();
                clock.setOrdersAcceptedMilestone();
                setFlagSaturday(true);
                setFlagSunday(true);
                break;
            case 1 :
                clock.setFarmerEstimatesMilestone();
                clock.setOrdersAcceptedMilestone();
                clock.setAvailabilityConfirmedMilestone();
                setFlagSaturday(true);
                setFlagSunday(true);
                setFlagMonday9(true);
                break;
            case 2 :
                clock.setFarmerEstimatesMilestone();
                clock.setOrdersAcceptedMilestone();
                clock.setAvailabilityConfirmedMilestone();
                clock.setWalletOKMilestone();
                setFlagSaturday(true);
                setFlagSunday(true);
                setFlagMonday9(true);
                setFlagMonday20(true);
                break;
            default:
                break;
        }
    }, []);


    function nextWeekdayDate(date, day_in_week) {
        var ret = new Date(date || new Date());
        ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
        console.log(ret);
        clock.reset(ret);
        resetFlag();
        return ret;
    }

    function resetFlag(){
        setFlagSaturday(false);
        setFlagSunday(false);
        setFlagMonday9(false);
        setFlagMonday20(false);
    }

    function handleSaturday(){
        clock.setFarmerEstimatesMilestone();
        setFlagSaturday(true);
    }

    function handleSunday(){
        if(flagSaturday === false){
            clock.setFarmerEstimatesMilestone();
        }
        clock.setOrdersAcceptedMilestone();
        setFlagSunday(true);
    }

    function handleMonday9(){
        if(!flagSaturday){
            clock.setFarmerEstimatesMilestone();
        }
        if(!flagSunday){
            clock.setOrdersAcceptedMilestone();
        }
        clock.setAvailabilityConfirmedMilestone();
        setFlagMonday9(true);
    }

    function handleMonday20(){
        if(!flagSaturday){
            clock.setFarmerEstimatesMilestone();
        }
        if(!flagSunday){
            clock.setOrdersAcceptedMilestone();
        }
        if(!flagMonday9){
            clock.setAvailabilityConfirmedMilestone();
        }
        clock.setWalletOKMilestone();
        setFlagMonday20(true);
    }


    return (
        <>
            <ButtonToolbar>
                <ButtonGroup size="lg" className="clock mx-auto">
                    <Button variant="outline-success" disabled={flagSaturday || flagSunday || flagMonday9 || flagMonday20} onClick={() => handleSaturday()}>
                        Saturday 09:00
                    </Button>
                    <Button variant="outline-success" disabled={flagSunday || flagMonday9 || flagMonday20} onClick={() => handleSunday()}>
                        Sunday 23:00
                    </Button>
                    <Button variant="outline-success"  disabled={flagMonday9 || flagMonday20} onClick={() => handleMonday9()}>
                        Monday 09:00
                    </Button>
                    <Button variant="outline-success" disabled={flagMonday20} onClick={() => handleMonday20()}>
                        Monday 20:00
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
            <div className='calendar-container d-flex justify-content-center mt-3'>
                <Calendar onChange={setDate} value={date} minDate={new Date()} minDetail='month' maxDate={new Date(2021, 12, 1)}/>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <Button variant="success" className='ml-3 mr-1' onClick={()=> setDate(nextWeekdayDate(date, 2) )}>
                    Next week
                    <BsFillArrowRightSquareFill className='ml-3 mr-1' size={30} fill="green"/>
                </Button>
            </div>
            <h1 className='text-center mt-3'></h1>
        </>
    )
}
export default VirtualClock;
