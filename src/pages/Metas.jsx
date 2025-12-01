import { useEffect, useState } from "react";
import MetaCard from "../components/MetaCard";
import api from "../services/api"; // Ajuste o caminho se necessário

export default function Metas() {
    const [metas, setMetas] = useState([]);

    async function carregarMetas() {
      try {
        const res = await api.get("/metas");
        setMetas(res.data || []);
      } catch (error) {
        console.error("Erro ao carregar metas:", error);
        // Opcional: mostrar um erro para o usuário
      }
    }
  
    useEffect(() => {
      carregarMetas();
    }, []);

    return(
        <div className="flex flex-col gap-10 m-5 md:m-0 md:mr-5 justify-center mb-30 md:mb-0">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Metas
            </h1>
          <p className="text-gray-600 mt-2">Complete metas e ganhe recompensas</p>
      </div>
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl">
                    {metas.map((meta) => 
                <MetaCard 
                    key={meta.id}
                    titulo={meta.nome}
                    descricao={meta.descricao}
                    recompensa={meta.recompensa}
                />
                )}
                </div>
            </div>
        </div>
    )
}