import React from "react";
import Navbar from "./Navbar";
import Hanger from "./nav-hanger/Hanger";

interface ComboNavProps {
  isHanger?: boolean;
}
const ComboNav:React.FC<ComboNavProps> = ({ isHanger = true }) => {
  return (
    <div className="sticky top-0 z-50">
      <Navbar />
      {isHanger && <Hanger />}
    </div>
  );
};

export default ComboNav;
