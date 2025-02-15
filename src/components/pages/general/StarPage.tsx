import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import om from "../../../assets/img/om.png";
const BhaktiErrorPage: React.FC = () => {
  const [quote, setQuote] = useState(
    "जय श्री राम! संकट से घबराइए मत, मार्ग सुलभ है।"
  );

  useEffect(() => {
    const quotes = [
      "ॐ नमः शिवाय! जो होता है, वह शिव की इच्छा से होता है।",
      "हरे कृष्ण! जीवन एक लीला है, हर स्थिति को प्रेम से स्वीकार करें।",
      "जय श्री राम! संकट से घबराइए मत, मार्ग सुलभ है।",
      "श्री राधे! प्रेम और भक्ति से हर समस्या हल हो सकती है।",
    ];

    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-200 to-orange-400 text-center text-gray-900">
      <motion.img
        src={om}
        alt="Om Symbol"
        className="w-28 h-28 mb-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />
      <h1 className="text-4xl font-bold mb-2">
        अरे! यह मार्ग बाधित हो गया है।
      </h1>
      <p className="text-lg italic">{quote}</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-lg font-semibold bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all"
      >
        मुख्य पृष्ठ पर लौटें
      </Link>
    </div>
  );
};

export default BhaktiErrorPage;
