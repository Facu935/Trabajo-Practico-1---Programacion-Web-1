document.addEventListener('DOMContentLoaded', () => {

    const calendarContainer = document.getElementById('calendar-dates-container');
    const label = document.getElementById('current-period-label');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

   
    const getIsMobile = () => window.innerWidth <= 768; 
    let isMobile = getIsMobile();
    
    const initialMonth = 10; 
    const finalMonth = 11;   
    const year = 2025;       
    
    let currentPeriod = { month: initialMonth, year: year, weekOffset: 0 }; 
    const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Calculamos los límites estrictos para la navegación semanal
    const firstDayOfNov = new Date(year, initialMonth, 1);
    const START_DATE_LIMIT = new Date(firstDayOfNov);
    START_DATE_LIMIT.setDate(firstDayOfNov.getDate() - firstDayOfNov.getDay());
    
    const lastDayOfDec = new Date(year, finalMonth, 31);
    const END_DATE_LIMIT = new Date(lastDayOfDec);
    END_DATE_LIMIT.setDate(lastDayOfDec.getDate() + (6 - lastDayOfDec.getDay()));


    const courseEvents = [
        
        { date: '2025-11-05', title: 'Nuevo curso de Java', url: './cursos.html?curso=java', tag: 'java' },         
        { date: '2025-11-07', title: 'Nuevo curso de MySQL', url: './cursos.html?curso=mysql', tag: 'mysql' },       
        
        // Semana 2 (Dos cursos el Lunes 10)
        { date: '2025-11-10', title: 'Nuevo curso de Python', url: './cursos.html?curso=python', tag: 'python' },     
        { date: '2025-11-10', title: 'Nuevo curso de Blockchain', url: './cursos.html?curso=blockchain', tag: 'blockchain' }, 
        { date: '2025-11-12', title: 'Nuevo curso de C#', url: './cursos.html?curso=csharp', tag: 'csharp' },         
        
        // Semana 3 (Dos cursos el Viernes 21)
        { date: '2025-11-19', title: 'Nuevo curso de JavaScript', url: './cursos.html?curso=javascript', tag: 'js' },         
        { date: '2025-11-21', title: 'Nuevo curso de PHP', url: './cursos.html?curso=php', tag: 'php' },             
        { date: '2025-11-21', title: 'Nuevo curso de JQuery', url: './cursos.html?curso=jquery', tag: 'jquery' },     

        // Semana 4
        { date: '2025-11-26', title: 'Nuevo curso de HTML5', url: './cursos.html?curso=html', tag: 'html' },          
        
        // DICIEMBRE 2025 (2 cursos)
        // Semana 1 (Diciembre)
        { date: '2025-12-01', title: 'Nuevo curso de CSS3', url: './cursos.html?curso=css', tag: 'css' },            
        { date: '2025-12-03', title: 'Nuevo curso de React', url: './cursos.html?curso=react', tag: 'react' },       
    ];

    const getEventsForDay = (dateString) => {
        return courseEvents.filter(event => event.date === dateString);
    };

    const renderCalendar = ({ month, year, weekOffset }) => {
        calendarContainer.innerHTML = '';
        const today = new Date();
        
        let daysToRender = [];

        if (isMobile) {
            // MODO SEMANAL: Solo se muestra una semana

            const startDayOfFirstWeek = new Date(START_DATE_LIMIT);
            
            const currentStartDay = new Date(startDayOfFirstWeek);
            currentStartDay.setDate(startDayOfFirstWeek.getDate() + (weekOffset * 7));

            for (let i = 0; i < 7; i++) {
                const day = new Date(currentStartDay);
                day.setDate(currentStartDay.getDate() + i);
                daysToRender.push(day);
            }

            const endDay = daysToRender[6];
            label.textContent = `${daysToRender[0].getDate()} ${MONTH_NAMES[daysToRender[0].getMonth()].substring(0, 3)} - ${endDay.getDate()} ${MONTH_NAMES[endDay.getMonth()].substring(0, 3)}`;

            // Control de límites para navegación semanal
            prevBtn.disabled = daysToRender[0].getTime() <= START_DATE_LIMIT.getTime();
            nextBtn.disabled = daysToRender[6].getTime() >= END_DATE_LIMIT.getTime();

        } else {
            // MODO MENSUAL (Desktop/Tablet)
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            
            const prevMonthLastDay = new Date(year, month, 0);
            const startDayOffset = firstDayOfMonth.getDay(); 
            
            for (let i = startDayOffset; i > 0; i--) {
                const day = new Date(prevMonthLastDay);
                day.setDate(prevMonthLastDay.getDate() - i + 1);
                daysToRender.push(day);
            }

            for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                daysToRender.push(new Date(year, month, i));
            }

            const totalDays = daysToRender.length;
            const remainingDays = 42 - totalDays;
            
            for (let i = 1; i <= remainingDays && totalDays + i <= 42; i++) {
                daysToRender.push(new Date(year, month + 1, i));
            }
            
            label.textContent = `${MONTH_NAMES[month]} ${year}`;

            // Control de límites para navegación mensual
            prevBtn.disabled = month <= initialMonth; 
            nextBtn.disabled = month >= finalMonth; 
        }

        // CREACIÓN DE CÉLULAS HTML 
        daysToRender.forEach(date => {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');

            const dayString = date.toISOString().split('T')[0];
            const cellMonth = date.getMonth();
            const dateOnly = date.getDate();

            // Deshabilita días fuera del rango Nov/Dic y que no sean la semana actual en móvil
            const isOutOfRange = !isMobile && (date.getTime() < START_DATE_LIMIT.getTime() || date.getTime() > END_DATE_LIMIT.getTime());
            
            if (isOutOfRange) {
                 dayCell.classList.add('other-month', 'disabled');
            }
            
            if (!isMobile && cellMonth !== month) {
                dayCell.classList.add('other-month');
            }
            
            if (date.toDateString() === today.toDateString()) {
                dayCell.classList.add('today');
            }

            const dateNumberSpan = document.createElement('span');
            dateNumberSpan.classList.add('date-number');
            if (dateOnly === 1 || isMobile || cellMonth !== month) {
                 dateNumberSpan.textContent = `${dateOnly} de ${MONTH_NAMES[cellMonth].toLowerCase().substring(0, 3)}`;
            } else {
                 dateNumberSpan.textContent = dateOnly;
            }
            dayCell.appendChild(dateNumberSpan);

            const events = getEventsForDay(dayString);
            if (events.length > 0) {
                dayCell.classList.add('has-event');
                if (events.length > 1) dayCell.classList.add('multi-event');

                events.forEach(event => {
                    const eventLink = document.createElement('a');
                    eventLink.href = event.url;
                    eventLink.textContent = event.title.replace('Nuevo curso de ', ''); 
                    eventLink.classList.add('event-tag', event.tag);
                    if (isOutOfRange) {
                        eventLink.removeAttribute('href');
                        eventLink.classList.add('disabled-link');
                    }
                    dayCell.appendChild(eventLink);
                });
            }

            calendarContainer.appendChild(dayCell);
        });
    };


    // **4. LÓGICA DE NAVEGACIÓN Y RESPONSIVE**
    // ----------------------------------------------------

    prevBtn.addEventListener('click', () => {
        isMobile = getIsMobile();
        if (isMobile) {
            currentPeriod.weekOffset--;
        } else {
            if (currentPeriod.month > initialMonth) {
                currentPeriod.month--;
            }
        }
        renderCalendar(currentPeriod);
    });

    nextBtn.addEventListener('click', () => {
        isMobile = getIsMobile();
        if (isMobile) {
            currentPeriod.weekOffset++;
        } else {
            if (currentPeriod.month < finalMonth) { 
                currentPeriod.month++;
            }
        }
        renderCalendar(currentPeriod);
    });

    renderCalendar(currentPeriod);

    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = getIsMobile();
        if (wasMobile !== isMobile) {
            currentPeriod = { month: initialMonth, year: year, weekOffset: 0 };
            renderCalendar(currentPeriod);
        }
    });

});