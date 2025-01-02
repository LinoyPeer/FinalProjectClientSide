import React from 'react';
import PageHeader from '../components/pageHeader';
import { Typography } from 'antd';
import { useMediaQuery } from 'react-responsive'; // ייבוא של useMediaQuery מ- react-responsive

const { Title, Text } = Typography;

export default function AboutPage() {
    // הגדרת תנאים לעבודה עם media query
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <>
            <Typography style={{ padding: '20px', textAlign: isDesktop ? 'center' : 'left' }}>
                <PageHeader title="About InstaPost" subtitle="Learn about our platform and its features" />
            </Typography>
            <Typography
                style={{
                    padding: '20px',
                    marginTop: '-5em',
                    fontSize: isDesktop ? '1.2rem' : '1rem', // שינוי גודל טקסט לדסקטופ
                    lineHeight: isDesktop ? '1.6' : '1.4', // שינוי גובה שורה בדסקטופ
                    marginLeft: isDesktop ? '20%' : '20px', // הזזת התוכן ימינה בדסקטופ
                    marginRight: isDesktop ? '20%' : 'none', // הוספת רווח בצד ימין בדסקטופ
                    maxWidth: isDesktop ? '800px' : 'none', // לקבוע רוחב מקסימלי בדסקטופ
                }}
            >
                <Title level={2}>Welcome to InstaPost</Title>
                <Text>InstaPost is a social platform designed to connect users in real time, allowing you to share, explore, and interact with content effortlessly.</Text>
                <Title level={3}>Key Features:</Title>
                <ul>
                    <li><Text strong>User-Friendly Interface:</Text> Easy-to-use navigation for a smooth browsing experience.</li>
                    <li><Text strong>Social Interaction:</Text> Engage with friends through likes, comments, and shares.</li>
                    <li><Text strong>Customizable Navigation:</Text> Tailor the platform to your preferences.</li>
                    <li><Text strong>Social Feed & Notifications:</Text> Stay updated with your feed and receive notifications.</li>
                    <li><Text strong>Profile Personalization:</Text> Customize your profile to reflect your personality.</li>
                    <li><Text strong>Effortless Sharing:</Text> Easily share posts and connect with others.</li>
                    <li><Text strong>Mobile-Friendly:</Text> Optimized for a seamless experience across devices.</li>
                </ul>
                <br /><br />
            </Typography>
        </>
    );
}
