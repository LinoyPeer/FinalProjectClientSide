import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Input, Button, List, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';

const SOCKET_IO_SERVER = 'http://localhost:8181/chat';

export default function StartChat() {
    const { roomId } = useParams();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { userDetails } = useAuth();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_IO_SERVER, { query: { roomId: roomId } });

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
                    sender: {
                        first: userDetails.name.first,
                        last: userDetails.name.last,
                        image: userDetails.image.url,
                        _id: userDetails._id,
                    }
                })
            };
            setMessage('');
            setIsSending(false);
        }
    }, [message, userDetails, roomId]);
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <List
                dataSource={messages}
                renderItem={(item, index) => {
                    const isCurrentUser = userDetails && (item.sender._id === userDetails._id);
                    return (
                        <List.Item key={index} style={{ display: 'flex', justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }}>
                            <div
                                style={{
                                    backgroundColor: isCurrentUser ? '#d1e7dd' : '#f8d7da',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    width: '100%',
                                    maxWidth: '100%',
                                    wordWrap: 'break-word',
                                    marginBottom: '10px',
                                }}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar>L</Avatar>}
                                    title={`${item.sender.first} ${item.sender.last}`}
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

            <div style={{ position: 'fixed', bottom: '60px', left: '20px', right: '20px' }}>
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
