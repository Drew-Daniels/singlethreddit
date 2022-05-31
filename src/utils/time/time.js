import { DateTime } from 'luxon';

/**
 * Returns a formatted string denoting approximately how long a go a given JS Date was relative to now.
 * @param {JSDate} dtStart 
 * @returns string
 */
function getTimeSince(dtStart) {
    if (!(dtStart instanceof Date)) { throw new Error('"dtStart" must be a JS Date') }
    const shape = number => Math.round(Math.abs(number));
    const getDateString = (val, units) => `${val} ${units} ago`; 

    const fromDate = DateTime.fromJSDate(dtStart);
    const days = shape(fromDate.diffNow('days').days);
    const hours = shape(fromDate.diffNow('hours').hours);
    const minutes = shape(fromDate.diffNow('minutes').minutes);
    
    var value, units, result;
    switch (true) {
        case (days >= 1):
            value = days;
            if (days === 1) {
                units = 'day';
            } else {
                units = 'days';
            }
            result = getDateString(value, units);
            break;
        case (hours >= 1):
            value = hours;
            if (hours === 1) {
                units = 'hour';
            } else {
                units = 'hours';
            }
            result = getDateString(value, units);
            break;
        default:
            value = minutes;
            if (minutes === 1) {
                units = 'minute';
            } else {
                units = 'minutes';
            }
            result = getDateString(value, units);
    }
    return result;
}

export {
    getTimeSince,
}