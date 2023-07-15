import { motion } from "framer-motion";
import Backdrop from "../backdrop/backdrop";
import React from "react";

interface Props {
    children?: React.ReactNode;
    handleClose: () => void;
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    }
}

const Modal = ({children = null, handleClose} : Props) => {
    return(
        <React.Fragment>
            <Backdrop onClick={handleClose}>
                <motion.div
                    className="modal"
                    variants={dropIn}
                    onClick={(e) => {e.stopPropagation()}}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    >
                        {children}
                    </motion.div>
            </Backdrop>
        </React.Fragment>
    )
}

export default Modal;