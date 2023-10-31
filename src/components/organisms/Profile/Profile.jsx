import React from "react";

import LeftProfileCard from "../../molecules/ProfileCards/LeftProfileCard/LeftProfileCard";
import RightProfileCards from "../../molecules/ProfileCards/RightProfileCards/RightProfileCards";

import PhotoProfile from '../../../assets/images/photoProfileTest.jpg';
//Internal imports
import styles from './Profile.module.css';

const Profile = () => {
    const headerHeightVh = 5; // valeur en vh
    const spaceBetweenRightCardsPx = 20; // valeur en px

    const availableHeight = `${100 - 2 - headerHeightVh}vh`;

// Pour le calcul de heightRightTopCard et heightRightBottomCard:
     // Convertir vh en %, dans ce cas 1vh = 1%
    const deductionFromHeaderAndSpace = (headerHeightVh / 2) + 10 + (0.5 * spaceBetweenRightCardsPx);
    const heightRightCard = `${(45 - deductionFromHeaderAndSpace) * 2}%`;

    const user = {
        imageURL: PhotoProfile,
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000'
    };

    return (
        <div className={styles.container} style={{ height: availableHeight }}>
            <LeftProfileCard user={user} />
            <RightProfileCards heightRightCard={heightRightCard} />
        </div>
    )
}

export default Profile;
