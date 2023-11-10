import axios from "axios";
export const _Api = function (querystring, Url = "") {
  return new Promise(async (resolve, reject) => {
    var data = querystring;
    var config = {
      method: "POST",
      url: Url,
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache", // Clear cache
      },
      data: data,
    };
    await axios(config)
      .then(function (response) {
        // if (response?.data?.code === 200) {
        resolve(response.data);
        //} else {
        // resolve();
        // }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const NormalCall = function (querystring = "", Url = "") {
  return new Promise(async (resolve, reject) => {
    var data = { querystring };
    var config = {
      method: "POST",
      url: Url,
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include this line to enable credentials
      data: data, // Use 'data' instead of 'body' for POST request data
    };
    await axios(config).then(function (response) {
      resolve(response.data);
    });
  });
};
