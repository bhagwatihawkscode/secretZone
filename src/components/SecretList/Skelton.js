import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { IconButton } from "@mui/material";
import "./Secret.css";

const SkeltonComp = () => {
  return (
    <div className="table-container">
      <SkeletonTheme baseColor="rgba(0,0,0,0.4)" highlightColor="#ceb04f">
        <table className="table" style={{ backgroundColor: "transparent" }}>
          <thead>
            <tr>
              <th>Srecrets</th>
              <th>Title</th>
              <th>Create At</th>
              <th>Update At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr>
                <td>
                  <Skeleton height={30} borderRadius={10} />
                </td>
                <td>
                  <Skeleton height={30} borderRadius={10} />
                </td>
                <td>
                  <Skeleton height={30} borderRadius={10} />
                </td>

                <td>
                  <Skeleton height={30} borderRadius={10} />
                </td>
                <td className="row-edit-btn-grp" style={{ margin: "10px" }}>
                  <IconButton
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      width: "20px",
                      height: "20px",
                      margin: "10px",
                    }}
                  >
                    <Skeleton height={40} width={40} borderRadius={"50%"} />
                  </IconButton>

                  <IconButton
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Skeleton height={40} width={40} borderRadius={"50%"} />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Skeleton height={40} width={40} borderRadius={"50%"} />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Skeleton height={40} width={40} borderRadius={"50%"} />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Skeleton height={40} width={40} borderRadius={"50%"} />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor: "rgba(0,0,0,0.1)",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    <Skeleton height={40} width={40} borderRadius={"50%"} />
                  </IconButton>
                </td>
              </tr>
              //   <tr

              //   >
              //     <td><Skeleton height={30} borderRadius={10}/></td>
              //     <td><Skeleton height={30}  borderRadius={10}/></td>
              //     <td><Skeleton height={30}  borderRadius={10}/></td>

              //     <td><Skeleton height={30}  borderRadius={10}/></td>
              //     <td className="row-edit-btn-grp" style={{ margin: "10px" }}>

              //         <IconButton
              //           style={{backgroundColor:'rgba(0,0,0,0.1)' , width:'20px' , height:'20px' ,margin: "10px"} }
              //         >
              //         <Skeleton height={40} width={40} borderRadius={'50%'} />
              //         </IconButton>

              //         <IconButton
              //           style={{backgroundColor:'rgba(0,0,0,0.1)' , width:'20px' , height:'20px'} }
              //         >
              //         <Skeleton height={40} width={40} borderRadius={'50%'} />
              //         </IconButton>
              //         <IconButton
              //           style={{backgroundColor:'rgba(0,0,0,0.1)' , width:'20px' , height:'20px'} }
              //         >
              //         <Skeleton height={40} width={40} borderRadius={'50%'} />
              //         </IconButton>
              //         <IconButton
              //           style={{backgroundColor:'rgba(0,0,0,0.1)' , width:'20px' , height:'20px'} }
              //         >
              //         <Skeleton height={40} width={40} borderRadius={'50%'} />
              //         </IconButton>
              //         <IconButton
              //           style={{backgroundColor:'rgba(0,0,0,0.1)' , width:'20px' , height:'20px'} }
              //         >
              //         <Skeleton height={40} width={40} borderRadius={'50%'} />
              //         </IconButton>
              //         <IconButton
              //           style={{backgroundColor:'rgba(0,0,0,0.1)' , width:'20px' , height:'20px'} }
              //         >
              //         <Skeleton height={40} width={40} borderRadius={'50%'} />
              //         </IconButton>

              //     </td>
              //   </tr>
            ))}
          </tbody>
        </table>
      </SkeletonTheme>
    </div>
  );
};

export default SkeltonComp;
