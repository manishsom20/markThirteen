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
        month = date.month+1;
      }
    
    }
    if(day>28) {
      day = 1;
      month = date.month+1;
    }

  } else {
    if(day>daysInMonth[month-1]){
      day = 1;
      month = date.month+1;
    }
  }

  if(month>12) {
    day = 1;
    month = 1;
    year = date.year+1;
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
  return [ctr,nextDay];
}

var date = {
  day: 15,
  month: 3,
  year: 2012
}

console.log(nextPalindromeDate(date));