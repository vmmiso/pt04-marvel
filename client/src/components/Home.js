import React, { useEffect, useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import TopCharacters from './TopCharacters';
import './Home.css';

const listLimit = 20;
const baseUrl = 'https://pt04.marcomiso.com/api/characters/find?limit=' + listLimit;

const Home = () => {
    const { auth } = useAuth();
    const [ characters, setCharacters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ offset, setOffset ] = useState(0);

    const navigate = useNavigate();

    const paginationNext = () => {
        setLoading(true);

        fetch(`${baseUrl}&offset=${offset+listLimit}`, { headers: { 'x-api-key': auth?.apiKey } })
            .then(response => response.json())
            .then((response) => {
                setCharacters(response.data.results);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setCharacters(null);
            })
            .finally(() => {
                setOffset(offset+listLimit);
                setLoading(false);
        });
    }

    const paginationPrev = () => {
        setLoading(true);

        fetch(`${baseUrl}&offset=${offset-listLimit}`, { headers: { 'x-api-key': auth?.apiKey } })
            .then(response => response.json())
            .then((response) => {
                setCharacters(response.data.results);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setCharacters(null);
            })
            .finally(() => {
                setOffset(offset-listLimit);
                setLoading(false);
        });
    }

    useEffect(() => {
        fetch(`${baseUrl}&offset=0`, { headers: { 'x-api-key': auth?.apiKey } })
            .then(response => response.json())
            .then((response) => {
                setCharacters(response.data.results);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setCharacters(null);
            })
            .finally(() => {
                setLoading(false);
        });
    }, [auth]);

    return (
        <div className="home-list">
            <TopCharacters />

            <h2>All characters</h2>
            
            { loading && <div>Loading...</div> }
            
            { error && ( <div>{`There is a problem fetching the data - ${error}`}</div> ) }

            { characters &&
                <>
                    <div className='grid-container'>
                        { characters.map((character) => (
                            <div className='grid-item' key={ character.id } onClick={ () => navigate(`/character/${character.id}`) }>
                                <img src={ `${character.thumbnail?.path}.${character.thumbnail?.extension}` } alt={ character.name } />
                                <h3>{ character.name }</h3>
                            </div>
                        ))}
                    </div>
                    <div className='pagination'>
                        { offset > 0 && <FaArrowLeft onClick={ paginationPrev } className="pagination-button"/> }
                        <FaArrowRight onClick={ paginationNext } className="pagination-button"/>
                    </div>
                </>
            }
        </div>
    )
}

export default Home;