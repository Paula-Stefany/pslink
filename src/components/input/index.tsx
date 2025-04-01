import { InputHTMLAttributes } from 'react'


type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps){
    return(
        <input placeholder="Teste input..." className="bg-amber-50 border-0 outline-0 h-12 rounded-md px-2 mb-3 text-lg placeholder:text-gray-500 font-medium text-gray-500"  {...props}/>
    )
}
