import { FaArrowCircleLeft, FaLink, FaHashtag } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'


export function Header(){

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <header className="flex px-3 py-2  bg-pink-900 opacity-90 rounded-2xl">
            <nav className='flex gap-5'>
                <div className='flex gap-3'>
                    <Link className='flex items-center gap-2 text-amber-50 hover:text-pink-200' to='/'>
                        <FaArrowCircleLeft className='cursor-pointer size-4.5 '></FaArrowCircleLeft>
                        <p className='cursor-pointer  text-base'>Home</p>
                    </Link>
                    <Link className='flex gap-2 items-center text-amber-50 hover:text-pink-200' to='/admin'>
                        <FaLink className='size-4.5 '></FaLink>
                        <p className='cursor-pointer text-base '>Links</p>
                    </Link>
                    <Link className='flex items-center gap-2 text-amber-50 hover:text-pink-200' to='/admin/social'>
                        <FaHashtag className='size-4.5 '/>
                        <p className='cursor-pointer  text-base'>Redes Sociais</p>
                    </Link>
                </div>

                <button onClick={handleLogout} className='pl-0.5 cursor-pointer text-amber-50 hover:text-pink-200'>
                    <BiLogOut className='size-5'/>
                </button>
                
            </nav>
            
          
        </header>
    )
}