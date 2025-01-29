import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Input, Button, List, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';
import useUsers from '../users/hooks/useUsers';

export default function StartChat() {
    const { roomId } = useParams();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { userDetails } = useAuth();
    const [allTheUsers, setAllTheUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const { getAllUsers, allUsers } = useUsers();

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        setAllTheUsers(allUsers || []);
    }, [allUsers]);

    const theNameOfEachUser = allTheUsers.map(
        (user) => `${user.name.first} ${user.name.middle || ''} ${user.name.last || ''}`
    );
    const theIdOfEachUser = allTheUsers.map((user) => user._id);

    const getUserNameById = (id) => {
        if (allTheUsers && id) {
            const index = theIdOfEachUser.indexOf(id);
            return index !== -1 ? theNameOfEachUser[index] : 'Unknown User';
        }
        return 'Unknown User';
    };

    useEffect(() => {
        socketRef.current = io('https://finalprojectserverside-ufwg.onrender.com/chat', {
            query: { roomId },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        socketRef.current.emit('getMessages', roomId);

        socketRef.current.on('chatHistory', (history) => {
            setMessages(history);
        });

        socketRef.current.on('chatMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = useCallback(() => {
        if (message.trim()) {
            setIsSending(true);
            if (socketRef.current) {
                socketRef.current.emit('sendMessage', {
                    roomId,
                    content: message,
                    timestamp: new Date().toISOString(),
                    sender: userDetails
                        ? {
                            first: userDetails.name.first,
                            last: userDetails.name.last,
                            image: userDetails?.image?.path,
                            _id: userDetails._id,
                        }

                        : {},
                });
                console.log(messages);
            }
            setMessage('');
            setIsSending(false);
        }
    }, [message, userDetails, roomId]);

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            <div
                style={{
                    flex: 1,
                    paddingBottom: '40px',
                }}
            >
                <List
                    dataSource={messages}
                    renderItem={(item, index) => {
                        const isCurrentUser =
                            userDetails && item.sender && item.sender._id === userDetails._id;

                        return (
                            <List.Item
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: isCurrentUser ? '#d1e7dd' : '#f8d7da',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        maxWidth: '80%',
                                        wordWrap: 'break-word',
                                        marginBottom: '10px',
                                        width: '100%',
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.sender && item.sender.image ? (item.sender.image.path || item.sender.image) : undefined} />
                                        }
                                        alt='User Picture'
                                        title={item.sender && item.sender._id ? getUserNameById(item.sender._id) : 'Unknown User'}
                                        description={item.content}
                                    />


                                    <div style={{ fontSize: '0.75rem', color: 'gray' }}>
                                        {new Date(item.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            </List.Item>
                        );
                    }}
                />
                <div ref={messagesEndRef} />
            </div>

            <div
                style={{
                    position: 'sticky',
                    bottom: '55px',
                    left: '20px',
                    right: '20px',
                    background: 'white',
                    padding: '10px',
                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                    placeholder="Type a message..."
                    suffix={
                        <Button
                            type="primary"
                            onClick={handleSendMessage}
                            disabled={isSending}
                            icon={<SendOutlined />}
                        />
                    }
                />
            </div>
        </div>
    );
}
