import React from 'react';
import { ReactComponent as IndexIcon } from '../Assets/IndexIcon.svg';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import AboutMe from './AboutMe';
import '../css/App.css';

function App() {

  const scrollAboutMeBehavior = () => {
    scroller.scrollTo("AboutMe", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  };

  return (
    <div className="App">
      <div className='app-container'>
        <div className="custom-shape-divider-bottom-1684189163">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
      </div>
      <div className='TextArea'>
        <div className='leftContainer'>
          <p className='MainText'>Hello</p>
          <p className='MainText'>I'm Alex</p>
          <p className='SecondaryText'>I'm a self-taught Full-Stack Software Engineer.</p>
          <button onClick={scrollAboutMeBehavior}>
              About Me
              <div className="arrow-wrapper">
                  <div className="arrow"></div>

              </div>
          </button>
        </div>
        <div className='rightContainer'>
          <IndexIcon width={"30rem"}/>
        </div>
      </div>
      <div id="AboutMe">
        <AboutMe />
      </div>
      </div>
    </div>
  );
}

export default App;
