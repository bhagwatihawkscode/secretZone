import React from "react";
import { useState } from "react";
import "./Secret.css";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NormalCall, _Api } from "../../Api";
import ReactPaginate from "react-paginate";
import EditModal from "./EditModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteModal from "./DeleteModel";
import KeyIcon from "@mui/icons-material/Key";
import PassModal from "./PassGenModal";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from "@mui/icons-material/Lock";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import PassVerifyModal from "./PassVerifyModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NestedModal from "./parmanentUnclock";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ClockModal from "./ClockModal";
import ShareIcon from "@mui/icons-material/Share";
import ShareModal from "./ShareModal";
import SkeltonComp from "./Skelton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useMediaQuery } from "@mui/material";

const Table = ({ data, isFetchData, ShowOneEdit }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [iskeyOpen, setIskeyOpen] = useState(false);
  const [isVerifyModal, setisVerifyModal] = useState(false);
  const [verifykey, setverifykey] = useState();
  const [keyids, setkeyId] = useState();
  const [nestedId, setnestedId] = useState();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [ClockId, setClockId] = useState(null);
  const [DeleteItemId, setDeleteItemId] = useState(null);
  const [editPermission, setEditPermission] = useState(null);
  const [isNestedModal, setIsNestedModal] = useState(false);
  const [isShareModal, setIsShareModal] = useState(false);
  const [shareId, setShareId] = useState();
  const [isClockModal, setIsClockModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lockedRows, setLockedRows] = useState({});
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
        <h1 style={{ color: "#ceb04f", margin: "30px" }}>No Secrets Found</h1>
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

  const openModal = (key, permission) => {
    setIsModalOpen(true);
    setSelectedItemId(key);
    setEditPermission(permission);
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
        "http://127.0.0.1:4000/api/todo/checkPassGen"
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
  const onClickFav = async (itemId, fav) => {
    const data = new FormData();

    data.append("isFavorited", fav === "true" ? false : true);
    data.append("_id", itemId);

    const response = await _Api(
      data,
      "http://127.0.0.1:4000/api/todo/favUpdat"
    );
    const { success } = response;
    if (success) {
      fetchData();
    }
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

  const openShareModal = (key) => {
    setIsShareModal(true);
    setShareId(key);
  };

  const closeShareModal = () => {
    setIsShareModal(false);
  };
  const opeClockModal = (key) => {
    setIsClockModal(true);
    setClockId(key);
  };

  const closeClockModal = () => {
    setIsClockModal(false);
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
        <SkeltonComp />
      ) : (
        <table className="table" style={{ backgroundColor: "transparent" }}>
          <thead>
            <tr>
              <th>Secrets</th>
              <th>Title</th>
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
                <td>{formatDate(item.createdAt)}</td>

                <td>{formatDate(item.updatedAt)}</td>
                <td className="row-edit-btn-grp" style={{ margin: "5px" }}>
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
                  {ShowOneEdit === "true" ? (
                    // Render only the edit button when item.permission is available and not 0
                    <Tooltip title="Edit" placement="bottom">
                      <IconButton
                        onClick={() => openModal(item._id, item.permission)}
                        style={{
                          backgroundColor: "rgba(0,0,0,0.7)",
                          margin: "5px",
                        }}
                      >
                        <ModeEditIcon
                          style={{ color: "#EAEAEA", width: "20px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
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
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  margin: "5px",
                                }}
                              >
                                <ModeEditIcon
                                  style={{ color: "#EAEAEA", width: "20px" }}
                                />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete" placement="bottom">
                              <IconButton
                                onClick={() => openDelModal(item._id)}
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  margin: "5px",
                                }}
                              >
                                <DeleteIcon
                                  style={{ color: "#EAEAEA", width: "20px" }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Fav">
                              <IconButton
                                onClick={() => {
                                  onClickFav(item._id, item.isFavorited);
                                }}
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  margin: "5px",
                                }}
                              >
                                {item.isFavorited === "true" ? (
                                  <FavoriteIcon
                                    style={{ color: "red", width: "20px" }}
                                  />
                                ) : (
                                  <FavoriteBorderIcon
                                    style={{ color: "#EAEAEA", width: "20px" }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="PassWord" placement="bottom">
                              <IconButton
                                onClick={() => onCLickkey(item._id)}
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  margin: "5px",
                                }}
                              >
                                <KeyIcon
                                  style={{ color: "#EAEAEA", width: "20px" }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="set Reminder" placement="bottom">
                              <IconButton
                                style={{
                                  backgroundColor: "rgba(0,0,0,0.7)",
                                  margin: "5px",
                                }}
                                onClick={() => opeClockModal(item._id)}
                              >
                                <AccessTimeFilledIcon
                                  style={{ color: "#EAEAEA", width: "20px" }}
                                />
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
                              sx={{
                                position: "absolute",
                              }}
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
                                  item.isFavorited === "true" ? (
                                    <FavoriteIcon
                                      style={{ color: "red", width: "40px" }}
                                    />
                                  ) : (
                                    <FavoriteBorderIcon
                                      style={{
                                        color: "black",
                                        width: "40px",
                                      }}
                                    />
                                  )
                                }
                                tooltipTitle="Fav"
                                onClick={() => {
                                  onClickFav(item._id, item.isFavorited);
                                }}
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
                                  <AccessTimeFilledIcon
                                    style={{ color: "black", width: "40px" }}
                                  />
                                }
                                tooltipTitle="Reminder"
                                onClick={() => opeClockModal(item._id)}
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <EditModal
        open={isModalOpen}
        handleClose={closeModal}
        itemId={selectedItemId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
        permission={editPermission}
      />
      <DeleteModal
        open={isDeleteOpen}
        handleClose={closeDelModal}
        handleSuccess={handleSuccess}
        handleError={handleError}
        itemId={DeleteItemId}
        isFetch={fetchData}
      />
      <PassModal
        open={iskeyOpen}
        handleClose={closekeyModal}
        handleSuccess={handleSuccess}
        handleError={handleError}
        itemId={keyids}
        isFetch={fetchData}
      />
      <PassVerifyModal
        open={isVerifyModal}
        handleClose={closeVerifyModal}
        itemId={verifykey}
        handleSuccess={handleSuccess}
        unlockRowCallback={handleUnlockRow}
        handleError={handleError}
      />
      <NestedModal
        open={isNestedModal}
        handleClose={closeNestedModal}
        itemId={nestedId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
      />
      <ShareModal
        open={isShareModal}
        handleClose={closeShareModal}
        itemId={shareId}
        handleSuccess={handleSuccess}
        handleError={handleError}
        isFetch={fetchData}
      />
      <ClockModal
        open={isClockModal}
        handleClose={closeClockModal}
        handleSuccess={handleSuccess}
        handleError={handleError}
        clockid={ClockId}
        isFetch={fetchData}
      />
      <ToastContainer />
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
export default Table;
