window.addEventListener('DOMContentLoaded', (event) => {
    const calendar = document.getElementById("calendar"),
          calendarBody = document.querySelector('.calendar-body'),
          monthPicker = document.getElementById("monthPicker"),
          yearPicker = document.getElementById("yearPicker");

    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    const months = [ "January", "February", "March", "April", "May", "June", "July",
                     "August", "September", "October", "November", "December" ];

    function renderCalendar() {
        yearPicker.innerText = year;
        monthPicker.innerText = months[month];
        calendarBody.innerHTML = '';
        
        let firstDay = new Date(year, month, 1).getDay(),
            daysInMonth = new Date(year, month + 1, 0).getDate();
    
        // Empty slots for days of the week
        for (let i = 0; i < firstDay; i++) {
            calendarBody.innerHTML += "<div></div>";
        }
    
        // Days in month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarBody.innerHTML += `<div${i === day ? ' class="today"' : ""}>${i}</div>`;
        }
    }
    
    renderCalendar();
});