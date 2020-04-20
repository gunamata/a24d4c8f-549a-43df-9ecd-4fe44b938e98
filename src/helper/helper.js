import moment from 'moment';

export function isDateEntryValid(date) {
    if(moment(date,"YYYY-MM-DD",true).format === 'Invalid date')
      return(false);
    if(moment(date).isValid() === false)   
      return(false);   
    return(true);
}

export function getLines(t) {
    return(t.split(/\r\n|\r|\n/))
} 

export function sort(date, name) {
    return function(a, b) {  
        if (moment(a[date]).isBefore(b[date])) {  
            return -1;  
        } else if (moment(a[date]).isAfter(b[date])) {  
            return 1;  
        }  
        else {
            if (a[name] > b[name]) {  
                return 1;  
            } else if (a[name] < b[name]) {  
                return -1;  
            } else {
                return 0;
            }
        } 
    }  
} 

