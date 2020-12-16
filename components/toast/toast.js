import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalContext from "../../contexts/globalContext";
import { add, remove } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Toast = () => {
  const { notification, setNotificationValue } = useContext(GlobalContext);

    useEffect(() => {
      const interval = setInterval(() => {
          if (notification.length) {
              setNotificationValue(remove(notification, 0))
          }
      }, 4000);
      return () => {
          clearInterval(interval);
      }
  });
  const getBg = (type) => {
    switch (type.toLowerCase()) {
      case "success":
        return "#36a666";
        break;
      case "error":
        return "#ff6b6b";
        break;
      case "info":
        return "#2e86de";
        break;
      case "warning":
        return "#ff9f43";
        break;
      default:
        return "#222f3e";
    }
  };

  return (
    <div className="hc_toast">
      <ul style={{ zIndex: 999999 }}>
        <AnimatePresence>
          {notification.map((value, id) => (
            <motion.li
              key={value.id}
              className="panel"
              style={{
                backgroundColor: `${getBg(value.type)}`,
                color: "#fff",
              }}
              positionTransition
              initial={{ opacity: 0, y: 100, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: value.message }}
                className="toast-message"
              />
              <button
                onClick={() => setNotificationValue(remove(notification, id))}
                className="close delete"
              ></button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
export default Toast;
