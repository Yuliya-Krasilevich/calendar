    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();
    let currentDate = date.getDate();
    let currentWeekDay = date.getDay();
    let calendar = document.querySelector('#calendar');
    let dates = document.querySelector('.calendar__weekdays');
    let prev = document.querySelector('.calendar__prev');
    let next = document.querySelector('.calendar__next');

    let currentMoment = {
        year: currentYear,
        month: currentMonth,
        date: currentDate,
    };

    drawCalendar(currentYear, currentMonth, currentMoment);

    function drawCalendar(year, month, currentMoment) {
        let dates = document.querySelector('.calendar__days');
        let info = document.querySelector('.calendar__month');
        drawDates(year, month, dates);
        getMonthName(year, month, info);
        showCurrentDate(currentYear, currentMonth, currentMoment);
    };

    function showCurrentDate(year, month, currentMoment) {
        let li = document.querySelectorAll('li');
        if(year == currentMoment['year'] && month == currentMoment['month']) {
            for (let i = 0; i < li.length; i++) {
                if (li[i].innerHTML == currentMoment['date']) {
                   li[i].classList.add('calendar__active');
                   break;
                } else {
                   console.log(false);
                }
            }
        } 
    };

   function getMonthName (year, month, elem) {
       let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
       elem.innerHTML = months[month] + ' ' + year;
       return elem.innerHTML;
   };

    function drawDates(year, month, dates) {
        let arr = [];
        let firstDateOfMonth = 1;
        let lastDateOfMonth = new Date (year, month + 1, 0).getDate();
        let unshiftElemsNum = getUnshiftElemsNum(year, month);
        let pushElemsNum = getPushElemsNum(year, month);

        arr = createArr(firstDateOfMonth, lastDateOfMonth);
        let previousDate = new Date(year, month, 0).getDate();
        arr = unshiftElems(unshiftElemsNum, previousDate, arr);
        let nextDate = new Date(year, month+1, 1).getDate();
        arr = pushElems(pushElemsNum, nextDate, arr);

        arr = chunkArr(7, arr);
        createTable(arr, dates);
    };

    function getUnshiftElemsNum(year, month) {
        let date = new Date (year, month, 1);
        let day = date.getDay();
        let realDay = (day == 0) ? 7 : day;
        return realDay - 1;
    };
    function getPushElemsNum(year, month) {
        let date = new Date (year, month + 1, 0);
        let day = date.getDay();
        let realDay = (day == 0) ? 7 : day;
        return 7 - realDay;
    };


    function createArr(from, to) {
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr.push(i);
        }
        return arr;
    };

    function unshiftElems(num, elem, arr) {
        for(let i = 0; i < num; i++) {
            arr.unshift(elem - i);
        }
        return arr;
    };

    function pushElems(num, elem, arr) {
        for(let i = 1; i < num + 1; i++) {
            arr.push(elem = i);
        }
        return arr;
    };

    function chunkArr(num, arr) {
        let result = [];
        let chunk = [];
        let iterCount = arr.length/num;
        for(let i = 0; i < iterCount; i++) {
            chunk = arr.splice(0, num)
            result.push(chunk)
        }
        return result;
    };
    
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
    };

    prev.addEventListener('click', function() {
        currentYear =  (currentMonth == 0) ? currentYear - 1 : currentYear;
        currentMonth =  (currentMonth == 0) ? 11 : currentMonth - 1;
        drawCalendar(currentYear, currentMonth, currentMoment, calendar);
    });
    
    
    next.addEventListener('click', function() {
        currentYear =  (currentMonth == 11) ? currentYear + 1 : currentYear;
        currentMonth =  (currentMonth == 11) ? 0 : currentMonth + 1;
        drawCalendar(currentYear, currentMonth, currentMoment, calendar);
    });