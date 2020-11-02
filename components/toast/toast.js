import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalContext from "../../contexts/globalContext";
import { add, remove } from "./utils";

const Toast = () => {
  const { notification, setNotificationValue } = useContext(GlobalContext);
  const getBg = (type) => {
    switch (type.toLowerCase()) {
      case "success":
        return "#1dd1a1";
        break;
      case "error":
        return "#ff6b6b";
        break;
      case "info":
        return "#48dbfb";
        break;
      case "warning":
        return "#e67e22";
        break;
      default:
        return "#333";
    }
  };
  
  return (
    <div className="hc_toast">
      <ul style={{ zIndex: 999999 }}>
        <AnimatePresence initial={false}>
          {notification.map((value, id) => (
            <motion.li
              key={id}
              style={{ backgroundColor: getBg(value.type), color: "#fff" }}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <span className="toast-message">{value.message}</span>
              <button
                onClick={() => setNotificationValue(remove(notification, id))}
                className="close delete is-large"
              ></button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
export default Toast;
