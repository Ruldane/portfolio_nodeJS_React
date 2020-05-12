import Header from '../shared/Header';
import React from 'react'
import Head from "next/head";
import { ToastContainer } from 'react-toastify';



const BaseLayout = props => {

    const {className, children, isAuthenticated, user, isSiteOwner} = props;
    const headerType = props.headerType || 'default';
    return (
        <React.Fragment>
            <Head>
                <title>Laurent Nizzoli</title>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                      rel="stylesheet" />
            </Head>

            <div className="layout-container">
                <Header
                    className={`port-nav-${headerType}`}
                    isAuthenticated={isAuthenticated} user={user}
                    isSiteOwner={isSiteOwner}/>
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
