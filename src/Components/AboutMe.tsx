import React, { useEffect, useState } from "react";
import { ReactComponent as AboutMeImage } from '../Assets/AboutMe.svg';
import styles from '../css/AboutMe.module.css';

function AboutMe() {
    const [age, setAge] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          const currentDate = new Date();
          const birthDate = new Date('2003-03-03');
          const diff = currentDate.getTime() - birthDate.getTime();
          const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
          setAge(ageInYears);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    return(
        <div className={styles.mainContainer}>
            <div className={styles.mainContent}>
                <div className={styles.TextArea}>
                    <div className={styles.leftContainer}>
                        <p className={styles.MainText}>About Me</p>
                    </div>

                    <div className={styles.rightContainer}>
                        <p>
                            My name is <span className={styles.SpecialText}>Alex</span> and I'm a {age} year-old, self-taught Software Engineer
                        </p>
                        <p>My programming stack is very versatile, I have experience in the following languages:</p>
                        <p className={styles.ListText}>- C#</p>
                        <p className={styles.ListText}>- JavaScript</p>
                        
                    </div>
                </div>
                <div className={styles.Image}>
                    <AboutMeImage width={"100%"}/>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;