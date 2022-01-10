"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = void 0;

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Clock =
/*#__PURE__*/
function () {
  _createClass(Clock, [{
    key: "checkEvents",

    /**
     * Clock object can be initialized in any
     * moment of the week so I check what date
     * is at this moment and set the events as true
     * if they already passed.
     * 
     * NOTE: events are checked from the last to the
     * first in order
     */
    value: function checkEvents() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (checkDate) {
        this.time = new Date();
      }

      var day = this.time.getDay();
      var hour = this.time.getHours();
      this.eventsObject.availability = false;
      this.eventsObject.estimates = false;
      this.eventsObject.ordersAccepted = false;
      this.eventsObject.walletsOK = false;

      if (day == 1) {
        // --------- Monday --------- //
        if (hour >= 20) {
          // (20:00 <--> 23:59)
          this.eventsObject.availability = true;
          this.eventsObject.estimates = true;
          this.eventsObject.ordersAccepted = true;
          this.eventsObject.walletsOK = true;
        } else if (hour >= 9) {
          // (9:00 <--> 20:00)
          this.eventsObject.availability = true;
          this.eventsObject.estimates = true;
          this.eventsObject.ordersAccepted = true;
        } else {
          // (00:00 <--> 9:00)
          this.eventsObject.estimates = true;
          this.eventsObject.ordersAccepted = true;
        }
      } else if (day == 0) {
        // --------- Sunday ---------//
        if (hour >= 23) {
          this.eventsObject.ordersAccepted = true; // (23:00 <--> 23:59)

          this.eventsObject.estimates = true;
        } else {
          this.eventsObject.estimates = true; // (00:00 <--> 23:00)
        }
      } else if (day == 6 && hour >= 9) {
        // --------- Saturday --------- //
        this.eventsObject.estimates = true; // (9:00 <--> 23:59)
      }
    }
  }]);

  function Clock() {
    _classCallCheck(this, Clock);

    this.time = undefined;
    this.stopped = false;
    this.hours = undefined;
    this.day = undefined;
    this.minutes = undefined;
    this.ordersPC = [];
    this.wallets = [];
    this.tlgrmusrs = [];
    this.flag = true;
    this.flagMsg = true;
    /**
     * An object to keep track of the main
     * events in the week cycle. If event 
     * is false is not passed yet.
     */

    this.eventsObject = {
      estimates: false,
      ordersAccepted: false,
      availability: false,
      walletsOK: false
    }; //Checking events

    this.checkEvents();
    this.start();
  }

  _createClass(Clock, [{
    key: "setOrdersPC",
    value: function setOrdersPC() {
      var _this = this;

      _API["default"].getPendingOrCancellingOrders().then(function (o) {
        _this.ordersPC = o;
      });
    }
  }, {
    key: "setWallets",
    value: function setWallets() {
      var _this2 = this;

      _API["default"].getWallets().then(function (w) {
        _this2.wallets = w;
      });
    }
  }, {
    key: "setTelegramUsers",
    value: function setTelegramUsers() {
      var _this3 = this;

      _API["default"].getAllTelegramUsers().then(function (tu) {
        _this3.tlgrmusrs = tu;
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;

      this.setOrdersPC();
      this.setWallets();
      this.setTelegramUsers();
      setInterval(function () {
        if (!_this4.stopped) {
          _this4.time.setSeconds(_this4.time.getSeconds() + 1);

          console.log(_this4.time.getDate() + ' ' + _this4.time.getMonth() + ' ' + _this4.time.getHours() + ':' + _this4.time.getMinutes() + ':' + _this4.time.getSeconds());
          _this4.hours = _this4.time.getHours();
          _this4.day = _this4.time.getDay();
          _this4.minutes = _this4.time.getMinutes();

          if (_this4.day == 6 && _this4.hours >= 9 && _this4.minutes >= 0 && _this4.minutes <= 2) {
            _this4.setFarmerEstimatesMilestone(); //insert here milestones


            _this4.flag = true;

            if (_this4.flagMsg) {
              _this4.tlgrmusrs.forEach(function (tU) {
                var msg = "Hi ".concat(tU.first_name, "! We are happy to announce that our market is ready to get orders. Please check our products at <u>http://localhost:3000/products</u> \uD83C\uDF3B");
                console.log(tU.id);

                _API["default"].sendTelegramMessage(tU.id, msg);
              });
            }

            _this4.flagMsg = false;
          } else if (_this4.day == 1 && _this4.hours >= 20 && _this4.minutes >= 0 && _this4.minutes <= 2) {
            _this4.setAvailabilityConfirmedMilestone();

            _this4.setWalletOKMilestone();

            _this4.flagMsg = true; //PAYMENTS

            if (_this4.flag) {
              _this4.ordersPC.forEach(function (orders) {
                var userWallet = _this4.wallets.filter(function (wallet) {
                  return wallet.client_id === orders.client_id;
                });

                if (userWallet[0].amount >= orders.total && orders.total !== 0) {
                  _API["default"].updateWallet(userWallet[0].amount - orders.total, userWallet[0].client_id).then(_API["default"].changeStatus(orders.id, "ACCEPTED"));
                } else _API["default"].changeStatus(orders.id, "CANCELLED");
              });

              _API["default"].deleteAllProductNW();

              _this4.flag = false;
            }
          } else if (_this4.day == 1 && _this4.hours >= 9 && _this4.minutes >= 0 && _this4.minutes <= 2) {
            _this4.setAvailabilityConfirmedMilestone();
            /* ADD FUNCTION FOR NOTIFICATIONS HERE */

          }
        }
      }, 1000);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stopped = true;
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stopped = false;
    }
    /* --------- EVENTS SETTING API --------- */

    /* -------------------------------------- */

  }, {
    key: "setFarmerEstimatesMilestone",
    value: function setFarmerEstimatesMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.eventsObject.estimates) {
        return false;
      }

      this.eventsObject.estimates = true;
      this.stop();
      var day = this.time.getDay(); //Calculating the time difference from today
      //to the milestone and setting the difference

      var daysDifference = 6 - day;
      this.time.setDate(this.time.getDate() + daysDifference);
      this.time.setHours(9, 0);
      this.restart();
      return true;
    }
  }, {
    key: "setOrdersAcceptedMilestone",
    value: function setOrdersAcceptedMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var day = this.time.getDay();

      if (this.eventsObject.ordersAccepted) {
        return false;
      }

      this.eventsObject.ordersAccepted = true;
      this.stop(); //Today is Sunday

      if (day == 0) {
        this.time.setHours(23, 0);
        this.restart();
        return true;
      } //Monday -- Saturday
      //calculating the time difference from today
      //to the milestone and setting the difference


      var daysDifference = 6 - day;
      this.time.setDate(this.time.getDate() + daysDifference + 1);
      this.time.setHours(23, 0);
      this.restart();
      return true;
    }
  }, {
    key: "setAvailabilityConfirmedMilestone",
    value: function setAvailabilityConfirmedMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var day = this.time.getDay();

      if (this.eventsObject.availability) {
        return false;
      }

      this.eventsObject.availability = true;
      this.stop(); //Today is Monday

      if (day == 1) {
        this.time.setHours(9, 0);
        this.restart();
        return true;
      } //Today is Sunday


      if (day == 0) {
        this.time.setDate(this.time.getDate() + 1);
        this.time.setHours(9, 0);
        this.restart();
        return true;
      } //Monday -- Saturday
      //calculating the time difference from today
      //to the milestone and setting the difference


      var daysDifference = 6 - day;
      this.time.setDate(this.time.getDate() + daysDifference + 2);
      this.time.setHours(9, 0);
      this.restart();
      return true;
    }
  }, {
    key: "setWalletOKMilestone",
    value: function setWalletOKMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var day = this.time.getDay();

      if (this.eventsObject.walletsOK) {
        return false;
      }

      this.eventsObject.walletsOK = true;
      this.stop(); //Today is Monday

      if (day == 1) {
        this.time.setHours(20, 0);
        this.restart();
        return true;
      } //Today is Sunday


      if (day == 0) {
        this.time.setDate(this.time.getDate() + 1);
        this.time.setHours(20, 0);
        this.restart();
        return true;
      } //Monday -- Saturday
      //calculating the time difference from today
      //to the milestone and setting the difference


      var daysDifference = 6 - day;
      this.time.setDate(this.time.getDate() + daysDifference + 2);
      this.time.setHours(20, 1);
      this.restart();
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

  }, {
    key: "reset",
    value: function reset(startDate) {
      var newTime = undefined;
      newTime = new Date(startDate);

      if (newTime == 'Invalid Date') {
        return false;
      }

      if (newTime.getDay() != 2) {
        return false;
      }

      this.eventsObject.availability = false;
      this.eventsObject.estimates = false;
      this.eventsObject.ordersAccepted = false;
      this.eventsObject.walletsOK = false;
      this.time = newTime;
      return true;
    }
    /* ----------- CHECK EVENTS API ----------- */

    /* ---------------------------------------- */

  }, {
    key: "checkEstimatesMilestone",
    value: function checkEstimatesMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this.eventsObject.estimates;
    }
  }, {
    key: "checkOrdersAcceptedMilestone",
    value: function checkOrdersAcceptedMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this.eventsObject.ordersAccepted;
    }
  }, {
    key: "checkProductsAvailabilityMilestone",
    value: function checkProductsAvailabilityMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this.eventsObject.availability;
    }
  }, {
    key: "checkWalletsOkMilestone",
    value: function checkWalletsOkMilestone() {
      var checkDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return this.eventsObject.walletsOK;
    }
  }]);

  return Clock;
}();

exports.Clock = Clock;