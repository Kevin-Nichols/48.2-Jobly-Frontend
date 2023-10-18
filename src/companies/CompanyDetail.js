import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../api/api";
import JobCardList from "../jobs/JobCardList";
import Loading from "../common/Loading";

//Company Detail page.
const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobs() {
    async function getCompany() {
      setCompany(await Api.getCompany(handle));
    }
    getCompany();
  }, [handle]);

  if (!company) return <Loading />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;