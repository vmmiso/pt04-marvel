import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { FaHeart } from 'react-icons/fa';

import { useAuth } from '../hooks/useAuth';
import './CharacterPage.css'

const baseUrl = 'https://pt04.marcomiso.com/api/';

const CharacterPage = () => {
    const { auth } = useAuth();

    const [ character, setCharacter ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ btnIsDisabled, setBtnDisabled ] = useState(false);
    const [ newComment, setNewComment ] = useState("");

    const [ rating, setRating ] = useState({rating: null, averageRating: null, totalRatings: null});
    const [ isFaved, setIsFaved ] = useState(false);
    const [ comments, setComments ] = useState([]);

    const { characterId } = useParams();

    useEffect(() => {
        fetch(baseUrl + "characters/find/" + characterId, { headers: { 'x-api-key': auth?.apiKey } })
            .then(response => response.json())
            .then((response) => {
                setCharacter(response?.data?.results[0]);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setCharacter(null);
            })
            .finally(() => {
                setLoading(false);
        });
        fetch(baseUrl + `characters/find/extra/${characterId}/${auth?.username}`, { headers: { 'x-api-key': auth?.apiKey } })
            .then(response => response.json())
            .then((response) => {
                setRating({rating: response?.rating, averageRating: response?.averageRating, totalRatings: response?.totalRatings});
                setIsFaved(response?.isLiked);
                setComments(response?.comments);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
        });
    }, [auth, characterId]);

    const handleNewComment = ( e ) => {
        e.preventDefault();
        setBtnDisabled(true);

        if ( newComment === "" ) {
            setBtnDisabled(false);
            return alert("Añade un comentario");
        }

        const commentPost = {
            username: auth?.username,
            characterId: characterId,
            comment: newComment
        }

        fetch(baseUrl + "comments", { 
            method: 'POST',
            headers: { 'Content-Type':'application/json', 'x-api-key': auth?.apiKey },
            body: JSON.stringify(commentPost)
        })
            .then(response => {
                if(response.status === 201) return response.json();
                throw new Error(response.status);
            })
            .then((data) => {
                setComments([ ...comments, { username: auth?.username, comment: newComment } ]);
                setNewComment("");
                setBtnDisabled(false);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
        });
    }

    const handleNewRating = ( newRating ) => {
        const ratingPost = {
            username: auth?.username,
            characterId: characterId,
            rating: newRating,
        }

        fetch(baseUrl + "ratings", {
            method: 'POST',
            headers: { 'Content-Type':'application/json', 'x-api-key': auth?.apiKey },
            body: JSON.stringify(ratingPost)
        })
            .then(response => {
                if(response.status === 201) return response.json();
                throw new Error(response.status);
            })
            .then((data) => {
                // setRating({ rating: newRating, ...rating });
                setRating({ rating: newRating, averageRating: rating.averageRating, totalRatings: rating.totalRatings });
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
        });
    }

    const handleFav = () => {
        const favPost = {
            username: auth?.username,
            characterId: characterId,
        }

        fetch(baseUrl + "likes", {
            method: 'POST',
            headers: { 'Content-Type':'application/json', 'x-api-key': auth?.apiKey },
            body: JSON.stringify(favPost)
        })
            .then(response => {
                if(response.status === 200) return response.json();
                throw new Error(response.status);
            })
            .then((data) => {
                setIsFaved(data.like);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
        });
    }

    return (
        <>
            { loading && <div>Loading...</div> }

            { error && ( <div>{`There is a problem fetching the data - ${error}`}</div> ) }

            { character && 
                <>
                    <div className="character-profile">
                        <img src={ `${character.thumbnail?.path}.${character.thumbnail?.extension}` } alt={ character.name } />
                        <div>
                            <FaHeart onClick={ handleFav } className={isFaved ? "fav-button-red" : "fav-button"}/>
                            <Rating name="half-rating" value={rating.rating/2} precision={1} onChange={(event, newValue) => { handleNewRating(newValue*2) }}/>
                            { rating?.totalRatings > 0 && <span className="media-ratings">Media: {rating.averageRating/2}/5 ({ rating.totalRatings } votos)</span> }

                            <h2>{ character.name }</h2>
                            <p>{ character.description }</p>
                            <b>Comics: </b>{ character.comics?.items?.map(( comic, index ) => <span key={index}>{ comic.name }, </span>) }
                        </div>
                    </div>
                    <div className="comments-section">
                        { comments.map(( comment, index ) => <div className="comment" key={index}><div><b>{comment.username+":"}</b></div><span>{comment.comment}</span></div>) }
                    </div>
                    <form onSubmit={ handleNewComment }>
                        <div className="form-group">
                            <div>Comentar:</div>
                            <textarea value={ newComment } onChange={ (e) => setNewComment(e.target.value) } className="form-control" rows="3" name="comment" placeholder="Añadir un comentario..."></textarea>
                        </div>
                        <button type="submit" disabled={ btnIsDisabled } className="btn btn-primary mb-2">Enviar</button>
                    </form>
                </>
            }
        </>
    )
}

export default CharacterPage