import React from "react";
import { useState } from "react";
import "../SecretList/Secret.css";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { NormalCall } from "../../Api";
import ReactPaginate from "react-paginate";
import FileEditModal from "./FileEditModal";
import FilePassModal from "./FilePassGenrate";
import FileDeleteModal from "./FileDeleteModal";
import KeyIcon from "@mui/icons-material/Key";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from "@mui/icons-material/Lock";
import KeyOffIcon from "@mui/icons-material/KeyOff";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileNestedModal from "./passUnloack";
import FilePassVerifyModal from "./Filepassverify";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";
import FileShareModal from "./FileShareModal";
import SkeltonFileComp from "./SkeletonFile";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useMediaQuery } from "@mui/material";

const FileTable = ({ data, isFetchData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [iskeyOpen, setIskeyOpen] = useState(false);
  const [isVerifyModal, setisVerifyModal] = useState(false);
  const [verifykey, setverifykey] = useState();
  const [nestedId, setnestedId] = useState();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [DeleteItemId, setDeleteItemId] = useState(null);

  const [isNestedModal, setIsNestedModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lockedRows, setLockedRows] = useState({});
  const [keyids, setkeyId] = useState();
  const [isShareModal, setIsShareModal] = useState(false);
  const [shareId, setShareId] = useState();
  const [showMobileActions, setShowMobileActions] = useState({});

  const isMobile = useMediaQuery("(max-width: 600px)");
  const toggleMobileActions = (itemId) => {
    setShowMobileActions((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const closeMobileActions = (itemId) => {
    const updatedShowMobileActions = { ...showMobileActions };
    delete updatedShowMobileActions[itemId];
    setShowMobileActions(updatedShowMobileActions);
  };
  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <h1 style={{ color: "#ceb04f", margin: "30px" }}>No Secrects Found</h1>
      </div>
    );
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch data here

      await isFetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const rowsPerPage = 5;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * rowsPerPage;
  const slicedData = data.slice(offset, offset + rowsPerPage);

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };
  const handleUnlockRow = (itemId) => {
    setLockedRows((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const openModal = (key) => {
    setIsModalOpen(true);
    setSelectedItemId(key);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDelModal = (key) => {
    setIsDeleteOpen(true);
    setDeleteItemId(key);
  };

  const closeDelModal = () => {
    setIsDeleteOpen(false);
  };

  const closekeyModal = () => {
    setIskeyOpen(false);
  };

  const onCLickkey = async (keyid) => {
    try {
      // setIsLoading(true);

      const data = await NormalCall(
        keyid,
        `${process.env.REACT_APP_Base_Url}/privacyokornot`
      );

      if (data === true) {
        setIskeyOpen(true);
        setkeyId(keyid);
      } else {
        setIskeyOpen(false);
        setLockedRows((prevState) => ({
          ...prevState,
          [keyid]: !prevState[keyid],
        }));
      }
      // fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  // const onClickDownload = async (itemId) => {
  //   const data = new FormData();

  //   data.append("keyid", itemId);
  //   const response = await _Api(
  //     data,
  //     "http://127.0.0.1:4000/api/todo/downloadzip"
  //   );
  //   if (response) {
  //     const arrayBuffer = await response.arrayBuffer();
  //     const blob = new Blob([arrayBuffer], { type: "application/zip" });

  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "download.zip";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   }
  // };
  const onClickDownload = async (itemId, fileName) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_Base_Url}/downloadzip`,
        { keyid: itemId },
        {
          responseType: "blob",
        }
      );

      if (response.status !== 200) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      handleSuccess("Download Start");
      const blob = new Blob([response.data], { type: "application/zip" });
      const downloadLink = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadLink;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to extract filename from Content-Disposition header

  const openShareModal = (key) => {
    setIsShareModal(true);
    setShareId(key);
  };

  const closeShareModal = () => {
    setIsShareModal(false);
  };
  const openVerifyModal = (key) => {
    setisVerifyModal(true);
    setverifykey(key);
  };

  const closeVerifyModal = () => {
    setisVerifyModal(false);
  };

  const openNestedModal = (key) => {
    setIsNestedModal(true);
    setnestedId(key);
  };

  const closeNestedModal = () => {
    setIsNestedModal(false);
  };

  return (
    <div className="table-container">
      {isLoading ? (
        // <div
        //   style={{
        //     width: "100%",
        //     height: "100%",
        //     display: "flex",
        //     justifyContent: "center",
        //   }}
        // >
        //   <div className="loader"></div>
        // </div>
        <SkeltonFileComp />
      ) : (
        <table className="table" style={{ backgroundColor: "transparent" }}>
          <thead>
            <tr>
              <th>Secrets</th>
              <th>Title</th>
              <th>File Names</th>
              <th>Create At</th>
              <th>Update At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slicedData.map((item, index) => (
              <tr
                key={item._id}
                className={
                  lockedRows[item._id]
                    ? "hiderow"
                    : item.PrivcyOK === "true"
                    ? "hiderow-privacy"
                    : "hiderow"
                }
              >
                <td>{offset + index + 1}</td>
                <td>{item.Title}</td>
                <td>{item.FileName}</td>

                <td>{formatDate(item.createdAt)}</td>

                <td>{formatDate(item.updatedAt)}</td>
                <td className="row-edit-btn-grp" style={{ margin: "10px" }}>
                  <div className="row-middle-btn-grp">
                    <Tooltip title="Unlock" placement="bottom">
                      <IconButton
                        onClick={() => openVerifyModal(item._id)}
                        className="row-middle-btn-single"
                        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                      >
                        <LockIcon style={{ color: "#EAEAEA" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove Lock" placement="bottom">
                      <IconButton
                        className="row-middle-btn-single"
                        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                        onClick={() => openNestedModal(item._id)}
                      >
                        <KeyOffIcon style={{ color: "#EAEAEA" }} />
                      </IconButton>
                    </Tooltip>{" "}
                  </div>
                  <div
                    className={
                      showMobileActions[item._id]
                        ? "mobile-icons"
                        : "non-mobile-icons"
                    }
                    style={{ position: "relative" }}
                  >
                    {!isMobile ? (
                      <>
                        <Tooltip title="Edit" placement="bottom">
                          <IconButton
                            onClick={() => openModal(item._id)}
                            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                          >
                            <ModeEditIcon style={{ color: "#EAEAEA" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete" placement="bottom">
                          <IconButton
                            onClick={() => openDelModal(item._id)}
                            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                          >
                            <DeleteIcon style={{ color: "#EAEAEA" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="PassWord" placement="bottom">
                          <IconButton
                            onClick={() => onCLickkey(item._id)}
                            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                          >
                            <KeyIcon style={{ color: "#EAEAEA" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton
                            onClick={() => {
                              onClickDownload(item._id, item.FileName);
                            }}
                            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                          >
                            <DownloadIcon style={{ color: "#EAEAEA" }} />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          style={{
                            backgroundColor: "rgba(0,0,0,0.7)",
                            margin: "5px",
                          }}
                          onClick={() => openShareModal(item._id)}
                        >
                          <ShareIcon
                            style={{ color: "#EAEAEA", width: "20px" }}
                          />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <SpeedDial
                          ariaLabel="Custom SpeedDial"
                          icon={<SpeedDialIcon />}
                          onClose={() => closeMobileActions(item._id)}
                          onOpen={() => toggleMobileActions(item._id)}
                          open={showMobileActions[item._id]}
                          direction="down"
                          FabProps={{
                            style: { backgroundColor: "rgba(0,0,0,0.6)" },
                          }}
                        >
                          <SpeedDialAction
                            icon={
                              <ModeEditIcon
                                style={{ color: "black", width: "40px" }}
                              />
                            }
                            tooltipTitle="Edit"
                            onClick={() => openModal(item._id)}
                          />
                          <SpeedDialAction
                            icon={
                              <DeleteOutlineOutlinedIcon
                                style={{
                                  color: "black",
                                  width: "40px",
                                }}
                              />
                            }
                            tooltipTitle="Delete"
                            onClick={() => openDelModal(item._id)}
                          />

                          <SpeedDialAction
                            icon={
                              <KeyIcon
                                style={{ color: "black", width: "40px" }}
                              />
                            }
                            tooltipTitle="Lock"
                            onClick={() => onCLickkey(item._id)}
                          />

                          <SpeedDialAction
                            icon={
                              <ShareIcon
                                style={{ color: "black", width: "40px" }}
                              />
                            }
                            tooltipTitle="Share"
                            onClick={() => openShareModal(item._id)}
                          />
                        </SpeedDial>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <FileEditModal
        open={isModalOpen}
        handleClose={closeModal}
        itemId={selectedItemId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
      />
      <FileDeleteModal
        open={isDeleteOpen}
        handleClose={closeDelModal}
        itemId={DeleteItemId}
        isFetch={fetchData}
        handleSuccess={handleSuccess}
        handleError={handleError}
      />
      <FilePassModal
        open={iskeyOpen}
        handleClose={closekeyModal}
        isFetch={fetchData}
        itemId={keyids}
        handleSuccess={handleSuccess}
        handleError={handleError}
      />
      <FileShareModal
        open={isShareModal}
        handleClose={closeShareModal}
        itemId={shareId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
      />
      <FilePassVerifyModal
        open={isVerifyModal}
        handleClose={closeVerifyModal}
        itemId={verifykey}
        unlockRowCallback={handleUnlockRow}
        handleSuccess={handleSuccess}
        handleError={handleError}
      />
      <FileNestedModal
        open={isNestedModal}
        handleClose={closeNestedModal}
        itemId={nestedId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
      />
      <ToastContainer />z
      {data.length > rowsPerPage && (
        <div
          className="pagination1"
          style={{
            margin: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactPaginate
            pageCount={Math.ceil(data.length / rowsPerPage)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            previousLabel="<<"
            nextLabel=">>"
          />
        </div>
      )}
    </div>
  );
};
export default FileTable;
