import React, { useMemo, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { useJob } from "../../contexts/JobContext";
import { useComponent } from "../../contexts/ComponentsContext";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2 sm:gap-0">
      <div className="flex gap-2 order-1 sm:order-none">
        <button
          onClick={() => onNavigate("PREV")}
          className="px-2 py-1 sm:px-3 sm:py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
        >
          Prev
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-2 py-1 sm:px-3 sm:py-1 rounded bg-gray-300 hover:bg-gray-400 transition text-sm"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-2 py-1 sm:px-3 sm:py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
        >
          Next
        </button>
      </div>

      <span className="font-semibold text-base sm:text-lg order-3 sm:order-none">
        {label}
      </span>

      <div className="flex gap-2 order-2 sm:order-none">
        <button
          onClick={() => onView(Views.MONTH)}
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded transition text-sm ${
            view === Views.MONTH
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Month
        </button>
        <button
          onClick={() => onView(Views.WEEK)}
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded transition text-sm ${
            view === Views.WEEK
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onView(Views.DAY)}
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded transition text-sm ${
            view === Views.DAY
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Day
        </button>
      </div>
    </div>
  );
};

const JobCalendar = () => {
  const {
    state: { jobs },
  } = useJob();

  const {
    state: { components },
  } = useComponent();

  const [selectedDateJobs, setSelectedDateJobs] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);

  const shipsById = useMemo(() => {
    const map = {};
    components.forEach((c) => {
      if (c.shipId && !map[c.shipId]) {
        map[c.shipId] = { shipId: c.shipId };
      }
    });
    return map;
  }, [components]);

  const events = useMemo(() => {
    return jobs.map((job) => ({
      title: job.title,
      start: new Date(job.scheduledDate),
      end: new Date(job.scheduledDate),
      allDay: true,
      jobId: job.id,
      componentId: job.componentId,
      status: job.status,
      priority: job.priority,
    }));
  }, [jobs]);

  const handleSelectSlot = ({ start }) => {
    const selectedDate = moment(start).format("YYYY-MM-DD");
    const jobsOnDate = jobs.filter(
      (job) => moment(job.scheduledDate).format("YYYY-MM-DD") === selectedDate
    );
    setSelectedDateJobs(jobsOnDate);
    setShowDetails(true);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleView = (newView) => {
    setView(newView);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad";
    if (event.status === "Completed") backgroundColor = "#4CAF50";
    if (event.status === "In Progress") backgroundColor = "#FFC107";
    if (event.status === "Pending") backgroundColor = "#F44336";

    if (event.priority === "High") backgroundColor = "#D32F2F";
    if (event.priority === "Medium") backgroundColor = "#FF9800";

    const style = {
      backgroundColor,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      fontSize: "0.75rem",
    };

    return { style };
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">

      <div
        className={`${
          showDetails ? "hidden lg:block lg:w-2/3" : "w-full"
        } bg-white rounded-xl shadow p-4 sm:p-6`}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
          view={view}
          onView={handleView}
          date={date}
          onNavigate={handleNavigate}
          views={{
            month: true,
            week: true,
            day: true,
          }}
          components={{ toolbar: CustomToolbar }}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      <div
        className={`${
          showDetails ? "block" : "hidden lg:block"
        } lg:w-1/3 bg-white rounded-xl shadow p-4 sm:p-6`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold border-b pb-2 text-gray-700">
            Jobs on Selected Date
          </h2>
          <button
            onClick={() => setShowDetails(false)}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {selectedDateJobs.length === 0 ? (
          <p className="text-gray-500">No jobs scheduled on this day.</p>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {selectedDateJobs.map((job) => {
              const component = components.find(
                (c) => c.id === job.componentId
              );

              return (
                <div
                  key={job.id}
                  className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          job.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : job.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          job.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : job.priority === "Medium"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {job.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {job.description || "No description available."}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Scheduled:</span>{" "}
                      {moment(job.scheduledDate).format("MMM D, YYYY h:mm A")}
                    </p>
                  </div>

                  {component && (
                    <div className="border-t pt-2 mt-2">
                      <h4 className="font-medium text-gray-700 text-sm mb-1">
                        Component
                      </h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div>
                          <span className="text-gray-500">Name:</span>{" "}
                          {component.name}
                        </div>
                        <div>
                          <span className="text-gray-500">Serial:</span>{" "}
                          {component.serialNumber}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!showDetails && selectedDateJobs.length > 0 && (
        <button
          onClick={() => setShowDetails(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default JobCalendar;
