// import React, { useEffect, useState } from 'react';
// import { Avatar, List, Button } from 'antd';
// import useUsers from '../users/hooks/useUsers';
// import { WechatWorkOutlined } from '@ant-design/icons';

// export default function ChatsViewPage() {
//     const { allUsers, getAllUsers } = useUsers();
//     const [nameOfUsers, setNameOfUsers] = useState([]);

//     useEffect(() => {
//         getAllUsers();
//     }, []);

//     useEffect(() => {
//         const nameOfEachUser = allUsers.map(nameOfUser => {
//             const fullName = `${nameOfUser.name.first} ${nameOfUser.name.middle || ''} ${nameOfUser.name.last || ''}`.trim();
//             return {
//                 fullName,
//                 avatar: nameOfUser.image?.url || null,
//                 initials: `${nameOfUser.name.first[0]}${nameOfUser.name.last[0]}`.toUpperCase()
//             };
//         });
//         setNameOfUsers(nameOfEachUser);
//     }, [allUsers]);

//     const startPrivateChat = (user) => {
//         console.log(`Started private chat with ${user.fullName}`);
//     };

//     return (
//         <div
//             style={{ padding: '10px' }}
//         >
//             <h2>Messages</h2>
//             <List
//                 itemLayout="horizontal"
//                 dataSource={nameOfUsers}
//                 renderItem={(user, index) => (
//                     <List.Item key={index} actions={[
//                         <Button type="primary" onClick={() => startPrivateChat(user)}>{<WechatWorkOutlined />}</Button>
//                     ]}>
//                         <List.Item.Meta
//                             avatar={
//                                 user.avatar ? (
//                                     <Avatar>{user.initials}</Avatar>
//                                 ) : (
//                                     <Avatar src={user.avatar} />
//                                 )
//                             }
//                             title={user.fullName}
//                         />
//                     </List.Item>
//                 )}
//             />
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { Avatar, List, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useUsers from '../users/hooks/useUsers';
import { WechatWorkOutlined } from '@ant-design/icons';
import ROUTES from '../routes/routes';

export default function ChatsViewPage() {
    const { allUsers, getAllUsers } = useUsers();
    const [nameOfUsers, setNameOfUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        const nameOfEachUser = allUsers.map(user => {
            const fullName = `${user.name.first} ${user.name.middle || ''} ${user.name.last || ''}`.trim();
            return {
                fullName,
                avatar: user.image?.url || null,
                initials: `${user.name.first[0]}${user.name.last[0]}`.toUpperCase(),
                userId: user._id,
            };
        });
        setNameOfUsers(nameOfEachUser);
    }, [allUsers]);

    const startPrivateChat = (user) => {
        const roomId = `${user.userId}`;
        navigate(`${ROUTES.START_CHAT.replace(':roomId', roomId)}`, { state: { user } });
    };



    return (
        <div style={{ padding: '10px' }}>
            <h2>Messages</h2>
            <List
                itemLayout="horizontal"
                dataSource={nameOfUsers}
                renderItem={(user, index) => (
                    <List.Item key={index} actions={[
                        <Button type="primary" onClick={() => startPrivateChat(user)}>
                            {<WechatWorkOutlined />}
                        </Button>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                user.avatar ? (
                                    <Avatar src={user.avatar} />
                                ) : (
                                    <Avatar>{user.initials}</Avatar>
                                )
                            }
                            title={user.fullName}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

