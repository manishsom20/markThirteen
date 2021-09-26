function reverseStr(str) {
  var strSplit =str.split('');
  var strReverse = strSplit.reverse();
  var strJoin = strReverse.join('');
  return strJoin;
}

function checkPalindrome(str) {
  var reverse = reverseStr(str);
  if(reverse === str) {
    return true;
  }
  return false;
}

function convertDateToStr(date) {
  var dateStr = {day: "", month: "", year:""};
  if(date.day<10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if(date.month<10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function dateAllVariation(date) {
  var convertedDate = convertDateToStr(date);
  
  var ddmmyyyy = convertedDate.day+convertedDate.month+convertedDate.year;
  var mmddyyyy = convertedDate.month+convertedDate.day+convertedDate.year;
  var yyyymmdd = convertedDate.year+convertedDate.month+convertedDate.day;
  var ddmmyy = convertedDate.day+convertedDate.month+convertedDate.year.slice(-2);
  var mmddyy = convertedDate.month+convertedDate.day+convertedDate.year.slice(-2);
  var yymmdd = convertedDate.year.slice(-2)+convertedDate.month+convertedDate.day;

  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeAllFormat(date) {
  var allDateFormat = dateAllVariation(date);
  var isPalindrome = false;

  for(var i=0; i<allDateFormat.length; i++) {
    if(checkPalindrome(allDateFormat[i])){
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
}

function isLeapYear(year) {
  if(year%400===0){
    return true;
  }
  if(year%100===0){
    return false;
  }
  if(year%4===0){
    return true;
  }
  return false
}

function nextDay(date) {
  var day = date.day+1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month===2){
    if(isLeapYear(year)){
      if(day>29){
        day = 1;
        month++;
      }
    
    }
    else {
      if(day>28) {
        day = 1;
        month++;
      }
    }

  } else {
    if(day>daysInMonth[month-1]){
      day = 1;
      month ++;
    }
  }

  if(month>12) {
    day = 1;
    month = 1;
    year++;
  }
  return {day:day,month:month,year:year};
}

function nextPalindromeDate(date) {

  var ctr = 0;
  var next = nextDay(date);

  while(1) {
    ctr++;
    var isPalin = checkPalindromeAllFormat(next);
    if(isPalin){
      break;
    }
    else{
      next = nextDay(next);
    }
  }
  return [ctr,next];
}

function previousDay(date) {
  var day = date.day-1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month===3) {
    if(isLeapYear(year)){
       if(day<1) {
      day = 29;
      month--;
      }
    } else{
       if(day<1) {
      day = 28;
      month--;
      }
    }

  } else {
    if(day<1) {
      day = daysInMonth[month-1];
      month--;
    }
  }
  if(month<1) {
    day = 31;
    month = 12;
    year--;
  }
  return {day:day,month:month, year:year};
}


var date = {
  day: 4,
  month: 2,
  year: 2020
}

function previousPalindromeDate(date) {
  var ctr = 0;
  var previous = previousDay(date);

  while(1) {
    ctr++;
    var isPalin = checkPalindromeAllFormat(previous);
    if(isPalin) {
      break;
    } else {
      previous= previousDay(previous);
    }
  }
  return [ctr,previous];
}

// console.log(nextPalindromeDate(date));
// console.log(previousPalindromeDate(date));

var userinput = document.querySelector("#userInput");
var btn = document.querySelector("#btnShow");
var outputdiv = document.querySelector("#outputDiv");

function clickHandler() {
  if(userinput.value !== ""){
    var date = userinput.value;
    var correctDate = date.split("-");
    var dateI = {
      day: Number(correctDate[2]),
      month: Number(correctDate[1]),
      year: Number(correctDate[0])
    };
    var isPalin = checkPalindromeAllFormat(dateI);
    if(isPalin) {
      outputdiv.innerText = "Yay! Your birthday is palindrome!";
    } else {
      var [noNext, nextDate] = nextPalindromeDate(dateI);
      // outputdiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and it is ${noNext} days ahead.`;
      var [noPrevious, previousDate] = previousPalindromeDate(dateI);
      outputdiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} and it is ${noNext} days ahead.The previous palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year} and you missed it by ${noPrevious} days.`
    }
    
  } else {
    outputdiv.innerText = "Please enter your birthday date";
  }
}


btn.addEventListener("click", clickHandler);