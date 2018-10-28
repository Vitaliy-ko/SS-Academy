'use strict';


(function createClockCalendar () {
    class ClockCalendar extends HTMLElement {
      constructor() {
        super();
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
        const clock_hm = document.createElement('h1');
        const clock_hms = document.createElement('h1');
        const calendar_eu = document.createElement('h1');
        const calendar_ua = document.createElement('h1');
        const style = document.createElement('style');

        setAttributeElements();
        addElementsStyles(style);
        changeStateOnMouseClicks();
        paintElementHover();
        setInterval(getCurrentDate, 100); //  run Time/Date
     
        // Attach the created elements to the shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(clock_hm);
        shadow.appendChild(clock_hms);
        shadow.appendChild(calendar_eu);
        shadow.appendChild(calendar_ua);

        function setAttributeElements () {
            clock_hms.setAttribute('id', 'clock_hms');
            calendar_eu.setAttribute('id', 'calendar_eu');
            calendar_ua.setAttribute('id', 'calendar_ua');
        }

        function addElementsStyles(style) {
            style.textContent = `
                h1 {
                    font-size: 200px;
                }
                #calendar_eu, #calendar_ua, #clock_hms  {
                    display: none;
                }
            `;
        }

        function changeStateOnMouseClicks () {
            preventOpenContextMenu();
            mouseLeftClick(clock_hm, clock_hms);
            mouseLeftClick(clock_hms, clock_hm);
            mouseLeftClick(calendar_eu, calendar_ua);
            mouseLeftClick(calendar_ua, calendar_eu);
            mouseRightClick(clock_hm, calendar_eu);
            mouseRightClick(clock_hms, calendar_eu);
            mouseRightClick(calendar_eu, clock_hm);
            mouseRightClick(calendar_ua, clock_hm);

            function mouseLeftClick (idInitialState, idFinalState) {
                idInitialState.onclick = function () {
                    idInitialState.style.display = 'none';
                    idFinalState.style.display = 'block';
                }
            }
            function mouseRightClick (elementInitialState, elementFinalState) {
                elementInitialState.oncontextmenu = function () {
                    elementInitialState.style.display = 'none';
                    elementFinalState.style.display = 'block';
                }
            }
            function preventOpenContextMenu () {
                document.oncontextmenu = function () {
                return false;
                }
            }
        }

        function paintElementHover () {
            paintHover(clock_hm, '#6bf442')
            paintHover(clock_hms, '#3fecfc')
            paintHover(calendar_eu, '#df3ffc')
            paintHover(calendar_ua, '#fc873f')
        
            function paintHover (element, color) {
                element.onmouseover = function () {
                element.style.color = color;
                };
                element.onmouseout = function () {
                    element.style.color = `black`;
                };
            }
        }
        
        function getCurrentDate () {
           let currentTimeAndDate = getTimeAndDate();
            clock_hm.textContent = currentTimeAndDate.currentMainTime;
            clock_hms.textContent = currentTimeAndDate.currentFullTime;
            calendar_eu.textContent = currentTimeAndDate.currentEUDate;
            calendar_ua.textContent = currentTimeAndDate.currentUADate;
       }
      }
    };

    // Define the new element
    customElements.define('clock-calendar', ClockCalendar);
    let clockCalendar = new ClockCalendar()
    let insertCustomElement = document.getElementsByClassName('Clock-Calendar');
    insertCustomElement[0].appendChild(clockCalendar);
})();

function getTimeAndDate () {
    let currentFullDate = getCurrentFullDate();
    let currentDate = getCurrentDate(currentFullDate);
    let currentTime = getCurrentTime(currentFullDate);
    setTwoDigitsDate(currentDate, currentTime);
    let currentMainTime = getCurrentMainTime(currentTime);
    let currentFullTime = getCurrentFullTime(currentTime, currentMainTime);
    let currentEUDate = getCurrentEUDate(currentDate);
    let currentUADate = getCurrentUADate(currentDate);
    return {currentMainTime, currentFullTime, currentEUDate, currentUADate};


    function getCurrentFullDate () {
        let currentFullDate = new Date();
        return currentFullDate;
    }
    function getCurrentDate (currentFullDate) {
        let currentDay = currentFullDate.getDate();
        let currentMonth = currentFullDate.getMonth();
        let currentFullYear = currentFullDate.getFullYear();
        let currentDate = {currentDay, currentMonth, currentFullYear};
        return currentDate;
    }

    function getCurrentTime (currentFullDate) {
        let currentHours = currentFullDate.getHours();
        let currentMinutes = currentFullDate.getMinutes();
        let currentSeconds = currentFullDate.getSeconds();
        let currentTime = {currentHours, currentMinutes, currentSeconds};
        return currentTime;
    }    

    function setTwoDigitsDate () {
        for (let object of arguments) {
            for (let key in object) {
                object[key] = addPadStart(object[key]);
            }
        }
    }

    function addPadStart (date) {
        let getString = String(date);
        let result = getString.padStart(2, '0');
        return result;
    }

    function getCurrentMainTime (currentTime) {
        let currentHours = currentTime.currentHours;
        let currentMinutes = currentTime.currentMinutes;
        let currentMainTime = `${currentHours}:${currentMinutes}`;
        return currentMainTime;
    }

    function getCurrentFullTime (currentTime, currentMainTime) {
        let currentSeconds = currentTime.currentSeconds;
        let currentFullTime = `${currentMainTime}:${currentSeconds}`;
        return currentFullTime;
    }

    function getCurrentUADate (currentDate) {
        let currentDay = currentDate.currentDay;
        let currentMonth = currentDate.currentMonth;
        let currentFullYear = currentDate.currentFullYear;
        let currentYear = currentFullYear;
        let currentEUDate = `${currentDay}.${currentMonth}.${currentYear}`;
        return currentEUDate;
    }

    function getCurrentEUDate (currentDate) {
        let currentDay = currentDate.currentDay;
        let currentMonth = currentDate.currentMonth;
        let currentFullYear = currentDate.currentFullYear;
        let currentYear = currentFullYear.slice(2);
        let currentEUDate = `${currentDay}/${currentMonth}/${currentYear}`;
        return currentEUDate;
    }
}
