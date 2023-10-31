import React from "react";

//Internal imports
import styles from './ProfileCard.module.css';


const ProfileCard = ({ style, children }) => (
    <div className={styles.card} style={style}>
        {children}
    </div>
);

export default ProfileCard;