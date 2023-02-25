import React from 'react'
import Animation from './Animation'
import './Landing.css'

const Landing = () => {
  return (
    <div className='landingContainer' style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
      <div
        className="welcomeContainer"
        style={{
          borderRadius: '10px',
          position: 'relative',
          width: '400px',
          height: '400px',
          zIndex: 1,
          marginRight: "2rem",
        }}
      >
        <div style={{ height: '400px', width: '400px' }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
            <path
              fill='#830908'
              d='M134.4 44.6c12.7 10.1 27.3 15.3 35 25.6 7.7 10.3 8.6 25.7 4.8 39.3-3.8 13.6-12.2 25.3-21.7 35.5-9.6 10.2-20.4 19-32.1 20.6-11.7 1.7-24.4-3.6-38.5-6.6-14.2-2.9-30-3.3-39-11-9-7.8-11.3-22.8-15.7-38.9-4.4-16-10.8-33.1-5.9-45.5 4.9-12.4 21.2-20.2 36.2-29.2 15-9.1 28.7-19.5 41-17.2 12.3 2.3 23.2 17.3 35.9 27.4z'
            ></path>
          </svg>
        </div>

        <div
          style={{
            backgroundColor: '#EDEDEB',
            color: '#1A0D0D',
            borderRadius: '10px',
            height: '300px',
            width: '300px',
            padding: '15px',
            boxSizing: 'border-box',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate( -25%, -25% )',
            zIndex: 1,
            boxShadow: '15px 30px 0px 3px #7B7C7C',
          }}
        >
          <p style={{ fontSize: '2rem', margin: '0 0 .5rem 0' }}>Welcome!</p>
          <p style={{ fontSize: '1rem', margin: '0 0 .5rem 0' }}>
            This web app lets you swipe through movies tinder-style in order to
            find friends with similar preferences. <br />
            <br />
            Swipe Direction <br />
            <ul
              style={{
                listStyleType: 'circle',
                paddingLeft: '1.5rem',
                margin: '.5rem 0',
              }}
            >
              <li>left  - like</li>
              <li>right - dislike</li>
              <li>up    - skip</li>
              <li>down  - movie info</li>
            </ul>
            <br/>
            Then browse your matches!
          </p>
        </div>
      </div>

      <Animation />
    </div>
  )
}

export default Landing
