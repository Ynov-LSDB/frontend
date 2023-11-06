import React from "react";

import Card from "../../../atoms/ProfileCard/ProfileCard";
import Text from '../../../atoms/ProfileText/Text';

const LeftProfileCard = ({ user }) => (
    <div className="flex flex-col h-95 w-1/3">
        <Card>
            <div className="h-2/5 bg-cover bg-center" style={{ backgroundImage: `url(${user.imageURL || 'https://www.w3schools.com/howto/img_avatar.png'})` }}></div>
            <div className="h-3/5 p-4">
                <Text content={user.firstName} className="text-lg font-bold" />
                <Text content={user.lastName} className="text-lg" />
                <Text content={user.birthDate} className="text-sm" />
            </div>
        </Card>
    </div>
);

export default LeftProfileCard;
