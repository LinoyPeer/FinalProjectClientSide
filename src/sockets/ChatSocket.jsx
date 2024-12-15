// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import { SendOutlined } from '@ant-design/icons';
// import { Avatar, Button, Input, List } from 'antd';
// import { useAuth } from '../providers/AuthProvider';

// export default function ChatSocket() {
//     const socketRef = useRef(null);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const { userDetails } = useAuth();
//     const SOCKET_IO_SERVER = 'http://localhost:8181/chat';
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         socketRef.current = io(SOCKET_IO_SERVER);

//         socketRef.current.on('chatHistory', (history) => {
//             setMessages(history);
//         });

//         socketRef.current.on('chatMessage', (newMessage) => {
//             setMessages(prevMessages => [...prevMessages, newMessage]);
//         });

//         return () => {
//             socketRef.current.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const handleSendMessage = useCallback(() => {
//         if (message.trim()) {
//             setIsSending(true);
//             socketRef.current.emit('sendMessage', {
//                 content: message,
//                 timestamp: new Date().toISOString(),
//                 sender: {
//                     first: userDetails.name.first,
//                     last: userDetails.name.last,
//                     image: userDetails.image.path,
//                     _id: userDetails._id,
//                 }
//             });
//             setMessage('');
//             setIsSending(false);
//         }
//     }, [message, userDetails]);

//     return (
//         <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <List
//                 dataSource={messages}
//                 renderItem={(item, index) => {
//                     const isCurrentUser = userDetails && (item.sender._id === userDetails._id);
//                     return (
//                         <List.Item
//                             key={index}
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     backgroundColor: isCurrentUser ? '#d1e7dd' : '#f8d7da',
//                                     padding: '10px',
//                                     borderRadius: '10px',
//                                     width: '100%',
//                                     textAlign: isCurrentUser ? 'right' : 'left',
//                                     wordWrap: 'break-word',
//                                 }}
//                             >
//                                 <List.Item.Meta
//                                     avatar={<Avatar>{item.sender.first[0]}</Avatar>}
//                                     title={`${item.sender.first} ${item.sender.last}`}
//                                     description={item.content}
//                                 />

//                                 <div style={{ fontSize: '0.75rem', color: 'gray', }}>
//                                     {new Date(item.timestamp).toLocaleString()}
//                                 </div>
//                             </div>
//                         </List.Item>
//                     );
//                 }}
//             />
//             < div ref={messagesEndRef} />
//             <div style={{ position: 'fixed', bottom: '60px', left: '20px', right: '20px' }}>

//                 <Input
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onPressEnter={handleSendMessage}
//                     placeholder="Type a message..."
//                     suffix={
//                         <Button
//                             type="primary"
//                             onClick={handleSendMessage}
//                             disabled={isSending}
//                             icon={<SendOutlined />}
//                         />
//                     }
//                 />
//             </div>
//         </div >
//     );
// }