import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { getUser } from '../../services/user'
import { AiOutlineTwitter, AiOutlineUserAdd } from 'react-icons/ai'
// import { GrUpdate } from 'react-icons/gr'
import styles from '../../styles/profile.module.scss'
import { checkFollow, followUser, unfollowUser } from '../../services/follow'
import { useGetId } from '../../services/useGetId'

export default function Profile() {
    const [profile, setProfile] = useState()
    const [follow, setFollow] = useState()
    const router = useRouter()
    const id = router.query.id
    const token = Cookie.get('token')
    const handle = () => {
        unfollowUser(id, token)
    }
    useEffect(() => {
        if (token) {
            getUser(id, token).then(response => {
                setProfile(response)
            }).catch((err) => {
                <h1>{err}</h1>
            })
        } else {
            router.push('/login')
        }

    }, [])
    return (<>
        <div className={styles.nav}>
            <Link href="/home"><a>Tweeto <AiOutlineTwitter /></a></Link>
        </div>
        <div className={styles.container}>
            {
                (profile == null) ? <h3>oh oh!</h3> :
                    <div className={styles.info}>
                        <h1>{profile.name} {profile.surname}</h1>
                        <h2>{profile.biography}</h2>
                        <h3>{profile.email} {profile.location}</h3>
                        <h4>{profile.dateofbirth}</h4>
                        <h5>{profile.id}</h5>
                        <button onClick={handle}>unfollow<AiOutlineUserAdd /></button>
                    </div>
            }
        </div>
    </>
    )
}