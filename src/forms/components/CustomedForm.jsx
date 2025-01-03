import { Card, Form, Typography } from 'antd';
import React from 'react';
import CustomedBottom from './CustomedBottom';

export default function CustomedForm({ onSubmit, onClear, bottomProps, children, moreTypoStyle, ...rest }) {
    return (
        <Card
            style={{
                background: 'linear-gradient(to bottom, #A7C6ED, #E0E7EF, #D9D9D9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Form onFinish={onSubmit} {...rest}
                style={{
                    maxWidth: 360,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <Typography style={{ fontFamily: 'Caveat, cursive', fontSize: '4em', marginBottom: '1em', ...moreTypoStyle }}>
                    InstaPost
                </Typography>
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { ...rest });
                    }
                    return child;
                })}

                <CustomedBottom
                    checkboxText={bottomProps.checkboxText}
                    linkHrefTextOptinial1={bottomProps.linkHrefTextOptinial1}
                    submitText={bottomProps.submitText}
                    linkHrefTextOptinial2={bottomProps.linkHrefTextOptinial2}
                    onLinkClick={bottomProps.onLinkClick}
                    onClear={onClear}
                    submitDisabled={bottomProps.submitDisabled}
                />
            </Form>
        </Card>
    );
}
