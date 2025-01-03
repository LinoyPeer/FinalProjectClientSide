import React, { useEffect, useState } from 'react';
import { Avatar, List, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useUsers from '../users/hooks/useUsers';
import { WechatWorkOutlined } from '@ant-design/icons';
import ROUTES from '../routes/routes';
import { useMediaQuery } from 'react-responsive';

export default function ChatsViewPage() {
    const { allUsers, getAllUsers } = useUsers();
    const [nameOfUsers, setNameOfUsers] = useState([]);
    const navigate = useNavigate();

    const isDesktop = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        getAllUsers();
    }, []);
    console.log(allUsers);
    useEffect(() => {
        const nameOfEachUser = allUsers.map(user => {
            const fullName = `${user.name?.first || 'Unknown'} ${user.name?.middle || ''} ${user.name?.last || ''}`.trim();
            const initials = `${user.name?.first?.[0] || 'U'}${user.name?.last?.[0] || 'U'}`.toUpperCase();
            const avatar = user?.image?.path || null
            console.log(initials);

            return {
                fullName,
                avatar,
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
        <div style={{
            padding: isDesktop ? '10px 50px' : '10px',
            margin: '0 auto',
            maxWidth: '1200px'
        }}>
            <h2>Messages</h2>
            <List
                itemLayout="horizontal"
                dataSource={nameOfUsers}
                renderItem={(user, index) => (
                    <List.Item key={index} actions={[<Button type="primary" onClick={() => startPrivateChat(user)}>{<WechatWorkOutlined />}</Button>]}>
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
