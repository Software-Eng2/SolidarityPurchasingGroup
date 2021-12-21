var express = require('express');
var clockObject = require('./Clock');

var PORT = 3002;

var app = express();

var clock = new clockObject.Clock();

app.post('/farmerEstimates', 
    (req, res) => {
        
        if(clock.setFarmerEstimatesMilestone()){
            res.status(200);
        }
        else{
            res.status(500);
        }        
    }
)

app.post('/ordersAccepted', 

    (req,res) => {
        if(clock.setOrdersAcceptedMilestone()){
            res.status(200);
        }
        else{
            res.status(500);
        }
    }
)

app.post('/availabilityConfirmed', 
    (req, res) => {
        
        if(clock.setAvailabilityConfirmedMilestone()){
            res.status(200);
        }
        else{
            res.status(500);
        }        
    }
)

app.post('/wallets', 
    (req, res) => {
        
        if(clock.setWalletOKMilestone){
            res.status(200);
        }
        else{
            res.status(500);
        }        
    }
)

app.get('/farmerEstimates', 
    (req, res) => {
        
        res.status(200).json({ passed: clock.checkEstimatesMilestone()});      
    }
)

app.get('/ordersAccepted', 
    (req, res) => {
        
        res.status(200).json({ passed: clock.checkOrdersAcceptedMilestone()});      
    }
)

app.get('/availabilityConfirmed', 
    (req, res) => {
        
        res.status(200).json({ passed: clock.checkProductsAvailabilityMilestone()});      
    }
)

app.get('/wallets', 
    (req, res) => {
        
        res.status(200).json({ passed: clock.checkWalletsOkMilestone()});      
    }
)

app.post('/reset', 

    (req, res) => {
        if(clock.reset(req.body.startDate)){
            res.status(200);
        }
        else{
            res.status(500);
        }
    }

)

app.listen(PORT, () => {
    console.log('Server clock listening at ' + PORT);
})