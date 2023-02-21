import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button'
import { userFriendsState, moviesMatchesState, currentUserState, movieSliceState} from '../Atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: "10px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function MovieCard() {
  const classes = useStyles();
  const [movieMatches, setMovieMatches] = useRecoilState(moviesMatchesState)
  const [movieSlice, setMovieSlice] = useRecoilState(movieSliceState)
  const userFriends = useRecoilValue(userFriendsState)
  const currentUser = useRecoilValue(currentUserState)

  
  const compare = async () => {
      const movieMap = []
      if (!userFriends.loading) {
        await userFriends.map(friend => {
          for ( let i = 0; i < friend.movies.length; i += 1 ) {
              if (movieMap.map(x => x._id).indexOf(friend.movies[i]._id) > -1) {
                  movieMap.find(x => x._id === friend.movies[i]._id).friends.push(friend)
              } else {
                  movieMap.push({...friend.movies[i], friends: [friend]})
              }
          }
        })
        setMovieMatches({movieMap: movieMap, loading: false })
      }
  }

  const handleSliceIncrement = () => {
    if(currentUser.movies.length - movieSlice[1] >= 0){
      setMovieSlice((prev)=>[prev[0]+10,prev[1]+10])
    }
  }

  const handleSliceDecrement = () => {
    if(movieSlice[0] >= 10) {
      setMovieSlice((prev)=>[prev[0]-10,prev[1]-10])
    }
  }

  useEffect(() => {
    compare()
  }, [userFriends])

  useEffect(() => {
    console.log("movieMATCHES", movieMatches)
  }, [movieMatches])

  useEffect(() => {
    console.log("CURRENTUSER", currentUser)
  }, [currentUser])

  const movieList = () => {
    return(
    <div style={{display: "flex", flexDirection: "column", maxWidth: "600px", minWidth: "307px", width: "100vw"}}>
    {currentUser.movies.length > 0 ? 
        currentUser.movies.slice(movieSlice[0],movieSlice[1]).map(movie => (

            <Accordion style={{backgroundColor: "#7B7C7C", color: "#EDEDEB"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: "#EDEDEB"}} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
                <Badge badgeContent={!movieMatches.loading ? movieMatches.movieMap.find(x => x._id === movie._id).friends.length : ""} color="primary" overlap="circle">
                    <Avatar style={{paddingRight: "10px"}} variant="rounded" src={movie.image} />
                </Badge>
                <div style={{alignSelf: "center", paddingLeft: "15px"}} className={classes.heading}>{movie.title}</div>
            </AccordionSummary>

            <AccordionDetails>

            <List style={{width: "100%"}} component="div" aria-label="main mailbox folders">
                <ListItem button>
                    <AvatarGroup max={4}>
                        {!movieMatches.loading ? movieMatches.movieMap.find(x => x._id === movie._id).friends.map(friend => (
                            <Avatar alt="user icon" src={friend.usericon} />
                            ))
                         : ""
                        }
                    </AvatarGroup>
                    <ListItemText style={{width: "100%", paddingLeft: "15px"}} primary="Want to watch!" />
                </ListItem>
                <ListItem>
                    <Button variant="contained">Start group chat?</Button>
                </ListItem>
            </List>

            </AccordionDetails>
            </Accordion>
        ))

    : <Link to="/startswiping" style={{}}>
      <Button style={{backgroundColor: "#7B7C7C", color: "#EDEDEB", display: "initial", width: "100%"}}>
        <span style={{display: "block"}}>No movies yet!</span>
        <span style={{display: "block", fontSize: "10px"}}>Click to get started.</span>
      </Button>
      </Link>
    } 
    {currentUser.movies.length > 0 && 
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: "10px"}}>
        <button onClick={handleSliceDecrement}>{`<<`}</button>
        <button onClick={handleSliceIncrement}>{`>>`}</button>
      </div>
    }
    </div>
    )
  }


  return (
    <div className={classes.root}>
      
      
      {!currentUser.loading ? <div className={classes.root}>{movieList()}</div> : <div style={{textAlign: "center"}}>Loading...</div> }    
      

    </div>
  );
}
