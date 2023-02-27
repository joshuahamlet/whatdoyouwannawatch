import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { rightListState, leftListState, upListState, downListState } from '../Atoms'
import TinderCard from 'react-tinder-card'
import './SwipeCard.css'
// import {movieData} from '../movieData'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 400,
    minWidth: 225,
    outline: "none",
    color: "var(--black)",
    backgroundColor: "var(--gray)",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));

const SwipeCard = () => {

    const setRightList = useSetRecoilState(rightListState)
    const setLeftList = useSetRecoilState(leftListState)
    const setUpList = useSetRecoilState(upListState)
    const setDownList = useSetRecoilState(downListState)
    const [movieSample, setMovieSample] = useState([])
    const [open, setOpen] = useState(false)
    const [modalBody, setModalBody] = useState({})
    const [swipeCount, setSwipeCount] = useState(0)

    const loadMoreData = async () => {
      const response = await fetch("https://whatdoyouwannawatchbackend.fly.dev/movies", {method: "GET", credentials: "include"})
      const data = await response.json()
      setMovieSample(data)
    }


    useEffect(() => {
      const loadData = async() => {
        const response = await fetch("https://whatdoyouwannawatchbackend.fly.dev/movies/getbatch", {method: "GET", credentials: "include"})
        const data = await response.json()
        setMovieSample(data)
      }
      loadData()
    }, [])

    useEffect(() => {
      console.log("moviesample", movieSample)
    }, [movieSample])

    useEffect(() => {
      console.log("SWIPECOUNT", swipeCount)
    }, [swipeCount])

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const classes = useStyles();

    const body = (
      <div className={classes.paper}>
        <h2 style={{marginBottom: "5px", color: "var(--red2)"}} id="simple-modal-title">{modalBody.title}</h2>
        <span style={{fontStyle: "italic", color: "var(--gray2)"}}>{modalBody.type}</span>
        <p id="simple-modal-description">
          {modalBody.synopsis}
        </p>
      <span style={{display: "inline-block", fontWeight: 'bold', margin: "5px 10px 5px 0px"}}>Runtime:  </span><span>{modalBody.runtime === "" ? "N/A" : modalBody.runtime}</span>
      <br/>
      <span style={{display: "inline-block", fontWeight: 'bold', margin: "5px 10px 5px 0px"}}>Released:  </span><span>{modalBody.released === "" ? "N/A" : modalBody.released}</span>
      <br/>
      <span style={{display: "inline-block", fontWeight: 'bold', margin: "5px 10px 5px 0px"}}>Added to Netflix:  </span><span>{modalBody.unogsdate === "" ? "N/A" : modalBody.unogsdate}</span>
      <br/>
      </div>
    );


    const onSwipe = (direction, movieInfo) => {
        console.log('You swiped: ' + direction)

        switch(direction) {
          case 'right':

            setRightList(oldList => [...oldList, movieInfo.title])
            setSwipeCount(swipeCount => swipeCount + 1)

            return
          case 'left':

            fetch('/movies/liked', {
              method: "POST",
              body: JSON.stringify({movie: movieInfo._id}),
              headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err)) 

            setLeftList(oldList => [...oldList, movieInfo.title])
            setSwipeCount(swipeCount => swipeCount + 1)

            return
          case 'up':
            
            setUpList(oldList => [...oldList, movieInfo.title])
            setSwipeCount(swipeCount => swipeCount + 1)
            
            return
          case 'down':

            console.log(movieInfo)
            setDownList(oldList => [...oldList, movieInfo.title])
            setModalBody({...modalBody, ...movieInfo})
            handleOpen()
            
            return
          default:
            return 'foobar';
        }
      }
       
      const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }


    return (
      <div>
      {swipeCount < 10 ?
        <AnimatePresence exitBeforeEnter>
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

         <div className="swipe-card-container">

            {
              movieSample.map(
                (movie, index) => (
                
                  <TinderCard 
                  key={movie.title}
                  className={`swipe ${index === 0 ? "zzTop" : "zzBottom"}`}  
                  style={{zIndex: "1"}}
                  onSwipe={(dir) => onSwipe(dir, movie)} 
                  onCardLeftScreen={() => onCardLeftScreen(movie.title)} 
                  preventSwipe={["down"]}
                  swipeRequirementType='position'
                    >
                  
                    <div style={{backgroundImage: `url(${movie.largeimage})`}} className="card">
        
                    </div>
                
                  </TinderCard>
        
                )
              )
            }

            <Modal
            open={open}
            onClose={handleClose}
            >
              {body}
            </Modal>

          </div>

          </motion.div>
        </AnimatePresence>

      : <div style={{
        height: "90vh", 
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
        }}>
          
          <Link to="/startswiping" style={{width: "100%", maxWidth: "200px"}}>
          <Button onClick={loadMoreData} style={{backgroundColor: "var(--red2)", color: "#EDEDEB", display: "initial", width: "100%", maxWidth: "200px"}}>
           Load more movies
          </Button>
          </Link>

          <Link to="/matches" style={{width: "100%", maxWidth: "200px"}}>
          <Button style={{backgroundColor: "var(--gray2)", color: "#EDEDEB", display: "initial", width: "100%", marginTop: "15px"}}>
           View Matches
          </Button>
          </Link>
        
        </div> 
      }
    </div>
    )
}

export default SwipeCard
