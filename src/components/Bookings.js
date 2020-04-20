import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Consumer } from '../context';
import moment from 'moment';
import * as helper from '../helper/helper'

class Bookings extends Component {
    state = {
      guestinput: '',
      dateinput: '',
      errors: {}
    }
   
    onClick = async (dispatch, e) => {
      var errormsg = ""
      var mealschedule = []
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: "" });
      const {guestinput, dateinput} = this.state;
      // Check if the input fields are blank
      if(guestinput === "" || dateinput === "") {
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: "" });
        return;
      }      
      const guestentries = helper.getLines(guestinput)
      const dateentries = helper.getLines(dateinput)
      // Check if same number of entries for guests and dates are sent here
      if(guestentries.length !== dateentries.length) {
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'Error! Guest and Date inputs counts do not match!!' });
        return;
      }

      for(var i=0;i<guestentries.length;i++) {
        var guest = guestentries[i]
        //Check if a from and to date are provided.
        var dates = dateentries[i].split(' to ')
        if(dates.length < 2) {
          errormsg = errormsg + "\n"+ "Error! No menu generated for " + guest
          continue;          
        }        
        //Check if valid dates are provided
        if(helper.isDateEntryValid(dates[0])=== false || helper.isDateEntryValid(dates[1])=== false) {
          errormsg = errormsg + "\n"+ "Error! No menu generated for " + guest
          continue;          
        }
        //Check if end date is later than start date
        var startdate = moment(dates[0],"YYYY-MM-DD")
        var enddate = moment(dates[1],"YYYY-MM-DD")        
        if(moment(startdate).isAfter(moment(enddate))) {
          errormsg = errormsg + "\n"+ "Error! No menu generated for " + guest
          continue;            
        }
        //Now that all input is good, let's process it
        while(startdate.isSameOrBefore(enddate)) {
          mealschedule.push({ "guest": guest, "date": moment(startdate).format("YYYY-M-DD"), "mealname": "Breakfast", "classname": "morning", "sortkey": 1} )
          mealschedule.push({ "guest": guest, "date": moment(startdate).format("YYYY-M-DD"), "mealname": "Lunch","classname": "afternoon", "sortkey": 2} )
          mealschedule.push({ "guest": guest, "date": moment(startdate).format("YYYY-M-DD"), "mealname": "Dinner", "classname": "night", "sortkey": 3} )
          startdate = startdate.add(1,'days')
        }
      }
      //sort 
      mealschedule.sort(helper.sort("date","sortkey"))
      //all set, Update the context
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: errormsg });
      dispatch({ type: 'BUILD_MEAL_SCHEDULE', payload: mealschedule });
    }

    handleGuestInfo = e => {
      this.setState({ guestinput: e.target.value });
    }

    handleDateInfo = e => {
      this.setState({ dateinput: e.target.value });
    }
    
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
      return (
        <Consumer>
          {value => {
            const { dispatch } = value;
            return(
              <div className="row">
                <TextField
                  className="col-md-6"
                  name="guestinput"
                  multiline
                  rows="4"
                  onChange={this.onChange}
                  placeholder="Enter the names (one name per line)"
                />
                <TextField
                  className="col-md-6"
                  name="dateinput"
                  multiline
                  rows="4"
                  onChange={this.onChange}
                  placeholder="Enter the date range for each name (one range per line)"
                />
                <Button 
                  variant="outlined" 
                  color="primary" 
                  className="block-center"
                  onClick={this.onClick.bind(this, dispatch)}
                >
                  Get Meals Schedule
                </Button>
              </div>
            )
          }}    
        </Consumer>
      )
    }
}

export default Bookings;