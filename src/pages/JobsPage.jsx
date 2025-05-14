import React from 'react'
import JobForm from '../components/Jobs/JobForm'
import JobCalendar from '../components/Jobs/JobCalendar'
import JobList from '../components/Jobs/JobList'

const JobsPage = () => {
  // const [allJobs, setAllJobs] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [shipFormTitle, setShipFormTitle] = useState('');

  // useEffect(() => {
  //   const savedData = localStorage.getItem('jobs');
  //   if (savedData) {
  //     const parsed = JSON.parse(savedData);
  //     setAllShips(parsed || []);
  //   } else {
  //     localStorage.setItem('jobs', JSON.stringify(data.jobs));
  //     setAllShips(data.jobs);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (allJobs.length > 0) {
  //     localStorage.setItem('jobs', JSON.stringify(allShips));
  //   }
  // }, [allJobs]);

  // const handleAddShip = () => {
  //   setShipFormTitle('Add New Ship');
  //   setShowForm(true);
  // };

  // const handleFormSubmit = (newShip) => {
  //   // Assign unique id
  //   newShip.id = Date.now();
  //   setAllShips([...allShips, newShip]);
  //   setShowForm(false);
  // };

  // const handleUpdateShips = (updatedShips) => {
  //   setAllShips(updatedShips);
  // };

  return (
    <div className="min-h-screen w-full px-4">
      {/* {showForm && (
        <ShipForm setShow={setShowForm} onSubmit={handleFormSubmit} title={shipFormTitle} />
      )} */}
      <div className="w-full bg-gray-600 flex justify-center items-center text-center shadow-md rounded-xl p-4">
        <h1 className="text-white text-2xl font-semibold">Jobs</h1>
      </div>
      <div className="w-full flex flex-col gap-3 mt-2">
        {/* <button
          onClick={handleAddShip}
          className="self-start h-auto px-2 py-1 bg-blue-100 border-blue-600 border-1 font-semibold rounded-4xl shadow-md text-blue-700"
        >
          Add New Ship
        </button> */}
        <div className="w-full">
          <JobList  />
        </div>
      </div>
    </div>
  );
};

export default JobsPage