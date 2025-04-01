import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { FormEvent, useEffect, useState } from 'react'
import { FaLink } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'


interface LinkProps{
    id: string;
    name: string;
    url: string;            
    bg: string;            
    color: string;
}         

export function Admin(){

    const [nameInput, setNameInput] = useState<string>('');
    const [urlInput, setUrlInput] = useState<string>('');
    const [bgColorInput, setBgColorInput] = useState<string>('#9b2c2c');
    const [textColorInput, setTextColorInput] = useState<string>('#ffffff');
    const [links, setLinks] = useState<LinkProps[]>([]);


    useEffect(() => {

        console.log('montasdo')
        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy('created', 'asc'));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            
            const linkList = [] as LinkProps[];

            snapshot.forEach((doc) => {

                linkList.push({

                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color

                })
            })

            setLinks(linkList);

        })

        return () => {
            unsub();
        }

    }, []);


    function handleRegister(e: FormEvent){
        e.preventDefault();
        
        if(nameInput === '' || urlInput === ''){
            alert('Preencha todos os campos');
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {

            setNameInput('');
            setUrlInput('');
            console.log('Cadastrado com sucesso');

        })

        .catch((error) => {
            console.log('errou papai: ');
            console.log(error)
        })

    }

    async function handleDeleteLink(id: string){

        await deleteDoc(doc(db, 'links',  id));

    }


    return(
        <div className='flex flex-col items-center py-6 min-h-screen'>                           <Header/>

            <form className='py-12 max-w-xl flex flex-col w-11/12' onSubmit={handleRegister}>
                <label className='text-amber-50 font-medium mt-2 mb-2 text-xl'>Nome do Link</label>
                <Input type='text' placeholder='Nome do link' value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>

                <label className='text-amber-50 font-medium mt-2 mb-2 text-xl'>Url do Link</label>
                <Input type='url' placeholder='Digite a URL' value={urlInput} onChange={(e) => setUrlInput(e.target.value)}/>

                <section className='flex gap-3'>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="" className='text-xl text-amber-50 font-medium mt-2 mb-2'>Fundo do Link</label>
                        <input value={bgColorInput} onChange={(e) => setBgColorInput(e.target.value)} type="color" className='size-8' />
                    </div>

                    <div className='flex gap-2 items-center'>
                        <label htmlFor="" className='text-xl text-amber-50 mt-2 mb-2 font-medium'>Cor do Link</label>
                        <input value={textColorInput} type="color" onChange={(e) => setTextColorInput(e.target.value)} className='size-8' />
                    </div>
                </section>

            

                {nameInput !== '' && (
                    <div className='flex items-center flex-col py-5 border border-amber-50 rounded-md w-full md:max-w-xl mt-2 mb-6'>
                        <label className='text-base text-amber-50  mb-2'>Veja como está ficando 👇</label>
                        <article className='w-11/12 flex justify-center p-2 rounded-lg' style={{ backgroundColor: bgColorInput }}>
                            <p className='text-lg font-medium select-none' style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type='submit' className='flex bg-blue-800/90  w-full p-2.5 cursor-pointer select-none rounded-lg transition-transform hover:scale-105 text-amber-50 text-lg font-medium  mb-2 items-center justify-center gap-2 mt-2'>
                    Cadastrar 
                    <FaLink size={15}/>
                </button>

            </form>
            <h2 className='mb-4 font-bold text-amber-50 text-3xl text-center py-8'>
                    Meus Links
            </h2>

            { links.map((item) => (
                <article key={item.id}  className='flex w-11/12 max-w-xl p-2.5 cursor-pointer select-none rounded-lg font-medium items-center  mb-2 justify-between ' style={{ backgroundColor: item.bg }}>
                    <p className='text-lg' style={{ color: item.color }}>{item.name}</p>
                    <div>                            
                        <button onClick={() => handleDeleteLink(item.id)} className='border border-dashed p-1 rounded border-amber-50 cursor-pointer'> 
                           <FiTrash className='text-amber-50'size={18}/></button>
                    </div>
                </article>
                )) }
        </div>
    )
}
