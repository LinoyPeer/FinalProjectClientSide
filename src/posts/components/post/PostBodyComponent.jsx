
import { Divider, Image } from 'antd'
import React from 'react'

export default function PostBodyComponent({ imageSrc, imageAlt }) {

    return (
        <>
            <Image src={imageSrc} alt={imageAlt} width={200} height={200} style={{ margin: 'auto' }} />
            <Divider />
        </>
    )
}
