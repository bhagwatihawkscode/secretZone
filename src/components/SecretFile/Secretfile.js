import React, { useState, useEffect } from "react";
import "../SecretList/Secret.css";

import FileAddModal from "./FileAddModal";
import { _Api } from "../../Api";
import FileTable from "./FileTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

import SkeltonFileComp from "./SkeletonFile";

const SecretFile = () => {
  const [TableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClosedCount, setModalClosedCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [Dates, setDate] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const fetchData = async () => {
    try {
      let apiURL = "http://127.0.0.1:4000/api/todo/FileFilter";
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
    try {
      setIsLoading(true);

      // Fetch data here

      fetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [modalClosedCount, Dates.length === 2, isSearching]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalClosedCount((prevCount) => prevCount + 1);
  };

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
          <h1>Secret File</h1>
          <button className="add-btn" onClick={openModal}>
            ADD YOUR File+
          </button>
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
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div className="inner-serachdiv1">
              <DatePicker
                value={Dates}
                onChange={setDate}
                containerStyle={{
                  margin: "10px",

                  padding: "10px",
                  color: "#ceb04f",
                  width: "90%",
                }}
                range
                numberOfMonths={2}
                placeholder="Select Date"
                plugins={[
                  <Toolbar
                    position="bottom"
                    names={{
                      today: "todat Date",
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
            <SkeltonFileComp />
          ) : (
            <FileTable data={TableData} isFetchData={fetchData} />
          )}
        </div>
      </div>
      <ToastContainer />
      <FileAddModal
        open={isModalOpen}
        handleClose={closeModal}
        handleSuccess={handleSuccess}
        handleError={handleError}
      />
    </div>
  );
};

export default SecretFile;
