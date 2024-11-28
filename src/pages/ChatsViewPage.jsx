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
            const fullName = `${user.name?.first || 'Unknown'} ${user.name?.middle || ''} ${user.name?.last || ''}`.trim();
            const initials = `${user.name?.first?.[0] || 'U'}${user.name?.last?.[0] || 'U'}`.toUpperCase();
            console.log(initials);

            return {
                fullName,
                avatar: user.image?.url || null,
                initials,
                userId: user._id,
            };
        });
        console.log(nameOfEachUser);
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
                                    <Avatar>{user.initials}</Avatar>
                                ) : (
                                    <Avatar>{user.image}</Avatar>
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



