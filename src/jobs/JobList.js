import React, { useState, useEffect } from "react";
import Search from "../common/SearchBox";
import Api from "../api/api";
import JobCardList from "./JobCardList";
import Loading from "../common/Loading";

//Display list of jobs.
function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    search();
  }, []);

  const search = async (title) => {
    let jobs = await Api.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <Loading />;

  return (
      <div className="JobList col-md-8 offset-md-2">
        <Search searchFor={search} />
        {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default JobList;