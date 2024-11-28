
import { Divider, Image } from 'antd'
import Typography from 'antd/es/typography/Typography'
import React from 'react'

export default function PostBodyComponent({ children, imageSrc, imageAlt }) {

    return (
        <>
            <Image src={imageSrc} alt={imageAlt} width={200} height={200} style={{ margin: 'auto' }} />
            <br></br><br></br><br></br>
            <Typography>{children}</Typography>
            <Divider />
        </>
    )
}
