import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal';

import ChatIcon from '@material-ui/icons/Chat';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';

//SOCKETSOCKETSOCKETSOCKETSOCKETSOCKETSOCKETSOCKET//
import io from 'socket.io-client'
const socket = io('http://localhost:4000/')

socket.on("connect", () => {
    console.log('howdy')
})

socket.on('receive-message', message => console.log(message))

const msgSendHandler = () => {
    socket.emit('send-message', {message: "hello, there!"})
}
//SOCKETSOCKETSOCKETSOCKETSOCKETSOCKETSOCKETSOCKET//

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: "10px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const movieImg1 = "https://occ-0-1007-1360.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABQvxhAzGOxPkc4IPoIbBtMDdX8DTPT9-W3axlE73JpWP7lpKSSTDXzc7fhz7RueAi6iznVOnvPnq5Cd5qadPGpVI4g.jpg?r=be4"
const movieImg2 = "https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdbMvaGjGJGgDyEDNRmcRSpOufwOx8rqlVVLLmprMWzHjJgkh2y4az5HkQ74HjbdyJTiydXfoqbr4CjxLf8aindv9Q.jpg?r=dc3"



const test = () => {
    alert("Woah there!")
}

export default function GroupCard() {
  const [modalBody, setModalBody] = useState({})
  const classes = useStyles();

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div className={classes.root} style={{maxWidth: "600px", minWidth: "307px", width: "100vw"}}>
        <div style={{padding: "1rem", borderRadius: ".25rem", backgroundColor: "#7B7C7C", color: "#EDEDEB", marginBottom: "10px"}}>
          WIP area for chats and coordinating viewing parties.
        </div>
      <Card style={{backgroundColor: "#7B7C7C", color: "#EDEDEB", marginBottom: "10px"}}>  
        <List style={{width: "100%"}} component="div" aria-label="main mailbox folders">
            <ListItem >
                <Avatar onDoubleClick={test} style={{paddingRight: "5px"}} variant="rounded" src={movieImg1} />
                <div style={{alignSelf: "center", paddingLeft: "15px"}} className={classes.heading}>MovieName with:</div>
            </ListItem>    
            <ListItem button>
                <AvatarGroup max={7}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </AvatarGroup>
            </ListItem>
            <ListItem>
                <IconButton aria-label="chat">
                    <ChatIcon onClick={msgSendHandler} style={{color: "var(--gray)", fontSize: "30px"}} />
                </IconButton>
                <IconButton aria-label="location">
                    <LocationOnIcon onClick={'handleOpen'} style={{color: "var(--gray)", fontSize: "30px"}} />
                </IconButton>
                <IconButton aria-label="location">
                    <EventIcon style={{color: "var(--gray)", fontSize: "30px"}} />
                </IconButton>
            </ListItem>
        </List>

      </Card>


      <Card style={{backgroundColor: "#7B7C7C", color: "#EDEDEB"}}>  

        <List style={{width: "100%"}} component="div" aria-label="main mailbox folders">
            <ListItem >
                <Avatar onDoubleClick={test} style={{paddingRight: "5px"}} variant="rounded" src={movieImg2} />
                <div style={{alignSelf: "center", paddingLeft: "15px"}} className={classes.heading}>MovieName with:</div>
            </ListItem>    
            <ListItem button>
                <AvatarGroup max={7}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </AvatarGroup>
            </ListItem>
            <ListItem>
                <IconButton aria-label="chat">
                    <ChatIcon style={{color: "var(--gray)", fontSize: "30px"}} />
                </IconButton>
                <IconButton aria-label="location">
                    <LocationOnIcon style={{color: "var(--gray)", fontSize: "30px"}} />
                </IconButton>
                <IconButton aria-label="location">
                    <EventIcon style={{color: "var(--gray)", fontSize: "30px"}} />
                </IconButton>
            </ListItem>
        </List>
        
      </Card>
      {/*

      <Modal
        open={'handleOpen'}
        onClose={'handleClose'}
      >
        howdy
       </Modal>
*/}
    </div>
  );
}
