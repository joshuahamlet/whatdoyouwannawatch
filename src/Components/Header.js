import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import MovieIcon from '@material-ui/icons/Movie';
import './Header.css'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { currentUserState, userFriendsState } from '../Atoms'
import { useRecoilState } from 'recoil';


const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      maxWidth: 400,
      minWidth: 225,
      width: 350,
      height: 400,
      outline: "none",
      color: "var(--black)",
      backgroundColor: "var(--gray)",
      borderRadius: "4px",
      boxSizing: "border-box",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      zIndex: 11,
      //transform: 'translate(-50%, -50%)',
      
    },
    backDrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10,
    }
}));





const Header = () => {
    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const [userFriends, setUserFriends] = useRecoilState(userFriendsState)

    const handleClose = () => {
        setOpen(!open);
      };

    const handleOpen = () => {
        setOpen(true);
      };

    const handleLogout = async() => {
        setCurrentUser({loading: true})
        //CHECK AFTER FIXING CURRENT USER API
        const res = await fetch("/api/logout", {mode: "cors", headers: {"Access-Control-Allow-Headers": "*"}}) 
        const dat = await res
        console.log('LOGOUT', dat)
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }

    const classes = useStyles();


    useEffect(() => {
        const loadData = async () => {
            try{
                const response = await fetch("/api/current_user", {mode: "cors", headers: {"Access-Control-Allow-Headers": "*"}})
                const data = await response.json()  
                if (data.currentUser) {
                  setCurrentUser({...data.currentUser, loading: false})
                  setUserFriends([...data.userFriends])  
                }  
            } catch (err) {
                console.error(err)
            }
        }
        loadData()
        setTimeout(() => {
          console.log(currentUser)
        }, 1000)
    }, [setCurrentUser, setUserFriends])
    

    return (

        <div className="header" style={{width: "100vw", boxSizing: "border-box"}} >
            <Link to="/">
              <MovieIcon style={{fontSize: "70px"}}/>
            </Link>

            {!currentUser.loading && <Link to="/startswiping">Swipe</Link>}
            {!currentUser.loading && <Link to="/matches">Matches</Link>}
        
        { currentUser.loading ? <div style={{cursor: "pointer"}} onClick={handleOpen}>Login</div>
        
          : <div style={{cursor: "pointer"}} onClick={handleLogout}>Logout</div>
        }
        
        {currentUser ? <div>{currentUser.username}</div> : " "}            
            
        { open ? 
            <>
            <div onClick={handleClose} className={classes.backDrop}/>
                <AnimatePresence exitBeforeEnter>
                <motion.div
                className={classes.modal}
                initial={{ x: '-50%', y: '90vh', rotate: 0, scale: 0 }}
                animate={{ x: '-50%', y: '-50%', rotate: [-5, 5, 0], scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 17
                }}
                >
                    <div>
                        <a href="/auth/google">Google</a>
                    </div>
                </motion.div>
                </AnimatePresence>
            </>
          : ""
        }

        {console.log("USERFRIENDS", userFriends)}
        {currentUser.loading ? <Redirect to="/"/> : <Redirect to="/matches"/> }
        </div>
    )
}

export default Header

//What do you wanna watch? ¯\_(ツ)_/¯