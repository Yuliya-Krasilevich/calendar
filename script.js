    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    let currentDate = date.getDate();
    let calendar = document.querySelector('#calendar');
    let dates = document.querySelector('.calendar__weekdays');
    let prev = document.querySelector('.calendar__prev');
    let next = document.querySelector('.calendar__next');
    let currentMoment = {
        year: currentYear,
        month: currentMonth,
        date: currentDate,
    }
    function drawDates(year, month, dates) {
        let arr = [];
        let firstDateOfMonth = 1;
        let lastDateOfMonth = getLastDayOfMonth(year, month);
        let unshiftElemsNum = getUnshiftElemsNum(year, month);
        let pushElemsNum = getPushElemsNum(year, month);
        arr = createArr(firstDateOfMonth, lastDateOfMonth);
        arr = unshiftElems(unshiftElemsNum, '', arr);
        arr = pushElems(pushElemsNum, '', arr);
        arr = chunkArr(7, arr);
        createTable(arr, dates);
    }

    function createTable(arr, parent) {
        parent.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
            let ul = document.createElement('ul');
            for (let j = 0; j < arr[i].length; j++) {
                let li = document.createElement('li');
                li.innerHTML = arr[i][j];
                ul.appendChild(li);
            }
            parent.appendChild(ul);
        }
    }
    function createArr(from, to) {
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr.push(i);
        }
        return arr;
    }

    function unshiftElems(num, elem, arr) {
        for(let i = 0; i < num; i++) {
            arr.unshift(elem);
        }
        return arr;
    }

    function pushElems(num, elem, arr) {
        for(let i = 0; i < num; i++) {
            arr.push(elem);
        }
        return arr;
    }

    function getLastDayOfMonth(year, month) {
        let date = new Date (year, month + 1, 0);
        return date.getDate();
    }

    function getUnshiftElemsNum(year, month) {
        let day = getFirstWeekDayOfMonth(year, month);
        let realDay = getRealDayOfWeek(day);
        return realDay - 1;
    }
    function getPushElemsNum(year, month) {
        let day = getLastWeekDayOfMonth(year, month);
        let realDay = getRealDayOfWeek(day);
        return 7 - realDay;
    }
    function chunkArr(num, arr) {
        let result = [];
        let chunk = [];
        let iterCount = arr.length/num;
        for(let i = 0; i < iterCount; i++) {
            chunk = arr.splice(0, num)
            result.push(chunk)
        }
        return result;
    }

    function getRealDayOfWeek(jsNumOfDay) {
        if (jsNumOfDay == 0) {
            return 7;
        } else {
            return jsNumOfDay;
        }
    }

    function getFirstWeekDayOfMonth(year, month) {
        let date = new Date (year, month, 1);
        return date.getDay();
    }

    function getLastWeekDayOfMonth(year, month) {
        let date = new Date (year, month + 1, 0);
        return date.getDay();
    }

    drawCalendar(currentYear, currentMonth, currentMoment, calendar)
    function drawCalendar(year, month, currentMoment, calendar) {
        let dates = document.querySelector('.calendar__days');
        let info = document.querySelector('.calendar__month');
        drawDates(year, month, dates);
        showInfo(year, month, info);
        showCurrentDate(currentYear, currentMonth, currentMoment);
    }

    function showCurrentDate(year, month, currentMoment) {
         if(year == currentMoment['year'] && month == currentMoment['month']) {
             li = document.querySelectorAll('li');
             console.log(li);
             for (let i = 0; i < li.length; i++) {
                 if (li[i].innerHTML == currentMoment['date']) {
                    li[i].classList.add('calendar__active');
                    break;
                 } else {
                    console.log(false);
             }
         }
    }
}
    function showInfo (year, month, elem) {
        elem.innerHTML = getMonthName(month) + ' ' + year;
    }
    function getMonthName(num) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[num]; 
    }

    prev.addEventListener('click', function() {
        currentYear =  getPrevYear(currentYear, currentMonth);
        currentMonth =  getPrevMonth(currentMonth);
        drawCalendar(currentYear, currentMonth, currentMoment, calendar);
    })

    function getPrevYear(year, month) {
        if (month == 0) {
            return year - 1;
        } else {
            return year;
        }
    }
    function getPrevMonth(month) {
        if (month == 0) {
            return 11;
        } else {
            return month - 1;
        }
    }

    next.addEventListener('click', function() {
        currentYear =  getNextYear(currentYear, currentMonth);
        currentMonth =  getNextMonth(currentMonth);
        drawCalendar(currentYear, currentMonth, currentMoment, calendar);
    })

    function getNextYear(year, month) {
        if (month == 11) {
            return year + 1;
        } else {
            return year;
        }

    }
    function getNextMonth(month) {
        if (month == 11) {
            return 0;
        } else {
            return month + 1;
        }
    }