import React from "react";
import Card from "../../../atoms/ProfileCard/ProfileCard";
import Text from '../../../atoms/ProfileText/Text';

const LeftProfileCard = ({ user }) => (
    <div className="w-1/3 p-4 flex flex-col items-center">
        <Card>
            <div
                className="w-full bg-no-repeat bg-cover bg-center rounded-t-lg h-56"
                style={{ backgroundImage: `url(${user.imageURL || 'https://www.w3schools.com/howto/img_avatar.png'})` }}
            ></div>
            <div className="p-4 text-center">
                <Text content={user.firstName} customStyles="text-lg font-semibold" />
                <Text content={user.lastName} customStyles="text-lg" />
                <Text content={user.birthDate} customStyles="text-sm text-gray-600" />
            </div>
        </Card>
    </div>
);

export default LeftProfileCard;
