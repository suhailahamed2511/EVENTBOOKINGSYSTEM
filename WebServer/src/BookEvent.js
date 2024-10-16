import * as React from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3000";

const EventUpdate = () => {

  const [status, setStatus] = React.useState("");
  const [eventData, setEventData] = React.useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryId = searchParams.get('id');
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    const initialData = async () => await axios({
      method: 'get',
      url: `/event?id=${queryId}`,
    }).then(function (response) {
      if (response.status === 200) {
        if (response.data.length > 0) {
          setStatus('success');
          setEventData(response.data[0]);
        } else {
          setStatus('no data');
          setEventData(undefined);
        }
      }
      else {
        setStatus('warn');
        setEventData(undefined);
      }
    })
      .catch(function (error) {
        setStatus('error');
        setEventData(undefined);
      });
    initialData();
  }, [queryId, submitted])

  const handleSubmit = async (e) => {
    const newSeatCount = eventData.seats - 1;
    e.preventDefault();
    await axios({
      method: 'put',
      url: `/event/${queryId}`,
      data: {
        ...eventData,
        seats: newSeatCount
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          setStatus('success');
          setSubmitted(true);
        }
        else {
          setStatus('warn');
          setEventData(undefined);
        }
      })
      .catch(function (error) {
        setStatus('error');
        setEventData(undefined);
      });
  }

  let statusDiv;

  if (status === 'no data') {
    statusDiv = <div className="flex items-center p-4 mt-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
      <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Data not found!</span>
      </div>
    </div>
  }

  if (status === "warn") {
    statusDiv = (
      <div
        className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Order Creation have some issue!</span>{" "}
          Please connect with technical team.
        </div>
      </div>
    );
  }

  if (status === "error") {
    statusDiv = (
      <div
        className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Server Not responding!</span> Please
          connect with technical team.
        </div>
      </div>
    );
  }


  return (
    <div className="z-50">
      <h2 className="text-center mb-4 text-orange-500 leading-none tracking-tight text-xl mt-3">
        Book Event
      </h2>
      {
        eventData && <div className="max-w-4xl mx-auto border-solid border-2 border-orange-600 p-5 rounded-lg m-2">

          <div className="table w-96 justify-center">

            <div className="table-row">
              <span className="table-cell">
                Title
              </span>
              <span className="table-cell">
                {eventData.title}
              </span>
            </div>

            <div className="table-row">
              <span className="table-cell">
                Description
              </span>
              <span className="table-cell">
                {eventData.description}
              </span>
            </div>

            <div className="table-row">
              <span className="table-cell">
                Category
              </span>
              <span className="table-cell">
                {eventData.category}
              </span>
            </div>

            <div className="table-row">
              <span className="table-cell">
                Date
              </span>
              <span className="table-cell">
                {eventData.date}
              </span>
            </div>

            <div className="table-row">
              <span className="table-cell">
                Available Seats
              </span>
              <span className="table-cell">
                {eventData.seats}
              </span>
            </div>

            <div className="table-row">
              <span className="table-cell">
                Price
              </span>
              <span className="table-cell">
                {eventData.price}
              </span>
            </div>

          </div>

          {!submitted && eventData.seats > 0 && <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              onClick={handleSubmit}
            >
              Book
            </button>
          </div>}

          {eventData.seats < 1 && <div className="flex justify-center text-red-500">

            Event is fully booked
          </div>}


          {statusDiv}
        </div>

      }
      {!queryId && <div className="flex justify-center text-red-500">Please visit Event list page
      </div>}
    </div>
  );
};

export default EventUpdate;
