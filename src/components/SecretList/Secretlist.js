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
import Select from "react-select";
import SkeltonComp from "./Skelton";
import { useNavigate } from "react-router-dom";

const Secretlist = () => {
  const { state, search } = useLocation();

  const secretId = search.replace(/^(\?)/, "");

  const [TableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClosedCount, setModalClosedCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("Select");
  const [Dates, setDate] = useState([]);
  const [OneEdit, ShowOneEdit] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(Dates[0].toString());
  const optionsdata = [
    { value: "Select", label: "Select" },
    { value: "Fav", label: "Favorite" },
    { value: "NonFav", label: "Non Favorite" },
  ];

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
      let apiURL = `${process.env.REACT_APP_Base_Url}/SearchFilter`;
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
        } else {
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
  const checkd = Dates.length === 2;
  useEffect(() => {
    setIsLoading(true);

    const fetchDataAndCheckEditModal = async () => {
      try {
        if (search) {
          const response = await NormalCall(
            "",
            `${process.env.REACT_APP_Base_Url}/sendrowdata/${secretId}`
          );
          const isAuthorized =
            response.secret.accessuser === "" ||
            localStorage.getItem("token") === response.secret.accessuser;

          if (isAuthorized) {
            setTableData([response.secret]);
            ShowOneEdit(response.showEdit);
          } else {
            handleError("You are not authorized for this action!");

            // Display the error message for 1 second
            setTimeout(() => {
              navigate("/Secretlist");
            }, 3000);
          }
        } else {
          ShowOneEdit(false);
          await fetchData();
        }

        setIsLoading(false);

        if (state?.rowId) {
          const check = await NormalCall(
            state?.rowId,
            `${process.env.REACT_APP_Base_Url}/openEditModal`
          );

          setIsEditModalOpen(check);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataAndCheckEditModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalClosedCount, checkd, isSearching, filterBy, state, search]);

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
    // setIsSearching((prevSearch) => !prevSearch);
    setIsSearching(true);
    // If searching is active, call fetchData
    if (isSearching) {
      fetchData();
    } else if (searchText === "") {
      setIsSearching(false);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    if (selectedFilter === "Fav") {
      setIsFavorited(true);
    } else if (selectedFilter === "NonFav") {
      setIsFavorited(false);
    } else {
      setIsFavorited(null);
    }

    setFilterBy(selectedFilter, fetchData);
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
            <div className="media-div">
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

            <div className="inner-serachdiv">
              {/* <select
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
              </select> */}
              <Select
                onChange={(selectedOption) =>
                  handleFilterChange(selectedOption.value)
                }
                options={optionsdata}
                defaultValue={{ label: filterBy, value: filterBy }}
                className="basic-single"
                classNamePrefix="basic-select"
              />
              <DatePicker
                value={Dates}
                onChange={(value) => setDate(value)}
                range
                numberOfMonths={2}
                className="dateset-con"
                placeholder="Select Date"
                plugins={[
                  <Toolbar
                    position="bottom"
                    names={{
                      today: "today Date",
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
            <SkeltonComp />
          ) : (
            <Table
              data={TableData}
              isFetchData={fetchData}
              ShowOneEdit={OneEdit}
            />
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
