import { ReactNode, useEffect, useState } from 'react'
import { auth } from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router';


interface PrivateProps{
    children: ReactNode
}


export function Private({children}: PrivateProps){

    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {

            if(user){

                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem('@jujuba', JSON.stringify(userData));
                setLoading(false);
                setSigned(true);

            } else{
                setLoading(false);
                setSigned(false);
            }
        })

        return () => {
            unsub();
        }

    }, [])


    if(loading){
        return(
            <div className='flex w-full h-screen justify-center items-center'><span className='text-amber-50 font-bold'>Calma 💅</span></div>
        )
    }

    if(!signed){
        return <Navigate to='/login'/>
    }

    return (
        children
    )
}