import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Banner from "../../comp_util/banner/Banner";

// `--> banner images
import thirtyFirst from "../../../assets/img/banner/thirtyFirst.jpg";
import thirtyFirstTrip from "../../../assets/img/banner/thirtyFirstTrip.jpg";
import thirtyFirstMalaysia from "../../../assets/img/banner/thirtyFirstMalaysia.jpg";
import thirtyFirstFlight from "../../../assets/img/banner/thirtyFirstFlight.jpg";
import toysEveryone from "../../../assets/img/banner/toysEveryone.jpg";

// `--> product images
//     `--> electronics
import buds from "../../../assets/img/products/electronics/buds.jpg";
import saver from "../../../assets/img/products/electronics/shaver.jpg";
import monitor from "../../../assets/img/products/electronics/monitor.jpg";
import printer from "../../../assets/img/products/electronics/printer.jpg";
import ssd from "../../../assets/img/products/electronics/ssd.jpg";
import speaker from "../../../assets/img/products/electronics/speaker.jpg";
import projector from "../../../assets/img/products/electronics/projector.jpg";
//     `--> toys
import coffee from "../../../assets/img/products/toys/coffee.jpg";
import cycle from "../../../assets/img/products/toys/cycle.jpg";
import stationary from "../../../assets/img/products/toys/stationary.jpg";
import softToy from "../../../assets/img/products/toys/softToy.jpg";
import gym from "../../../assets/img/products/toys/gym.jpg";
import instrument from "../../../assets/img/products/toys/instrument.jpg";
import puzzle from "../../../assets/img/products/toys/puzzle.jpg";
import fictionBooks from "../../../assets/img/products/toys/fictionBooks.jpg";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const searching = (searchText: string) =>
    navigate(`/search?searchText=${searchText}`);
  // `--> banner images list
  const bannerImages = [
    { image: thirtyFirst },
    { image: thirtyFirstTrip },
    { image: thirtyFirstMalaysia },
    { image: thirtyFirstFlight },
    { image: toysEveryone },
  ];
  // `--> product images list
  const electronicList = [
    {
      image: buds,
      name: "Best Truewireless Headphones",
      price: "Grab Now",
      onClick: () => {
        searching("headphones wireless");
      },
    },
    {
      image: saver,
      name: "Best of Shaver",
      price: "1499",
      type: "from",
      onClick: () => {
        searching("shaver");
      },
    },
    {
      image: monitor,
      name: "monitor",
      price: "6599",
      type: "from",
      onClick: () => {
        searching("monitor");
      },
    },
    {
      image: printer,
      name: "printer",
      price: "10190",
      type: "from",
      onClick: () => {
        searching("printer");
      },
    },
    {
      image: ssd,
      name: "ssd",
      price: "1499",
      type: "from",
      onClick: () => {
        searching("ssd");
      },
    },
    {
      image: speaker,
      name: "speaker",
      price: "499",
      type: "from",
      onClick: () => {
        searching("speaker");
      },
    },
    {
      image: projector,
      name: "projector",
      price: "6990",
      type: "from",
      onClick: () => {
        searching("projector");
      },
    },
  ];
  const toyList = [
    {
      image: coffee,
      name: "Coffee",
      type: "%age",
      price: 70,
      onClick: () => {
        searching("coffee");
      },
    },
    {
      image: cycle,
      name: "Electric Cycle",
      type: "%age",
      price: 40,
      onClick: () => {
        searching("cycle");
      },
    },
    {
      image: softToy,
      name: "Soft Toys",
      type: "%age",
      price: 50,
      onClick: () => {
        searching("soft toys");
      },
    },
    {
      image: gym,
      name: "Gym",
      type: "%age",
      price: 70,
      onClick: () => {
        searching("gym");
      },
    },
    {
      image: stationary,
      name: "Stationary",
      type: "%age",
      price: 79,
      onClick: () => {
        searching("stationary");
      },
    },
    {
      image: instrument,
      name: "Instrument",
      type: "%age",
      price: 90,
      onClick: () => {
        searching("instrument");
      },
    },
    {
      image: puzzle,
      name: "Puzzle",
      type: "%age",
      price: 70,
      onClick: () => {
        searching("puzzle");
      },
    },
    {
      image: fictionBooks,
      name: "Fiction Books",
      type: "%age",
      price: 50,
      onClick: () => {
        searching("fiction books");
      },
    },
  ];

  const products = [
    { title: "Best of Electronics", product: electronicList },
    { title: "Beauty, Food, Toys & more", product: toyList },
  ];

  useEffect(() => {
    document.title = "Jholi Shopping";
    document.documentElement.style.overflowX = "hidden";
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="light"
      />
      <div className="max-w-[1920px] mx-auto px-5 mt-5">
        <Banner
          imageList={bannerImages}
          autoplay={true}
          isDots={true}
          infiniteScroll={true}
        />
        <div className="[&>div]:mt-5">
          {products.map((item) => (
            <Banner
              key={item?.title}
              title={item?.title}
              imageList={item?.product}
              className="slick-shadow py-4 [&>h1]:px-3"
              sliderClassName="px-3"
              sliderItemClassName=""
              isProducts={true}
              imageWidth={200}
              imageHeight={152}
              autoplay={false}
              noOfImageShow={item?.product.length}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
