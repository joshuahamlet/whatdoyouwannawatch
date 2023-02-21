import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil'
import { matchesViewState } from '../Atoms'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ButtonNav = ({buttonCategories}) => {
  const [matchesView, setmatchesView] = useRecoilState(matchesViewState)

  const classes = useStyles();

  const handleViewUpdate = (info) => setmatchesView({...matchesView, currentView: info})

  const buttonGroupContents =
    buttonCategories.map(bgContent => {
      return (
        <Button 
        key={bgContent} 
        onClick={() => handleViewUpdate(bgContent)}
        >

          {bgContent}
        
        </Button>
      )
    })
  

  return (
    <div className={classes.root}>
      <ButtonGroup 
      size="large" 
      color="primary" 
      aria-label="large outlined primary button group"
      variant="contained"
      >
      
        {buttonGroupContents}
      
      </ButtonGroup>
    </div>
  );
}

export default ButtonNav