import { Link, useNavigate } from 'react-router'
import { Input } from '../../components/input'
import { FormEvent, useState } from 'react'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'


export function Login(){

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    // Todo função de submisssão dispara um evento
    function handleSubmit(event: FormEvent){

        // Para não atualizar a página
        event.preventDefault();

        if(email === '' || password === ''){
            alert('Preencha todos os campos')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log('Logado com sucessoooo')
            // Substituir o histórico de navegação
            navigate('/admin', {replace: true});
        })
        .catch((error) => {
            console.log('ERRO AO LOGAR:');
            console.log(error);
        })

    }

    return(
        <div className="flex flex-col w-full justify-center items-center h-screen">
            <Link to="/">
                
                <h1 className="mt-11 mb-7 text-white font-bold text-5xl">Dev<span className='bg-gradient-to-r from-fuchsia-200 to-fuchsia-400 bg-clip-text text-transparent'>Link</span> </h1>

            </Link>
            <form action="" onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col px-2'>
                <Input placeholder='Digite seu Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

                <Input placeholder='********' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button type='submit' className='h-12 bg-pink-700 border-0 outline-0 rounded-md cursor-pointer text-white text-lg font-medium'>Acessar</button>
            </form>
        </div>
    )
    
}
