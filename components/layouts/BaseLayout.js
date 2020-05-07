import Header from '../shared/Header';
import React from 'react'
import Head from "next/head";


const BaseLayout = props => {

    const {className, children, isAuthenticated, user} = props;
    const headerType = props.headerType || 'default';
    return (
        <React.Fragment>
            //header page
            <Head>
                <title>Laurent Nizzoli</title>
            </Head>

            <div className="layout-container">
                <Header className={`port-nav-${headerType}`} isAuthenticated={isAuthenticated} user={user}/>
                <main className={`cover ${className}`}>
                    <div className="wrapper">
                        {children}
                    </div>
                </main>
            </div>

        </React.Fragment>

    )
}

export default BaseLayout;
