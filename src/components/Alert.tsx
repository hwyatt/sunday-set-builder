import React, { useEffect, useState } from "react";

interface AlertProps {
  type: "info" | "error";
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the alert after 5000 milliseconds (5 seconds)
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  const alertClass = type === "error" ? "bg-red-500" : "bg-blue-500";
  const textClass = type === "error" ? "text-white" : "text-white";

  return (
    <div
      className={`p-6 mb-4 rounded font-semibold text-gray-800 bg-red-200 border-2 border-red-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 ease-in-out`}
    >
      {message}
    </div>
  );
};

export default Alert;
