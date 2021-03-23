/**
 * @file Manages onclick event for Price Calculator on Sorrento by the Sea website.
 * @author Suzuka Fukami
 */

 /**
  * Class that holds information of dates and price for each date.
  * 12/19-01/31: $250
  * 02/01-05/31: $220
  * 06/01-08/31: $200
  * 09/01-12/18: N/A
  */
 class DatePrice{
    /**
     * Creates a new DatePrice object
     * @class
     * @param {string} d 
     */
    constructor(d){
        this.d = new Date(d); //convert selected input string to Date
        this.p = this.getPrice(); //p is to store the price of the selected date / always use this keyword when referring to the method or property of the class
    }
    getPrice(){
        if(this.d.getTime() >= new Date(currentYear,0,1) && this.d.getTime() <= new Date(currentYear,0,31)){
            return 250;
        }
        else if(this.d.getTime() >= new Date(currentYear,1,1) && this.d.getTime() <= new Date(currentYear,4,31)){
            return 220;
        }
        else if(this.d.getTime() >= new Date(currentYear,5,1) && this.d.getTime() <= new Date(currentYear,7,31)){
            return 200;
        }
        else if(this.d.getTime() >= new Date(currentYear,11,19) && this.d.getTime() <= new Date(currentYear,11,31)){
            return 250;
        }
        else{
            return 0;
        }
    }
}

const monthNames = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

/**
 * @constant {Date}
 * 1st January of year 2020.
 * This constant has to be modified appropriately each year.
 * @example 
 * //To change the calendar for 2021
 * const firstDayOfYear = new Date(2021,0,1);
 */
const firstDayOfYear = new Date(2021,0,1);

/**
 * @constant {number}
 * Returns a number 2021.
 */
const currentYear = firstDayOfYear.getFullYear();
const jan = new Date(currentYear, '0');
const mar = new Date(currentYear, '2');


/**
 * @function createCalendar
 * Creates a dropdown calendar for a passed month.
 * @param {string} month 
 */
function createCalendar(month){
    for(i=0; i<monthNames.length; i++){
        if(month == monthNames[i]){
            var firstDay = new Date(firstDayOfYear.getFullYear(), i, 1);
            var lastDay = new Date(firstDayOfYear.getFullYear(), i+1, 0);
            while(firstDay <= lastDay){
                var opt = document.createElement("option"); //<option></option>
                var text = document.createTextNode(firstDay.toLocaleDateString()); //XX/XX/XXXX - string
                opt.appendChild(text); //<option>XX/XX/XXXX</option>
                document.getElementById("addDateDropDown").appendChild(opt); //<select><option>XX/XX/XXXX</option></select>
                firstDay.setDate(firstDay.getDate() + 1); //next day
            }
        }
    }
}

/**
 * Creates a dropdown for the next 3 months.
 */
while (jan.getTime() <= mar.getTime()){
    var opt = document.createElement("option");
    var text = document.createTextNode(jan.toLocaleString('default', { month: 'long' }));
    opt.appendChild(text);
    document.getElementById("monthDropDown").appendChild(opt);
    jan.setMonth(jan.getMonth() + 1);
}


/**
 * @function selectMonth
 * Gets the selected month value and pass that to createCalendar function as an argument.
 */
function selectMonth(){
    document.getElementById("addDateDropDown").innerHTML = "";
    document.getElementById("removeDateDropDown").innerHTML = "";
    var monthSelected = document.getElementById("monthDropDown").value;
    createCalendar(monthSelected);
}


var selectedDates = new Array();
/**
 * @function displayPrice
 * Gets the selected date value and pass that to DatePrice constructor to instantiate an object.
 * This object will then be added to selectedDates array.
 * Adds up the date price of each object in the array.
 */
function displayPrice(){
    var selectedDate = document.getElementById("addDateDropDown").value;

    if(selectedDates.some(date => date.d.toLocaleDateString() == selectedDate)){
        alert("You cannot add the date that's already selected");
    }
    else if(new DatePrice(selectedDate).p == 0){
        alert("The apartment is not available between 1st September and 18th December. Please select a different date.");
    }
    else{
        selectedDates.push(new DatePrice(selectedDate));
    }

    var total = 0;
    for(var i = 0; i < selectedDates.length; i++){
        total += selectedDates[i].p;
    }
    document.getElementById("total").innerHTML = total;

    document.getElementById("removeDateDropDown").innerHTML = "";
    for(var i=0; i<selectedDates.length; i++){

        selectedDates.sort(compare);

        var opt = document.createElement("option");
        var text = document.createTextNode(selectedDates[i].d.toLocaleDateString()); 
        opt.appendChild(text); 
        document.getElementById("removeDateDropDown").appendChild(opt);
    }

}


/**
 * Compares 2 objects in selectedDates array and sort them in acsending order.
 * @param {object} a 
 * @param {object} b 
 */
function compare(a, b){
    const dateA = a.d.getTime();
    const dateB = b.d.getTime();

    let comparison = 0;
    if(dateA > dateB){
        comparison = 1;
    }
    else if (dateA < dateB){
        comparison = -1;
    }
    return comparison;
}


/**
 * @function binarySearch
 * @param {sting} value 
 * @param {object} list 
 * Function to search for the index of selected date.
 */
function binarySearch(value, list) {
    let first = 0;
    let last = list.length - 1;
    let position = -1;
    let found = false;
    let middle;

    while (found === false && first <= last) {
        middle = Math.floor((first + last) / 2);
        if (list[middle].d.getTime() == value.getTime()) {
            found = true;
            position = middle;
        } else if (list[middle].d.getTime() > value.getTime()) {
            last = middle - 1;
        } else {
            first = middle + 1;
        }
    }
    return position;
}





/**
 * @function removePrice
 * Gets the index of selected date from selectedDates array and subtract the price of the object from total.
 * This object will then be removed from the array.
 */
function removePrice(){
    var total = document.getElementById("total").innerHTML;
    var dateInput = document.getElementById("removeDateDropDown").value;
    var selectedDate = new Date(dateInput);
    // var selectedIndex = document.getElementById("removeDateDropDown").selectedIndex;

    let posFound = binarySearch(selectedDate, selectedDates);
    if(posFound != -1){
        total -= selectedDates[posFound].p;
        selectedDates.splice(posFound, 1);
        document.getElementById("removeDateDropDown").remove(posFound);
    }

    document.getElementById("total").innerHTML = total;
}