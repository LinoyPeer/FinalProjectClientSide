import React from 'react'
import PostComponent from './post/PostComponent'
import { Col, Row } from 'antd'

export default function Posts({ posts }) {
    // const posts = [
    //     {
    //         _id: "63765801e20ed868a69a62c4",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c5",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c6",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c7",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c8",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c9",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c10",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    //     {
    //         _id: "63765801e20ed868a69a62c11",
    //         title: "User Name",
    //         description: "Here is the status",
    //         phone: "050-0000000",
    //         email: "test@gmail.com",
    //         web: "https://www.test.co.il",
    //         image: {
    //             url: "https://via.placeholder.com/200",
    //             alt: "example post image",
    //         },
    //         address: {
    //             state: "",
    //             country: "country",
    //             city: "tel-aviv",
    //             street: "Shinkin",
    //             houseNumber: 3,
    //             zip: 1234,
    //         },
    //         bizNumber: 1000000,
    //         user_id: "63765801e20ed868a69a62c2",
    //     },
    // ]

    return (
        <>
            <Row
                style={{ marginBottom: '20px', marginTop: '100px', width: '80%', margin: '0 auto' }}
                gutter={20}
            >
                {posts.map((post) => (
                    <Col
                        xs={24} sm={12} md={8} lg={6}
                        key={post._id}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                    >
                        <PostComponent post={post} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
