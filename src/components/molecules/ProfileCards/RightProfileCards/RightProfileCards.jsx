import React, { useState } from "react";

import Card from "../../../atoms/ProfileCard/ProfileCard";
import Text from "../../../atoms/ProfileText/Text";
import Titre from "../../../atoms/Titre/Titre";
import styles from './RightProfileCards.module.css';


const RightProfileCards = ({ heightRightCard }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = (e) => {
        if (e.target === e.currentTarget || e.target.className === styles.close) {
            setModalOpen(false);
        }
    };


    const user = {
        imageURL_favBoules: require("../../../../assets/images/favBoules.jpg"),
        nomFavBoules: 'Les bouliches du seigneur',
        imageURL_event: require("../../../../assets/images/firstEvent.jpg"),
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        classement: 'Top 10',
        doublette: 'Quentin Saillard',
        triplette: 'Hugo Poizat, Mattéo Dinville',
        boissonPreferee: 'Ricard'
    };

    return (
        <div className={styles.container}>
            <Card style={{ height: heightRightCard }}>
                <div className={styles.rightTopCardContainer}>
                    <div className={styles.textSection}>
                        <Text content={user.nomFavBoules} className={styles.description} />
                    </div>
                    <div className={styles.photoSection}>
                        <img src={user.imageURL_favBoules} alt="Description de la photo" className={styles.photo}/>
                    </div>
                </div>
            </Card>
            <div className={styles.margin}></div>
            <Card style={{ height: heightRightCard }}>
                <div className={styles.informationSection}>
                    <div className={styles.leftInfo}>
                        <div className={styles.row}>
                            <Titre content="Classement : " />
                            <Text content={user.classement} />
                        </div>

                        <div className={styles.row}>
                            <Titre content="Doublette : " />
                            <Text content={user.doublette} />
                        </div>

                        <div className={styles.row}>
                            <Titre content="Triplette : " />
                            <Text content={user.triplette} />
                        </div>

                        <div className={styles.row}>
                            <Titre content="Boisson préférée : " />
                            <Text content={user.boissonPreferee} />
                        </div>
                    </div>

                    <div className={styles.separator}></div>

                    <div className={styles.rightEvent}>
                        <Titre content="Mon prochain événement " />
                        <div onClick={openModal}>
                            <img src={user.imageURL_event} alt="Prochain événement" className={styles.eventImage}/>
                        </div>
                        {isModalOpen && (
                            <div className={styles.modal} onClick={(e) => closeModal(e)}>
                                <span className={styles.close}>&times;</span>
                                <img src={user.imageURL_event} alt="Prochain événement" className={styles.modalImage} />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default RightProfileCards;
