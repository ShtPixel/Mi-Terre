// js/components/calendarWidget.js
import { getAllEvents } from '../store/eventsStore.js';
import { createEventCard } from './eventCard.js';

export function createCalendarWidget() {
  const container = document.createElement('section');
  container.className = 'calendar-widget';

  let currentDate = new Date();

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Eventos vigentes en la app
    const events = getAllEvents();

    // Primer día del mes y total de días
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    container.innerHTML = `
      <div class="calendar-header">
        <button class="calendar-nav-btn" id="prev-month">◀ Anter</button>
        <h3>📅 ${monthName}</h3>
        <button class="calendar-nav-btn" id="next-month">Sig ▶</button>
      </div>

      <div class="calendar-grid">
        <div class="calendar-day-head">Dom</div>
        <div class="calendar-day-head">Lun</div>
        <div class="calendar-day-head">Mar</div>
        <div class="calendar-day-head">Mié</div>
        <div class="calendar-day-head">Jue</div>
        <div class="calendar-day-head">Vie</div>
        <div class="calendar-day-head">Sáb</div>
        <div id="days-container" style="display: contents;"></div>
      </div>

      <div class="selected-day-events" id="calendar-event-details">
        <p style="color: var(--text-muted); font-size: 0.9rem;">Haz clic en un día marcado para ver sus eventos.</p>
      </div>
    `;

    const daysContainer = container.querySelector('#days-container');

    // Huecos vacíos antes del primer día del mes
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      daysContainer.appendChild(emptyCell);
    }

    // Días del mes
    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';
      dayCell.innerText = day;

      // Fecha en ISO (YYYY-MM-DD) para comparar
      const currentDayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Filtrar eventos que caigan en este día
      const dayEvents = events.filter(e => e.fecha.startsWith(currentDayStr));

      if (dayEvents.length > 0) {
        dayCell.classList.add('has-event');
        const dot = document.createElement('span');
        dot.className = 'event-dot';
        dayCell.appendChild(dot);

        // Click para mostrar los eventos del día
        dayCell.addEventListener('click', () => {
          const details = container.querySelector('#calendar-event-details');
          details.innerHTML = `<h4>Eventos para el ${day}/${month + 1}/${year}:</h4>`;
          const detailsGrid = document.createElement('div');
          detailsGrid.className = 'events-grid';
          detailsGrid.style.marginTop = '1rem';

          dayEvents.forEach(evt => detailsGrid.appendChild(createEventCard(evt)));
          details.appendChild(detailsGrid);
        });
      }

      daysContainer.appendChild(dayCell);
    }

    // Eventos de navegación
    container.querySelector('#prev-month').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    container.querySelector('#next-month').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  renderCalendar();
  return container;
}