
// import { SendOutlined } from '@ant-design/icons';
// import { Avatar, Button, Input, List } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from '../providers/AuthProvider';

// export default function ChatSocket() {
//     const SOCKET_SERVER_URL = 'http://localhost:8181';
//     const [socket, setSocket] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     // const [userConnected, setUserConnected] = useState(null);
//     const [isSending, setIsSending] = useState(false); // מצב לשליחת הודעה
//     const { user } = useAuth();

//     // useEffect(() => {
//     //     if (user) {
//     //         setUserConnected(user);
//     //     }
//     // }, [user]);

//     const userInfo = {
//         id: user ? user._id : Math.random().toString(36),
//         name: "Anonymous",
//         avatar: "https://i.pravatar.cc/150?img=3",
//     };

//     useEffect(() => {
//         const newSocket = io(SOCKET_SERVER_URL, { autoConnect: false });
//         newSocket.connect();
//         setSocket(newSocket);

//         newSocket.on('connect', () => {
//             console.log('Connected to socket server');
//         });

//         newSocket.on('message received', (newMessage) => {
//             console.log(newMessage);

//             if (user && user._id === newMessage.userInfo.id) return;
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         newSocket.on('recoverHistory', (history) => {
//             setMessages(history);
//         });

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     const handleSendMessage = (e) => {
//         // if (messages.includes(message)) return;
//         e.preventDefault(); // מונע שליחה כפולה אם הגעת לכאן עם Enter
//         if (message.trim() && socket && !isSending) {  // רק אם אין שליחה בתהליך
//             setIsSending(true);  // סימן שההודעה בתהליך שליחה
//             const newMessage = { userInfo, message, timestamp: new Date() };
//             socket.emit('message sent', newMessage);
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//             setMessage(""); // מנקה את השדה אחרי שליחה
//             setTimeout(() => {
//                 setIsSending(false); // אחרי חצי שנייה, מאפשר שליחה חדשה
//             }, 500);  // זמן המתנה לפני שמאפשרים לשלוח הודעה נוספת
//         }
//     };

//     console.log('Messages:', messages);

//     return (
//         <div style={{
//             width: '100%',
//             height: 500,
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             backgroundColor: "#f9f9f9"
//         }}>
//             <h2 style={{ textAlign: "center" }}>Chat</h2>
//             <List
//                 style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}
//                 dataSource={messages}
//                 renderItem={(item, index) => (
//                     <List.Item
//                         key={index}
//                         style={{
//                             justifyContent: user && user._id === userInfo.id ? 'flex-end' : 'flex-start'
//                         }}
//                     >
//                         <List.Item.Meta
//                             avatar={<Avatar src={item.user ? item.user.avatar : "https://i.pravatar.cc/150?img=3"} />}
//                             title={item.user ? item.user.name : "Anonymous"}
//                             description={item.message}
//                             style={{
//                                 textAlign: user && user._id === userInfo.id ? 'left' : 'right'
//                             }}
//                         />
//                     </List.Item>
//                 )}
//             />
//             <form onSubmit={handleSendMessage}>  {/* הוספנו את ה-form */}
//                 <div style={{ display: 'flex', gap: '8px' }}>
//                     <Input
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type a message"
//                         style={{ flex: 1 }}
//                     />
//                     <Button
//                         type="primary"
//                         icon={<SendOutlined />}
//                         htmlType="submit"  // הפעלת שליחה דרך ה-form
//                         disabled={!message.trim() || isSending}  // אם יש שליחה בתהליך, לא ניתן לשלוח הודעה
//                     >
//                         Send
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// }


import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, List } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../providers/AuthProvider';

export default function ChatSocket() {
    const SOCKET_SERVER_URL = 'http://localhost:8181';
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    // const [userConnected, setUserConnected] = useState(null);
    const [isSending, setIsSending] = useState(false); // מצב לשליחת הודעה
    const { user } = useAuth();

    // useEffect(() => {
    //     if (user) {
    //         setUserConnected(user);
    //     }
    // }, [user]);

    const userInfo = {
        id: user ? user._id : Math.random().toString(36),
        // id: user && user._id,
        name: "Anonymous",
        avatar: "https://i.pravatar.cc/150?img=3",
    };

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL, { autoConnect: false });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on('connection', () => {
            console.log('Connected to socket server');
        });

        newSocket.on('recoverHistory', (history) => {
            setMessages(history);
        });

        newSocket.on('message received', (newMessage) => {
            console.log(newMessage);

            if (user && user._id === newMessage.userInfo.id) return;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });


        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = useCallback((e) => {
        // if (messages.includes(message)) return;
        e.preventDefault();
        if (message.trim() && socket && !isSending) {
            setIsSending(true);
            const newMessage = { userInfo, message, timestamp: new Date() };
            socket.emit('message sent', newMessage, (ack) => {
                if (ack.success) {
                    console.log('Message was acknowledged by the server');
                }
            });

            // socket.emit('message sent', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage("");
            setTimeout(() => {
                setIsSending(false);
            }, 500);
        }
    }, [user, message]);

    console.log('Messages:', messages);

    return (
        <div style={{
            width: '100%',
            height: 500,
            border: "1px solid #ddd",
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "#f9f9f9"
        }}>
            <h2 style={{ textAlign: "center" }}>Chat</h2>
            <List
                style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}
                dataSource={messages}
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                        style={{
                            justifyContent: user && user._id === item.userInfo.id ? 'flex-end' : 'flex-start',
                            borderRadius: '8px',
                        }}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.user ? item.user.avatar : "https://i.pravatar.cc/150?img=3"} />}
                            // title={item.user ? item.user.name : "Anonymous"}
                            title={user && user._id === item.userInfo.id ? 'left' : 'right'}
                            description={item.message}
                            style={{
                                textAlign: user && user._id === item.userInfo.id ? 'left' : 'right'
                            }}
                        />
                    </List.Item>
                )}
            />
            <form onSubmit={handleSendMessage}>  {/* הוספנו את ה-form */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        style={{ flex: 1 }}
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        htmlType="submit"  // הפעלת שליחה דרך ה-form
                        disabled={!message.trim() || isSending}  // אם יש שליחה בתהליך, לא ניתן לשלוח הודעה
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}

