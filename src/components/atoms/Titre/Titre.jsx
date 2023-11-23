import React from "react";
import styles from './Titre.module.css';

const Titre = ({ content }) => (
    <div className={styles.titre}>
        {content}
    </div>
);

export default Titre;
