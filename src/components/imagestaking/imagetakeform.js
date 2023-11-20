import React, { useState, useRef } from "react";
import "./imagetake.css"; // Make sure to replace 'YourComponent' with the appropriate file name

const YourComponent = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [PreviewImage, setPreviewImage] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const dropZoneRef = useRef(null);
  const fileInputRef = useRef(null);

  const imagesTypes = ["jpeg", "png", "svg", "gif"];

  const handleDragOver = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.add("drop-zoon--over");
  };

  const handleDragLeave = () => {
    dropZoneRef.current.classList.remove("drop-zoon--over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.remove("drop-zoon--over");
    const file = event.dataTransfer.files[0];
    uploadFile(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };
  const uploadFile = (file) => {
    const fileType = file.type;
    const fileSize = file.size;

    if (fileValidate(fileType, fileSize)) {
      setIsUploaded(true);
      setUploadPercentage(0);

      const fileReader = new FileReader();

      fileReader.onload = () => {
        setTimeout(() => {
          setUploadPercentage(100);
        }, 500);

        // Instead of setting isUploaded to true, set the data URL to previewImage
        setPreviewImage(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    }
  };
  const progressMove = () => {
    let counter = 0;
    setTimeout(() => {
      const counterIncrease = setInterval(() => {
        if (counter === 100) {
          clearInterval(counterIncrease);
        } else {
          counter += 10;
          setUploadPercentage(counter);
        }
      }, 100);
    }, 600);
  };

  const fileValidate = (fileType, fileSize) => {
    const isImage = imagesTypes.filter(
      (type) => fileType.indexOf(`image/${type}`) !== -1
    );

    if (isImage.length !== 0) {
      if (fileSize <= 2000000) {
        return true;
      } else {
        alert("Please make sure your file is 2 Megabytes or less.");
      }
    } else {
      alert("Please make sure to upload an image file type.");
    }

    return false;
  };

  return (
    <div
      id="uploadArea"
      className={`upload-area ${isUploaded ? "upload-area--open" : ""}`}
    >
      {/* Header */}
      <div className="upload-area__header">
        <h1 className="upload-area__title">Upload your file</h1>
        <p className="upload-area__paragraph">
          File should be an image
          <strong className="upload-area__tooltip">
            Like
            <span className="upload-area__tooltip-data">
              {imagesTypes.join(", ")}
            </span>
          </strong>
        </p>
      </div>
      {/* End Header */}
      {/* Drop Zone */}
      <div
        id="dropZone"
        ref={dropZoneRef}
        className={`upload-area__drop-zoon drop-zoon ${
          isUploaded ? "drop-zoon--Uploaded" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <span className="drop-zoon__icon">
          <i className="bx bxs-file-image"></i>
        </span>
        <p className="drop-zoon__paragraph">
          Drop your file here or Click to browse
        </p>
        <span id="loadingText" className="drop-zoon__loading-text">
          Please Wait
        </span>
        <img
          src={PreviewImage}
          alt="Preview Image"
          id="previewImage"
          className="drop-zoon__preview-image"
          style={{ display: isUploaded ? "block" : "none" }}
          draggable="false"
        />
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          className="drop-zoon__file-input"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </div>
      {/* End Drop Zone */}

      {/* File Details */}
      <div
        id="fileDetails"
        className={`upload-area__file-details file-details ${
          isUploaded ? "file-details--open" : ""
        }`}
      >
        <h3 className="file-details__title">Uploaded File</h3>

        <div
          id="uploadedFile"
          className={`uploaded-file ${isUploaded ? "uploaded-file--open" : ""}`}
        >
          <div className="uploaded-file__icon-container">
            <i className="bx bxs-file-blank uploaded-file__icon"></i>
            <span className="uploaded-file__icon-text">
              {isUploaded ? imagesTypes[0] : ""}
            </span>
          </div>

          <div
            id="uploadedFileInfo"
            className={`uploaded-file__info ${
              isUploaded ? "uploaded-file__info--active" : ""
            }`}
          >
            <span className="uploaded-file__name">Project 1</span>
            <span className="uploaded-file__counter">{uploadPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
