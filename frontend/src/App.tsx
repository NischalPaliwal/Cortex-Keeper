// import Button from "./components/Button"
import { useState } from "react";
import ESidebar from "./components/ExpandedSidebar";
import CSidebar from "./components/ContractedSidebar";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen w-full items-center justify-center bg-slate-100">
      {/* SideBar */}
      { isExpanded && <ESidebar onclick={() => setIsExpanded(false)} /> }
      { !isExpanded && <CSidebar /> }
    </div>
  )
}

export default App

// <Button bg={'bg-purple-700'} txt={'text-white'} content={"Share Brain"} />
// <Button bg={'bg-purple-200'} txt={'text-purple-800'} content={"Add Content"} />