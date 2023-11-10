import React, { useState, useEffect } from "react";
import "./Secret.css";
import Table from "./Table";
import TransitionsModal from "./AddModel";
import { NormalCall, _Api } from "../../Api";

import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import EditModal from "./EditModal";

const Secretlist = () => {
  const { state } = useLocation();
  const [TableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClosedCount, setModalClosedCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("Select");
  const [Dates, setDate] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // console.log(Dates[0].toString());

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
      let apiURL = "http://127.0.0.1:4000/api/todo/SearchFilter";
      const dataset = new FormData();

      if (isSearching) {
        dataset.append("query", searchText);
      }

      if (Dates.length === 2) {
        dataset.append("start", Dates[0].toString());
        dataset.append("end", Dates[1].toString());
      }

      if (filterBy !== "Select") {
        if (isFavorited === true) {
          dataset.append("isFavorited", "true");
        } else if (isFavorited === false) {
          dataset.append("isFavorited", "false");
        }
      }

      if (state?.rowId) {
        dataset.append("rowId", state?.rowId);
        dataset.append("notificationId", state?.notificationId);
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

    const fetchDataAndCheckEditModal = async () => {
      try {
        await fetchData();
        setIsLoading(false);

        if (state?.rowId) {
          const check = await NormalCall(
            state?.rowId,
            "http://127.0.0.1:4000/api/todo/openEditModal"
          );

          setIsEditModalOpen(check);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataAndCheckEditModal();
  }, [modalClosedCount, searchText, Dates, filterBy, state]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalClosedCount((prevCount) => prevCount + 1);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSearch = () => {
    setIsSearching(true);
    fetchData();
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterBy(selectedFilter);

    if (selectedFilter === "Fav") {
      setIsFavorited(true);
    } else if (selectedFilter === "NonFav") {
      setIsFavorited(false);
    } else {
      setIsFavorited(null);
    }

    fetchData();
  };

  return (
    <div className="Secret-list-container">
      <div className="main-secrets">
        <header className="secret-list-header">
          <h1>Secret List</h1>
          <button className="add-btn" onClick={openModal}>
            ADD YOUR SECRETS +
          </button>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div>
              <select
                className="select-btn"
                value={filterBy}
                onChange={handleFilterChange}
              >
                <option className="options" value="Select">
                  Select
                </option>
                <option className="options" value="Fav">
                  Favorite
                </option>
                <option className="options" value="NonFav">
                  Non Favorite
                </option>
              </select>

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
            <Table data={TableData} isFetchData={fetchData} />
          )}
        </div>
      </div>
      <ToastContainer />
      <TransitionsModal
        open={isModalOpen}
        handleClose={closeModal}
        handleSuccess={handleSuccess}
        handleError={handleError}
      />
      <EditModal
        open={isEditModalOpen}
        handleClose={closeEditModal}
        itemId={state?.rowId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
      />
    </div>
  );
};

export default Secretlist;
