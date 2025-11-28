"use client";

import { useEffect } from "react";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex justify-between items-center p-4">
      <div className="side-block max-w-[15rem] min-h-content left">
        <div className="task-filter flex flex-col justify-between min-h-[12rem]">
          <button className="btn btn-md">Progress</button>
          <button className="btn btn-md">Done</button>
          <button className="btn btn-md h-10">TODO</button>
        </div>
      </div>
      <div className="tasks-container w-[35rem] border border-black rounded-lg p-4 min-h-[15rem] overflow-y-auto max-h-[18rem]">
        <div className="task border rounded-lg border-black p-2 cursor-pointer m-4">
          <h2 className="text-black text-md text-center">
            Create new economical model
          </h2>
          <div className="flex w-full justify-between">
            <p className="text-sm text-black">
              created at:<span className="ml-2">14.07.2025</span>
            </p>
            <p>
              Status<span className="ml-2 lowercase">PROGRESS</span>
            </p>
          </div>
        </div>
      </div>
      <div className="task-description p-5 border rounded-lg min-h-[15rem]">
        <div className="task-description-container w-full h-full">
          <h2>Task Title!!!!!!</h2>
          <p>task description very deeeplyyyyy</p>
        </div>
      </div>
    </main>
  );
}
