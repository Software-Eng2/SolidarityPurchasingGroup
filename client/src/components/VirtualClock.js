import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import {BsFillArrowRightSquareFill, BsFillArrowLeftSquareFill} from 'react-icons/bs'
import Calendar from 'react-calendar';
import {Clock} from "../Clock.js";
import {Order} from "../Order";

function VirtualClock(){
  const [date, setDate] = useState(new Date());
    const clock = new Clock();
  useEffect(() => {
    const interval = setInterval(
      () => setDate(new Date()),
      1000
    );
 
    return () => {
      clearInterval(interval);
    }
  }, []);

  const changeDate = () => {
      let data = date;
      setDate(data.getDate() + (((1 + 7 - data.getDay()) % 7) || 7))
  }

    return (
        <>
          <ButtonToolbar>
            <ButtonGroup size="lg" className="clock mx-auto">
              <Button variant="outline-success" disabled={new Date().getDay() > 1} onClick={()=> clock.setAvailabilityConfirmedMilestone()}>
                Monday 09:00
                {/*<p> Farmers confirm available products</p>*/}
              </Button>
              <Button variant="outline-success" disabled={new Date().getDay() > 1} onClick={() => clock.setWalletOKMilestone()}>
                Monday 20:00
                {/*} <p> farmers deliver their products</p>*/}
              </Button>
              <Button variant="outline-success"  disabled={new Date().getDay() > 6} onClick={()=> clock.setFarmerEstimatesMilestone()}>
              Saturday 09:00
                {/*<p> farmers provide estimates of available products for next week</p>*/}
              </Button>
                <Button variant="outline-success" onClick={()=> clock.setOrdersAcceptedMilestone()}>
                    Sunday 23:00
                    {/*<p>Orders from clients are accepted until Sunday 23:00</p>*/}
                </Button>
            </ButtonGroup>
          </ButtonToolbar>
            <div className='calendar-container d-flex justify-content-center mt-3'>
                <div>
                    <Button variant="success" className='ml-1 mr-3' onClick={changeDate}>
                        <BsFillArrowLeftSquareFill className='ml-1 mr-3' size={30} fill="green"/>
                        Last week
                    </Button>
                </div>
                <Calendar onChange={setDate} value={date} minDate={new Date()} minDetail='month' maxDate={new Date(2021, 12, 1)}/>
                <div>
                    <Button variant="success" className='ml-3 mr-1' onClick={changeDate}>
                        Next week
                        <BsFillArrowRightSquareFill className='ml-3 mr-1' size={30} fill="green"/>
                    </Button>
                </div>

            </div>
            <h1 className='text-center mt-3'></h1>
        </>
      )
}

export default VirtualClock;