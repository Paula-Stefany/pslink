import { Link } from 'react-router'
import { FaHome } from 'react-icons/fa'


export function NotFoundPage(){

    return(
        <div className='flex flex-col min-h-full h-screen  items-center w-full justify-center text-center'>
            <span className='font-bold text-3xl text-red-600 mb-2'>404</span>
            <h1 className='text-amber-50 font-bold text-4xl md:text-5xl'>PÁGINA NÃO ENCONTRADA</h1>
            <p className='text-amber-50 mb-2 mt-4 text-lg'>Você caiu em uma página que não existe!</p>

            <Link className='text-amber-50 text-base flex items-center gap-2' to='/'>
                Voltar para Home
                <FaHome/>
            </Link>

        </div>
    )
}
