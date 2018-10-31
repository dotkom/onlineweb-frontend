import React from 'react';
import Header from 'frontpage/components/Header';
import Intro from '../components/Intro';
import RepositoryList from '../components/RepositoryList';

const ContributionContainer = () => (
    <section id="contributions">
        <div className="container">
            <Header>Bidra til Onlinernes digital hverdag!</Header>
            <Intro/>
            <RepositoryList/>
        </div>
    </section>
);

export default ContributionContainer;
