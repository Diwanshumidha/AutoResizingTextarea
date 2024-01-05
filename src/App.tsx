import React, { useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";

const App = () => {
  const [Value, setValue] = useState("");
  return (
    <div>
      <AutoResizeTextarea style={{ maxHeight: "200px" }} autoResize={true} />
    </div>
  );
};

export default App;
