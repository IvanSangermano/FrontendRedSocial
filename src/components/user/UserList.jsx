import React from 'react'
import useAuth from '../../hooks/useAuth'
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago' 

export const UserList = ({users, getUsers, following, setFollowing, page, setPage, more, loading}) => {

    const {auth} = useAuth()

    const follow = async(userId) => {
        const request = await fetch(Global.url + 'follow/save',{
        method: 'POST',
        body: JSON.stringify({followed: userId}),
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
        }
        })

        const data = await request.json();

        if(data.status == "success" ){
        setFollowing([...following, userId])
        }
    }
    
    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getUsers(next)
    }


    const unfollow = async(userId) => {
        const request = await fetch(Global.url + 'follow/unfollow/' +userId,{
        method: 'DELETE',
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
            }
        })

        const data = await request.json();

        if(data.status == "success" ){
        setFollowing(following.filter((x) => x !== userId))
        }
    }   

    return (
        <>
            <div className="content__posts">
                {users.map(user => {
                    return(
                    <article className="posts__post" key={user._id}>

                        <div className="post__container">

                        <div className="post__image-user">
                            <Link to={"/social/profile/"+ user._id} className="post__image-link">
                            {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil"/>}
                            {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil"/>}
                            </Link>
                        </div>

                        <div className="post__body">

                            <div className="post__user-info">
                                <Link to={"/social/profile/"+ user._id} className="user-info__name">{user.name} {user.surname}</Link>
                                <span className="user-info__divider"> | </span>
                                <Link to={"/social/profile/"+ user._id} className="user-info__create-date"><ReactTimeAgo date={user.created_at} locale='es-ES'/></Link>
                            </div>

                            <h4 className="post__content">{user.bio}</h4>

                        </div>

                        </div>

                        {user._id !== auth._id &&
                        <div className="post__buttons">
                            {!following.includes(user._id) &&
                                <button className="post__button post__button--green"
                                onClick={() => follow(user._id)}>
                                    Follow
                                </button>
                            }
                            {following.includes(user._id) &&
                                <button className="post__button post__button"
                                onClick={() => unfollow(user._id)}>
                                    Unfollow
                                </button>
                            }
                        </div>
                        }
                    </article>
                    )
                    })}
            </div>
            {loading && <h1>Cargando...</h1>}
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Show more people
                    </button>
                </div>
            }
            <br/>
        </>
    )
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired, 
    following: PropTypes.array.isRequired, 
    setFollowing: PropTypes.func.isRequired, 
    page: PropTypes.number.isRequired, 
    setPage: PropTypes.func.isRequired, 
    more: PropTypes.bool.isRequired, 
    loading: PropTypes.bool.isRequired
}