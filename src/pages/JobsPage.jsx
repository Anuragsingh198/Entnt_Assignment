import React from 'react'
import JobForm from '../components/Jobs/JobForm'
import JobCalendar from '../components/Jobs/JobCalendar'
import JobList from '../components/Jobs/JobList'

const JobsPage = () => {
  return (
    <div>
        <JobForm/>
        <JobCalendar/>
        <JobList/>
    </div>
  )
}

export default JobsPage