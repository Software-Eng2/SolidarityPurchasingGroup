
/**
 * Clock object
 * 
 * An object to manage virtual cycles of SPG application
 * 
 * -- ATTRIBUTES --
 * 
 * @param time - variable used to store the date
 *
 * @param eventsObject - object used to store events as flags (true if they are passed)
 * 
 * -- FUNCTIONS --
 * @param {Function} checkEvents - method used to update the Date in time variable and update event flags in the eventsObject
 * @param {Function} reset - method used to reset the Clock object to the initial status for a new cycle
 * 
 * -- EVENTS SET API --
 * @param {Function} setFarmerEstimatesMilestone - set Farmer Product Estimates deadline as passed, return true if time was correctly set, false if the event is already passed
 * @param {Function} setOrdersAcceptedMilestone - set Order Accepted deadline as passed, return true if time was correctly set, false if the event is already passed
 * @param {Function} setAvailabilityConfirmedMilestone - set Availability confirm by Farmer deadline as passed, return true if time was correctly set, false if the event is already passed
 * @param {Function} setWalletOKMilestone - set Wallets top upped deadline as passed, return true if time was correctly set, false if the event is already passed
 * 
 * -- EVENTS CHECK API --
 * @param {Function} checkEstimatesMilestone - check if the Farmer Product Estimates event is passed, return true if the event is passed, false otherwise
 * @param {Function} checkOrdersAcceptedMilestone - check if the Order accepted deadline is passed, return true if the event is passed, false otherwise
 * @param {Function} checkProductsAvailabilityMilestone - check if the Farmer Product Availability confirmed event is passed, return true if the event is passed, false otherwise
 * @param {Function} checkWalletsOkMilestone - check if the Wallets top upped deadline is passed, return true if the event is passed, false otherwise
 */
 class Clock{

    /**
     * Clock object can be initialized in any
     * moment of the week so I check what date
     * is at this moment and set the events as true
     * if they already passed.
     * 
     * NOTE: events are checked from the last to the
     * first in order
     */
    checkEvents(checkDate = true){

        if(checkDate){
            this.time = new Date();
        }

         let day = this.time.getDay();
         let hour = this.time.getHours();

         this.eventsObject.availability = false;
         this.eventsObject.estimates = false;
         this.eventsObject.ordersAccepted = false;
         this.eventsObject.walletsOK = false;

 
         if(day == 1){                                     // --------- Monday --------- //
            if(hour >= 20){                                 // (20:00 <--> 23:59)
                this.eventsObject.availability = true;
                this.eventsObject.estimates = true;
                this.eventsObject.ordersAccepted = true;
                this.eventsObject.walletsOK = true;
            }
            else if(hour >= 9){                             // (9:00 <--> 20:00)
                this.eventsObject.availability = true;
                this.eventsObject.estimates = true;
                this.eventsObject.ordersAccepted = true;
            }
            else{                                          // (00:00 <--> 9:00)
                this.eventsObject.estimates = true;
                this.eventsObject.ordersAccepted = true;
            }
         }
         else if (day == 0){                               // --------- Sunday ---------//
            if(hour >= 23){
                this.eventsObject.ordersAccepted = true;   // (23:00 <--> 23:59)
                this.eventsObject.estimates = true;
            }
            else{
                this.eventsObject.estimates = true;        // (00:00 <--> 23:00)
            }
         }
         else if (day == 6 && hour >= 9){                  // --------- Saturday --------- //
            this.eventsObject.estimates = true;            // (9:00 <--> 23:59)
         }
         
    }

    constructor(){
        this.time = undefined;
        this.stopped = false;

        /**
         * An object to keep track of the main
         * events in the week cycle. If event 
         * is false is not passed yet.
         */
        this.eventsObject = {
            estimates : false,
            ordersAccepted : false,
            availability: false,
            walletsOK: false
        }

        //Checking events
        this.checkEvents();

    }

    start(){
            
        setInterval(() => {

            if(!this.stopped){
                this.time.setSeconds(this.time.getSeconds() + 1);

                console.log(this.time.getDate() + ' ' + this.time.getHours() + ':' + this.time.getMinutes() + ':' + this.time.getSeconds());
            }

            var seconds = this.time.getSeconds();
            var minutes = this.time.getMinutes();
            var hours = this.time.getHours();
            var day = this.time.getDay();

            if(day == 1 && hours == 9){
                console.log('...');
            }

            if(day == 1 && hours == 20){
                console.log('...');
            }




        }, 1000);
    }

    stop(){
        this.stopped = true;
    }

    /* --------- EVENTS SETTING API --------- */
    /* -------------------------------------- */

    setFarmerEstimatesMilestone(checkDate = true){

        if(this.checkEstimatesMilestone(checkDate)){
            return false;
        }

        let day = this.time.getDay();

        //Calculating the time difference from today
        //to the milestone and setting the difference
        let daysDifference = 6 - day;
        this.time.setDate(this.time.getDate() + daysDifference);
        this.time.setHours(9,0);

        return true;
    }


    setOrdersAcceptedMilestone(checkDate = true){

        let day = this.time.getDay();
        
        if(this.checkOrdersAcceptedMilestone(checkDate)){
            return false;
        }

        //Today is Sunday
        if(day == 0){
            this.time.setHours(23,0)
        }

        //Monday -- Saturday
        //calculating the time difference from today
        //to the milestone and setting the difference
        let daysDifference = 6 - day;
        this.time.setDate(this.time.getDate() + daysDifference + 1);
        this.time.setHours(23,0);

        return true;
    }

    setAvailabilityConfirmedMilestone(checkDate = true){

        let day = this.time.getDay();
        
        if(this.checkProductsAvailabilityMilestone(checkDate)){
            return false;
        }

        //Today is Monday
        if(day == 1){
            this.time.setHours(9,0)
        }

        //Today is Sunday
        if(day == 0){
            this.time.setDate(this.time.getDate() + 1);
            this.time.setHours(9,0)
        }

        //Monday -- Saturday
        //calculating the time difference from today
        //to the milestone and setting the difference
        let daysDifference = 6 - day;
        this.time.setDate(this.time.getDate() + daysDifference + 2);
        this.time.setHours(9,0);

        return true;
    }

    setWalletOKMilestone(checkDate = true){

        let day = this.time.getDay();
        
        if(this.checkWalletsOkMilestone(checkDate)){
            return false;
        }

        //Today is Monday
        if(day == 1){
            this.time.setHours(20,1)
        }

        //Today is Sunday
        if(day == 0){
            this.time.setDate(this.time.getDate() + 1);
            this.time.setHours(20,1)
        }

        //Monday -- Saturday
        //calculating the time difference from today
        //to the milestone and setting the difference
        let daysDifference = 6 - day;
        this.time.setDate(this.time.getDate() + daysDifference + 2);
        this.time.setHours(20,1);

        return true;
    }

    /**
     * Reset function: reset the Clock Object
     * to the initial status for a new cycle
     * 
     * All events are set as not passed yet
     * because startDate must be a Tuesday
     * 
     * @param {string} startDate - the Tuesday of the new cycle. Must be passed like this format example: 20 November 2021
     * @return {boolean} return true if the new Date is set correclty, false otherwise
     */
    reset(startDate){

        var newTime = undefined;

        newTime = new Date(startDate);

        if(newTime == 'Invalid Date'){
            return false;
        }
        if(newTime.getDay() != 2){
            return false;
        }

        this.time = newTime;

        return true;
    }

    /* ----------- CHECK EVENTS API ----------- */
    /* ---------------------------------------- */

    checkEstimatesMilestone(checkDate = true){
        this.checkEvents(checkDate);
        return this.eventsObject.estimates;
    }

    checkOrdersAcceptedMilestone(checkDate = true){
        this.checkEvents(checkDate);
        return this.eventsObject.ordersAccepted;
    }

    checkProductsAvailabilityMilestone(checkDate = true){
        this.checkEvents(checkDate);
        return this.eventsObject.availability;
    }

    checkWalletsOkMilestone(checkDate = true){
        this.checkEvents(checkDate);
        return this.eventsObject.walletsOK;
    }

    
}

export {Clock};