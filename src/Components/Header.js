import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import MovieIcon from '@material-ui/icons/Movie'
import createSvgIcon from '@material-ui/icons/utils/createSvgIcon'
import './Header.css'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { currentUserState, userFriendsState } from '../Atoms'
import { useRecoilState } from 'recoil'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    maxWidth: 400,
    minWidth: 225,
    width: 350,
    height: 400,
    outline: 'none',
    color: 'var(--black)',
    backgroundColor: 'var(--gray)',
    borderRadius: '4px',
    boxSizing: 'border-box',
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
  },
}))

const GoogleIcon = createSvgIcon(
  <svg viewBox='0 0 128 128'>
    <path
      fill='#fff'
      d='M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z'
    ></path>
    <path
      fill='#e33629'
      d='M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z'
    ></path>
    <path
      fill='#f8bd00'
      d='M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z'
    ></path>
    <path
      fill='#587dbd'
      d='M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z'
    ></path>
    <path
      fill='#319f43'
      d='M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z'
    ></path>
  </svg>
)

const Header = () => {
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
  const [userFriends, setUserFriends] = useRecoilState(userFriendsState)

  const handleClose = () => {
    setOpen(!open)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleLogout = async () => {
    setCurrentUser({ loading: true })
    //CHECK AFTER FIXING CURRENT USER API
    const res = await fetch('/api/logout', {
      mode: 'cors',
      headers: { 'Access-Control-Allow-Headers': '*' },
    })
    const dat = await res
    console.log('LOGOUT', dat)
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
  }

  const classes = useStyles()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/current_user', {
          mode: 'cors',
          headers: { 'Access-Control-Allow-Headers': '*' },
        })
        const data = await response.json()
        if (data.currentUser) {
          setCurrentUser({ ...data.currentUser, loading: false })
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
    <div className='header' style={{ width: '100vw', boxSizing: 'border-box' }}>
      <Link to='/'>
        <MovieIcon style={{ fontSize: '70px' }} />
      </Link>

      {!currentUser.loading && <Link to='/startswiping'>Swipe</Link>}
      {!currentUser.loading && <Link to='/matches'>Matches</Link>}

      {currentUser.loading ? (
        <div style={{ cursor: 'pointer' }} onClick={handleOpen}>
          Login
        </div>
      ) : (
        <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
          Logout
        </div>
      )}

      {currentUser ? <div>{currentUser.username}</div> : ' '}

      {open ? (
        <>
          <div onClick={handleClose} className={classes.backDrop} />
          <AnimatePresence exitBeforeEnter>
            <motion.div
              className={classes.modal}
              initial={{ x: '-50%', y: '90vh', rotate: 0, scale: 0 }}
              animate={{ x: '-50%', y: '-50%', rotate: [-5, 5, 0], scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 17,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginBottom: '2rem' }}>Sign in with</div>
                <div style={{ display: 'flex', alignItems: 'center', border: "0.25rem solid var(--gray2)", borderColor: "var(--gray2)", padding: "0.5rem", borderRadius: "1rem", boxShadow: "inset -.25rem -.25rem .55rem #bdbdbd"}}>
                  <GoogleIcon
                    style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
                  />
                  <a href='/auth/google'>Google</a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        ''
      )}

      {console.log('USERFRIENDS', userFriends)}
      {currentUser.loading ? <Redirect to='/' /> : <Redirect to='/matches' />}
    </div>
  )
}

export default Header

//What do you wanna watch? ¯\_(ツ)_/¯
