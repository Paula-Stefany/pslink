import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { useState, FormEvent, useEffect } from 'react'
import { db } from '../../services/firebaseConnection'
import { setDoc, doc, getDoc } from 'firebase/firestore'


export function Networks(){

    const [linkedln, setLinkdln] = useState<string>('');
    const [instagram, setInstagram] = useState<string>('');
    const [youtube, setYoutube] = useState<string>('');

    useEffect(() =>{

        function loadLinks(){
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then((snapchot) => {
                if (snapchot.data() !== undefined){
                    setLinkdln(snapchot.data()?.linkedln);
                    setInstagram(snapchot.data()?.instagram);
                    setYoutube(snapchot.data()?.youtube);
                }
            })
        }

        loadLinks();

    }, [])

    function handleRegister(e: FormEvent){
        e.preventDefault();

        setDoc(doc(db, 'social', 'link'), {
            linkedln: linkedln,
            instagram: instagram,
            youtube: youtube
        })        
        .then(() => {
            console.log('Cadastrado com sucesso')
        })
        .catch((error) => {
            console.log('Erro: ' + error);
        })

    }

    return(
        <div className="flex items-center flex-col py-6 min-h-screen">
            <Header/>

            <h1 className='text-amber-50 text-2xl font-medium mt-14 mb-12'>Minhas Redes Sociais</h1>

            <form onSubmit={handleRegister} className='flex flex-col max-w-xl w-11/12 py-2'>
                <label className='text-xl font-medium mb-2 mt-2 text-amber-50'>Link do Linkedln</label>
                <Input type='url' placeholder='URL do Linkedln'
                value={linkedln}
                onChange={(e) => setLinkdln(e.target.value)}/>

                <label className='text-xl font-medium mb-2 mt-2 text-amber-50'>Link do Instagram</label>
                <Input type='url' placeholder='URL do Instagram'
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}/>

                <label className='text-xl font-medium mb-2 mt-2 text-amber-50'>Link do Youtube</label>
                <Input type='url' placeholder='URL do Youtube'
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}/>

                <button type='submit' className='flex justify-center mb-6 mt-6 items-center bg-blue-800 p-2.5 cursor-pointer rounded-lg text-lg font-medium text-amber-50'>Salvar Links</button>
            </form>

        </div>
    )

}
