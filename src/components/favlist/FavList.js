import React, { useState, useEffect } from "react";
import "../SecretList/Secret.css";
import Table from "./FavTable";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import { _Api } from "../../Api";

const FavSecretlist = () => {
  const [TableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Dates, setDate] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      let apiURL = "http://127.0.0.1:4000/api/todo/FavSearchFilter";
      const dataset = new FormData();

      if (isSearching) {
        dataset.append("query", searchText);

        if (Dates.length === 2) {
          dataset.append("start", Dates[0].toString());
          dataset.append("end", Dates[1].toString());
        }
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
  }, [searchText, Dates]);

  return (
    <div className="Secret-list-container">
      <div className="main-secrets">
        <header className="secret-list-header">
          <h1>Favorite List</h1>
        </header>
        <div className="tables-container">
          <div className="search-div">
            <div>
              <input
                className="input-tag"
                type="text"
                placeholder="Search By Title..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setIsSearching(true); // Activate searching when the user presses Enter
                  }
                }}
              />
            </div>
            <div>
              <DatePicker
                value={Dates}
                onChange={setDate}
                range
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
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            <Table data={TableData} isFaveApi={fetchData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavSecretlist;
