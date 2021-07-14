import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';


export default props =>
{
    return(
        <Container>
            <Head>
             <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
            </Head>
            <Header/>
            {props.children}
            <h1></h1>
        </Container>
    );
};