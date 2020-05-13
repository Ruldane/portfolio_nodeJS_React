import Header from '../shared/Header';
import React from 'react'
import Head from "next/head";
import { ToastContainer } from 'react-toastify';



const BaseLayout = props => {

    const {className, children, isAuthenticated, user, isSiteOwner, title = "Portfolio Application", cannonical} = props;
    const headerType = props.headerType || 'default';
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta name="description" content="
                Passionné d’informatique et de
                nouvelles technologies depuis
                toujours, le monde du web est un
                domaine fascinant. Autodidacte et
                en reconversion professionnelle je
                m’adapte très rapidement." />
                <meta name="keywords" content="nizzoli Portfolio, nizzoli développeur web, nizzoli expériences professionnelles, nizzoli blog"/>
                <meta property="og:title" content="Nizzoli Laurent - développeur, développeur web, bloger"/>
                <meta property="og:locale" content="fr_EU"/>
                <meta property="og:url" content={`${process.env.NAMESPACE}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="Développeur Web ReactJS et NodeJS"/>
                {cannonical && <Link rel="cannonical" href={`${process.env.NAMESPACE}${cannonical}`}/>}
                <link rel="icon" type="image/ico" href="/favicon.ico"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet" />
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
