import React, { useState, useEffect } from "react";
import SearchBox from "../common/SearchBox";
import Api from "../api/api";
import CompanyCard from "./CompanyCard";
import Loading from "../common/Loading";

//Displays list of companies page.
const CompanyList = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);
  
  async function search(name) {
    let companies = await Api.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <Loading />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchBox searchFor={search} />
      {companies.length
          ? (
              <div className="CompanyList-list">
                {companies.map(c => (
                    <CompanyCard
                        key={c.handle}
                        handle={c.handle}
                        name={c.name}
                        description={c.description}
                        logoUrl={c.logoUrl}
                    />
                ))}
              </div>
          ) : (
              <p className="lead">Sorry, no results were found!</p>
          )}
    </div>
  );
}

export default CompanyList;