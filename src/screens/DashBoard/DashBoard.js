import React from "react";
import { img } from "../../CommonComponents/Images";
import "./DashBoard.css"

const DashBoard = () => {
  return (
    <div className="">
      <h2 className="text-center mt-4">DashBoard</h2>
      <div className="d-flex dash-board align-items-center justify-content-center mt-5">
        <div className="p-0 dash-image">
          <img src={img.dash} alt="Dashboard Image" height={"400px"} width={"450px"} />
        </div>
        <div className="p-0 mx-3 dash-body d-flex align-items-center justify-content-center flex-column">
          <h2 className=" text-primary text-center ">
            Welcome to Your Task Manager!
          </h2>
          <h5 className="mt-3 text-center">
            Manage, prioritize, and track your progress.
          </h5>
          <h5 className="text-center">
            Enhance productivity with our user-friendly tools.
          </h5>
          <h5 className="text-center">
            Stay organized and on top of your tasks.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
