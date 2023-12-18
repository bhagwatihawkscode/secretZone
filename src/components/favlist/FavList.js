import React, { useState, useEffect } from "react";
import "../SecretList/Secret.css";
import Table from "./FavTable";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { _Api } from "../../Api";
import SkeletonFile from "../SecretFile/SkeletonFile";

const FavSecretlist = () => {
  const [TableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Dates, setDate] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      let apiURL = `${process.env.REACT_APP_Base_Url}/FavSearchFilter`;
      const dataset = new FormData();

      if (isSearching) {
        dataset.append("query", searchText);
      }

      if (Dates.length === 2) {
        dataset.append("start", Dates[0].toString());
        dataset.append("end", Dates[1].toString());
      }

      const response = await _Api(dataset, apiURL);
      const { data } = await response;

      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData().then(() => {
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching, Dates.length === 2]);
  const handleSearch = () => {
    // setIsSearching((prevSearch) => !prevSearch);
    setIsSearching(true);
    // If searching is active, call fetchData
    if (isSearching) {
      fetchData();
    } else if (searchText === "") {
      setIsSearching(false);
    }
  };

  return (
    <div className="Secret-list-container">
      <div className="main-secrets">
        <header className="secret-list-header">
          <h1>Favorite List</h1>
        </header>
        <div className="tables-container">
          <div className="search-div1">
            <div className="media-div1">
              <input
                className="input-tag"
                type="text"
                placeholder="Search By Title..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  // Check if Enter key is pressed
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div className="inner-serachdiv1">
              <DatePicker
                value={Dates}
                onChange={(value) => setDate(value || [])}
                range
                containerStyle={{
                  margin: "10px",

                  padding: "10px",
                  color: "#ceb04f",
                  width: "90%",
                }}
                numberOfMonths={2}
                placeholder="Select Date"
                plugins={[
                  <Toolbar
                    position="bottom"
                    names={{
                      today: "today date",
                      deselect: "select none",
                      close: "close",
                    }}
                  />,
                ]}
              />
            </div>
          </div>
          {isLoading ? (
            // <div
            //   style={{
            //     width: "100%",
            //     height: "100%",
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //   }}
            // >
            //   <div className="loader"></div>
            // </div>
            <SkeletonFile />
          ) : (
            <Table data={TableData} isFaveApi={fetchData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavSecretlist;
