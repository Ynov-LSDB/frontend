import React from "react";

// Components imports
import Card from "../../../atoms/ProfileCard/ProfileCard";
import Text from '../../../atoms/ProfileText/Text';

// Internal imports
import styles from './LeftProfileCard.module.css';

const LeftProfileCard = ({ user }) => (
    <div className={styles.container}>
        <Card style={{ width: '100%', height: `calc(45% + 45% + 20px)` }}>
            <div className={styles.image} style={{backgroundImage: `url(${user.imageURL || 'https://www.w3schools.com/howto/img_avatar.png'})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
            <div className={styles.textContainer}>
                <Text content={user.firstName} />
                <Text content={user.lastName} />
                <Text content={user.birthDate} />
            </div>
        </Card>
    </div>
);

export default LeftProfileCard;

