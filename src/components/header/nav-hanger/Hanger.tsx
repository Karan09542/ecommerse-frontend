import React from "react";
import LeftRightButton from "../../comp_util/button/LeftRightButton";
import { cn } from "../../../utils/fn_utils.ts";

// `--> loggedIn hanger images
import surf from "../../../assets/img/hanger/surf.png";
import mobile from "../../../assets/img/hanger/mobile.png";
import dresses from "../../../assets/img/hanger/dresses.png";
import electronics from "../../../assets/img/hanger/electronics.png";
import furniture from "../../../assets/img/hanger/furniture.png";
import appliances from "../../../assets/img/hanger/appliances.png";
import flights from "../../../assets/img/hanger/flights.png";
import toys from "../../../assets/img/hanger/toys.png";
import twoWheelers from "../../../assets/img/hanger/two-wheelers.png";
import { useIsLoggedInStore } from "../../../../store/authStore.ts";
import ImageButton from "../../comp_util/button/ImageButton.tsx";

interface HangerProps {
  isLoggedInHanger?: boolean;
}
const Hanger: React.FC<HangerProps> = ({ isLoggedInHanger = true }) => {
  const hangerList = [
    {
      name: "Electronics",
    },
    {
      name: "TVs & Appliances",
    },
    {
      name: "Men",
    },
    {
      name: "Women",
    },
    {
      name: "Baby & Kids",
    },
    {
      name: "Home & Furniture",
    },
    {
      name: "Sports, Books & More",
    },
    {
      name: "Flights",
    },
    {
      name: "Offer Zone",
    },
  ];
  const loggedInHangerList = [
    {
      img: surf,
      name: "Kilos",
      isRight: false,
      onClick: () => {},
    },
    {
      img: mobile,
      name: "Mobiles",
      isRight: false,
      onClick: () => {},
    },
    {
      img: dresses,
      name: "Fashion",
      onClick: () => {},
    },
    {
      img: electronics,
      name: "Electronics",
      onClick: () => {},
    },
    {
      img: furniture,
      name: "Home & Furniture",
      onClick: () => {},
    },
    {
      img: appliances,
      name: "Appliances",
      isRight: false,
      onClick: () => {},
    },
    {
      img: flights,
      name: "Flight Bookings",
      isRight: false,
      onClick: () => {},
    },
    {
      img: toys,
      name: "Beauty, Toys & More",
      onClick: () => {},
    },
    {
      img: twoWheelers,
      name: "Two Wheelers",
      onClick: () => {},
    },
  ];
  const isLoggedIn = useIsLoggedInStore((state) => state.isLoggedIn);
  if (isLoggedIn === null) null;
  return (
    <div className={`shadow shadow-[#00000029] bg-white`}>
      <div
        className={cn(
          `flex ${
            isLoggedIn ? "gap-x-10 py-4 px-" : "gap-x-6 py-3"
          }  max-w-[1248px] justify-center mx-auto `
        )}
      >
        {!isLoggedIn || !isLoggedInHanger
          ? hangerList?.map((item) => (
              <LeftRightButton
                key={item?.name}
                {...item}
                className="group"
                nameClassName="text-black font-semibold hover:text-[var(--site-color)] text-sm text-dot"
                rightClassName="text-[#c3c3c3] w-4 group-hover:rotate-180 transition"
                isDottedText={true}
                minWidth={0}
              />
            ))
          : loggedInHangerList?.map((item) => (
              <ImageButton
                key={item?.name}
                {...item}
                className="group"
                nameClassName="text-black font-semibold hover:text-[var(--site-color)] text-sm "
                rightClassName="text-[#c3c3c3] group-hover:rotate-180 transition"
                isDottedText={true}
                minWidth={0}
              />
            ))}
      </div>
    </div>
  );
};
export default Hanger;
