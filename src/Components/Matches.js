import React, { useEffect } from 'react'
import FriendCard from './FriendCard'
import GroupCard from './GroupCard'
import MovieCard from './MovieCard'
import ButtonNav from './ButtonNav'
import { useRecoilValue } from 'recoil'
import { matchesViewState } from '../Atoms'
import { motion, AnimatePresence } from 'framer-motion'

const Matches = (props) => {
    const buttonCategories = ["Movies", "Friends", "Groups"] 

    const viewInfo = useRecoilValue(matchesViewState)

    useEffect(() => {console.log(viewInfo)}, [viewInfo])

    const motionWrap = (inputTag, inputDegree) => {
        return (
            <AnimatePresence exitBeforeEnter>
            <motion.div
            initial={{ rotate: Number(inputDegree), scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            >
             {inputTag}

            </motion.div>
            </AnimatePresence>
        )
    }


    return (
        <div style={{height: "90vh", marginTop: "30px"}}>
            
            <ButtonNav buttonCategories={buttonCategories} />

            {viewInfo.currentView === "Movies" ? motionWrap(<MovieCard/>, 20) : ""}
            {viewInfo.currentView === "Friends" ? motionWrap(<FriendCard/>, -30) : ""}
            {viewInfo.currentView === "Groups" ? motionWrap(<GroupCard/>, 20) : ""}

        </div>
    )
}

export default Matches