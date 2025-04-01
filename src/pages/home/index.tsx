import { useEffect, useState } from 'react'
import { Social } from '../../components/Social'
import { FaLinkedin } from 'react-icons/fa'
import { db } from '../../services/firebaseConnection'
import { getDocs,
    collection, orderBy, query, doc, getDoc
 } from 'firebase/firestore'


interface LinkProps{
    id: string;
    name: string;
    url: string;            
    bg: string;            
    color: string;
}

interface SocialLinksProps{
    youtube: string;
    instagram: string;
    linkedln: string;
}

export function Home(){

    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {

        function loadLinks(){
            const linkRef = collection(db, 'links');
            const queryRef = query(linkRef, orderBy('created', 'asc'))

            getDocs(queryRef)
            .then((snapshot) => {
                const lista = [] as LinkProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })

                setLinks(lista);

            })


        }

        loadLinks();


    }, [])


    useEffect(() => {

        function loadSocialLinks(){
            const docRef = doc(db, 'social', 'link')

            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        youtube: snapshot.data()?.youtube,
                        instagram: snapshot.data()?.instagram,
                        linkedln: snapshot.data()?.linkedln
                    });
                }
            })
        }

        loadSocialLinks();

    }, [])

    return(

        <div className="flex flex-col w-full py-4 items-center justify-center">

            <h1 className="md:text-4xl text-3xl mt-40 text-white">PS Links</h1>
            <span className="mb-5 mt-5 text-gray-200 text-base">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 ">

               {links.map((item) => (
                 <section key={item.id} className="flex flex-col md:w-100 w-11/12 text-center p-2.5 m-auto cursor-pointer select-none rounded-lg transition-transform hover:scale-105 mb-2" style={{backgroundColor: item.bg, color: item.color}}>
                 <a href={item.url} target='_blank'>
                     <p className="text-white text-lg">{item.name}</p>
                 </a>
             </section>
               ))}

                { socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">

                        <Social url={socialLinks?.linkedln}>
                            <FaLinkedin size={35} color='#fff'></FaLinkedin>
                        </Social>

                </footer>
                ) }

            </main>

        </div>
    )
}
