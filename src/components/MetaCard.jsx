import { LiaUserFriendsSolid } from "react-icons/lia";

export default function MetaCard({ titulo, descricao, recompensa}) {
    return(
        <div className="flex flex-col bg-white max-w-90 rounded-3xl shadow p-7 gap-2 items-center hover:shadow-lg transition">
            <LiaUserFriendsSolid className="text-8xl text-amber-400" />
            <div className="flex flex-col gap-3 items-center">
                <h1 className="font-semibold text-xl">{titulo}</h1>
                <p className="flex text-center">{descricao}</p>
                {/* barra de progresso */}
                    <div className="flex bg-sky-700  w-full h-3 rounded-xl justify-center items-center">
                    </div>
                <p className="outline rounded-2xl py-2 w-full text-center">Recompensa: R${recompensa}</p>
                <span className="text-xs text-gray-600">faltam x indicações para completar essa meta</span>
            </div>           
        </div>
    )
}