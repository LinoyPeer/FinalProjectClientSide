import React from 'react'
import PageHeader from '../components/PageHeader'

export default function UnauthorizedPage() {
    return (
        <>
            <div style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
                <PageHeader title={'Unauthorized Page'} subtitle={'User is not authorized to get this page'} />
            </div>
        </>
    )
}
