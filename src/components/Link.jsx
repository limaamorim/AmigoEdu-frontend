import { useState , useContext } from "react";
import { AuthContext } from "../services/authContext";

export default function Link() {

     const { user } = useContext(AuthContext);
     const link_indicacao = user?.link_indicacao || "não disponível";

    const [copied, setCopied] = useState(false);
    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(link_indicacao);
            setCopied(true);
            alert('Link copiado!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Falha ao copiar o link: ', err);
            alert('Falha ao copiar o link.');
        }
    };

    return(
        <div className="flex flex-col gap-2 w-full md:flex-row">
            <div className="flex flex-row gap-2 bg-white rounded-3xl items-center w-full p-3 shadow-sm">
                <span className="text-sky-800 font-semibold pl-1 flex text-center">Meu link de indicação:</span>
                <span className="text-gray-500 truncate">{link_indicacao}</span>
            </div>
            <div>
                <button className="bg-amber-400 w-full text-amber-50 h-11 text-center text-nowrap p-5 px-7 items-center flex justify-center rounded-3xl shadow-sm hover:bg-amber-500 cursor-pointer" onClick={copyLink}>Copiar link</button>
            </div>
        </div>
    )
}