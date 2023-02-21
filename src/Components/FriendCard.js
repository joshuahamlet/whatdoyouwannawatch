import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentUserState, userMatchesState } from '../Atoms'


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

export default function FriendCard() {
  const classes = useStyles();
  const [userMatches, setUserMatches] = useRecoilState(userMatchesState)
  const currentUser = useRecoilValue(currentUserState)

  const compare = (friendMovieList) => {
    const sharedMovies = []
    for ( let i = 0; i < friendMovieList.length; i += 1 ) {
        if (currentUser.movies.map(x => x._id).indexOf(friendMovieList[i]._id) > -1) {
            sharedMovies.push(friendMovieList[i])
        }
    }
    return sharedMovies
  }

  const compileMatchList = async () => {
    if(!currentUser.loading) {
        let userMatchedData = []
        await currentUser.friends.map(friend => {
            return userMatchedData.push({username: friend.username, matches: compare(friend.movies), selection: [0,4]})
        })

        setUserMatches({ matchList: [...userMatchedData], loading: false})
    }
  }

  const handleFriendSliceIncrement = (user, index) => {
    if(user.matches.length - userMatches.matchList[index].selection[1] >= 0) {

      let updatedUser = {...userMatches.matchList.find(x => x.username === user.username), selection: [user.selection[0]+5, user.selection[1]+5]}
      let newlist = userMatches.matchList.map((item, disIndex) => {
        if (disIndex===index) {
          return updatedUser
        } else { return item }
      })

      let newState = {...userMatches, matchList: newlist}      
      console.log("NNNNNNNNNNEEEW", newState)

      setUserMatches({...newState})
    }
  }

  const handleFriendSliceDecrement = (user, index) => {
    if(user.selection[0] >= 4) {
      let updatedUser = {...userMatches.matchList.find(x => x.username === user.username), selection: [user.selection[0]-5, user.selection[1]-5]}
      let newlist = userMatches.matchList.map((item, disIndex) => {
        if (disIndex===index) {
          return updatedUser
        } else { return item }
      })

      let newState = {...userMatches, matchList: newlist}      
      console.log("NNNNNNNNNNEEEW", newState)

      setUserMatches({...newState})
    }
  }

  useEffect(() => {
    compileMatchList()
    console.log('CURRENTUSER', currentUser)
  // eslint-disable-next-line
  }, [currentUser])

  useEffect(() => {
    console.log("USERMATCH", userMatches)
  }, [userMatches])

  const friendList = () => {
    return ( 
      
      <div style={{maxWidth: "600px", minWidth: "307px", width: "100vw"}}>

      {userMatches.loading ? <div style={{textAlign: "center"}}>Loading...</div> 
      
      : userMatches.matchList.map((user, index) => {

        return(
      
          <Accordion key={index} style={{backgroundColor: "#7B7C7C", color: "#EDEDEB"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{color: "#EDEDEB"}} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
              <Badge badgeContent={user.matches.length} color="primary" overlap="circle">
                <Avatar alt="user icon" src={"../public/logo192.png"}/>
              </Badge>
              <div style={{alignSelf: "center", paddingLeft: "15px"}} className={classes.heading}>{user.username}</div>
            </AccordionSummary>
          
            <AccordionDetails>

              <List style={{width: "100%"}} component="div">

                {user.matches.slice(userMatches.matchList[index].selection[0], userMatches.matchList[index].selection[1]).map(movie => (
                  <ListItem key={movie._id} button>
                    <Avatar style={{paddingRight: "10px"}} variant="rounded" src={movie.image} />
                    <ListItemText style={{width: "100%"}} primary={movie.title} />
                  </ListItem>
                ))}

                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: "10px"}}>
                  <button onClick={()=> handleFriendSliceDecrement(user, index)}>{`<<`}</button>
                  <button onClick={()=> handleFriendSliceIncrement(user, index)}>{`>>`}</button>
                </div>
                </List>
            </AccordionDetails>
                
          </Accordion>
        )})
      }
      </div> 
    )
  }

  return (
    <div className={classes.root}>
      
        {friendList()}

    </div>
  );
}