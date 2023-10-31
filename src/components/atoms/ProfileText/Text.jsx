import React from "react";

import styles from './Text.module.css';

const Text = ({ content }) => (
    <div className={styles.text}>
        {content}
    </div>
);

export default Text;