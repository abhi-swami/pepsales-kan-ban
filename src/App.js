import React from "react";
import SwimLaneUI from "./components/SwimLaneUI";

const config = {
  lanes: [
    {
      id: "todo",
      name: "To Do",
      allowedTransitions: ['inProgress'],
      bgColor: "bg-yellow-300",
    },
    {
      id: "inProgress",
      name: "In Progress",
      allowedTransitions: ['review', 'todo'],
      bgColor: "bg-blue-300",
    },
    {
      id: "review",
      name: "Review",
      allowedTransitions: ['done', 'inProgress'],
      bgColor: "bg-orange-300",
    },
    {
      id: "done",
      name: "Done",
      allowedTransitions: ["review"],
      bgColor: "bg-green-300",
    },
  ],
};

const App = () => {
  return (
    <div className="App p-4">
      <h1 className="text-3xl font-medium text-center my-2">Pepsales Kan-Ban</h1>
      <SwimLaneUI config={config} />
    </div>
  );
};

export default App;
