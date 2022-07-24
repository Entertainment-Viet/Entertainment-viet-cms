import React, { useState, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css'; // a dependency of timegrid
import '@fullcalendar/timegrid/main.css';
import './styles.css';
import './addDropdown';
export default function Calendar() {
  const [currentEvents, setCurrentEvents] = useState([]);

  useLayoutEffect(() => {
    function appendHtml(el, str) {
      const div = document.createElement('div');
      div.innerHTML = str;
      while (div.children.length > 0) {
        el.appendChild(div.children[0]);
      }
    }
    const val = document.querySelectorAll('.fc-toolbar-chunk')[2];
    const test =
      '<select class="select_month form-control"><option value="">Select Month</option><option value="01">Jan</option><option value="02">Feb</option><option value="03">Mrch</option><option value="04">Aprl</option><option value="05">May</option><option value="06">June</option><option value="07">July</option><option value="08">Aug</option><option value="09">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>';
    appendHtml(val, test);
    const selectTag = document.querySelector('.select_month');
    const calendarApi = calendarComponentRef.current.getApi();
    selectTag.addEventListener('change', () => {
      calendarApi.gotoDate(
        `${new Date().getFullYear()}-${
          document.querySelector('.select_month').value
        }-01`,
      );
    });
  }, []);

  const calendarComponentRef = React.createRef();

  const handleDateSelect = selectInfo => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = clickInfo => {
    if (
      prompt(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = events => {
    console.log(events);
    setCurrentEvents(events);
  };
  return (
    <div className="demo-app">
      {/* {this.renderSidebar()} */}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          ref={calendarComponentRef}
          height={650}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
