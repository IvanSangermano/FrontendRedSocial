import React from 'react'
import { Link } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import avatar from '../../assets/img/user.png'
import useAuth from '../../hooks/useAuth'
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago'

export const PublicationList = ({publications, getPublication, page, setPage, more, setMore}) => {
    const {auth} = useAuth()
    
    const token = localStorage.getItem('token')

    const nextPageButton = () => {
        let next = page + 1
        setPage(next)
        getPublication(next)
    }

    const deletePublication = async(publicationId) => {
        const request = await fetch(Global.url + 'publication/remove/' + publicationId, {
            method: 'DELETE',
            headers: {
                "Content-Type":"application/json",
                "Authorization": token
            }
        })
    
        const data = await request.json();

        setPage(1);
        setMore(true)
        getPublication(1, true);
    }

  return (
    <>
        <div className="content__posts">
                {publications.map(publication => {
                    return(
                    <article className="posts__post" key={publication._id}>

                        <div className="post__container">

                            <div className="post__image-user">
                                <Link to={"/social/profile/"+ publication.user._id} className="post__image-link">
                                    {publication.user.image != "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-image" alt="Foto de perfil"/>}
                                    {publication.user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil"/>}
                                </Link>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">{publication.user.name} {publication.user.surname}</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date"><ReactTimeAgo date={publication.created_at} locale='es-ES'/></a>
                                </div>

                                <h4 className="post__content">{publication.text}</h4>

                                {publication.file && <img src={Global.url + 'publication/media/' + publication.file}/>}
                            </div>

                        </div>

                        {auth._id == publication.user._id &&
                            <div className="post__buttons">

                                <button onClick={() => deletePublication(publication._id)} className="post__button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>

                            </div>
                        }
                        <br/>
                    </article>
                    )
                })}
            </div>
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPageButton}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
    </>
  )
}

PublicationList.propTypes = {
    publications: PropTypes.array.isRequired, 
    getPublication: PropTypes.func.isRequired, 
    page: PropTypes.number.isRequired, 
    setPage: PropTypes.func.isRequired, 
    more: PropTypes.bool.isRequired, 
    setMore: PropTypes.func.isRequired
}
