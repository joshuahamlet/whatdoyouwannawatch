import React from 'react'
import { motion } from 'framer-motion'

const Motion = (props) => {
    return (
        <motion.div
          initial={{ rotate: 20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
          }}
          >
              {props.children}
          </motion.div>
    )
}

export default Motion