import React from "react";
import missingCartSvg from "../../../../assets/img/cart/missing-cart.svg";
import LoginButton from "../../../comp_util/button/LoginButton";
import { useNavigate } from "react-router";
import { cn } from "../../../../utils/fn_utils";

interface MissingCartProps {
  isLoggedIn: boolean | null;
}
const MissingCart: React.FC<MissingCartProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="h-[80vh] justify-center flex flex-col items-center text-center">
      <div className="mb-3">
        <img src={missingCartSvg} alt="missing cart" className="" />
      </div>
      <section className="mb-7 [&>h1]:mb-2 [&>p]:text-gray-500 [&>h1]:font-semibold [&>h1]:text-xl">
        <h1>{isLoggedIn ? "Your cart is empty" : "Missing Cart items?"}</h1>
        <p>
          {isLoggedIn
            ? "Add items to it now"
            : "Login to see the items you added previously."}
        </p>
      </section>
      <LoginButton
        onClick={() => navigate("/")}
        name={isLoggedIn ? "Shop Now" : "Login"}
        className={cn(
          "bg-[var(--text-orange)] max-w-full w-fit  text-white font-serif font-normal mt-2",
          {
            "bg-[var(--text-orange)]": !isLoggedIn,
            "bg-[var(--site-color)]": isLoggedIn,
          }
        )}
      />
    </div>
  );
};

export default MissingCart;
