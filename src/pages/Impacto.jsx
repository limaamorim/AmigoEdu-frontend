import { useContext, useEffect, useState } from "react";
import ImpactoCard from "../components/ImpactoCard";
import { AuthContext } from "../services/authContext";
import api from "../services/api";

import Impacto1 from "../assets/impacto1.png";
import Impacto2 from "../assets/impacto2.png";
import Impacto3 from "../assets/impacto3.png";
import Impacto4 from "../assets/impacto4.png";

export default function Impacto() {
    const { user } = useContext(AuthContext);
    const [impacto, setImpacto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarImpacto() {
            if (!user?.id) return;
            setLoading(true);
            setError(null);
            try {
                const resp = await api.get(`/impactos/usuario/${user.id}`);
                const body = resp?.data ?? {};
                const impactoObj = body.impacto ?? body;
                setImpacto(impactoObj);
            } catch (err) {
                console.error("Erro ao carregar impacto:", err);
                setError("Não foi possível carregar o impacto.");
            } finally {
                setLoading(false);
            }
        }

        carregarImpacto();
    }, [user?.id]);

    const cards = [
        {
            Id: 1,
            Imagem: Impacto1,
            Descricao: `Você impactou positivamente ${impacto?.familias_ajudadas ?? 0} famílias e cada uma delas agora tem novas oportunidades de crescimento.`,
        },
        {
            Id: 2,
            Imagem: Impacto2,
            Descricao: `Enquanto ajuda pessoas a estudarem, você também impulsiona sua própria renda. Já são R$ ${impacto?.renda_gerada ?? 0} conquistados!`,
        },
        {
            Id: 3,
            Imagem: Impacto3,
            Descricao: `Você compartilhou oportunidades com ${impacto?.indicacoes_count ?? 0} pessoas que acreditam no poder da educação.`,
        },
        {
            Id: 4,
            Imagem: Impacto4,
            Descricao: `Graças às suas indicações, ${impacto?.bolsas_concedidas ?? 0} pessoas conquistaram acesso à educação com bolsas de estudo.`,
        },
    ];

    return (
        <div className="flex flex-col gap-5 m-5 md:m-0 md:mr-5 justify-center">
            <div className="border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Meu Impacto
            </h1>
          <p className="text-gray-600 mt-2">Veja o impacto real que suas indicações estão gerando!</p>
            </div>

            <div className="flex flex-col gap-5 justify-center w-full">
                {loading && <div className="text-center text-gray-500">Carregando impacto...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 justify-center gap-5">
                        {cards.map((card) => (
                            <ImpactoCard key={card.Id} Imagem={card.Imagem} Descricao={card.Descricao} />
                        ))}
                    </div>
                )}

                <div className="flex text-sm text-gray-800 justify-center w-full">
                    <p className="flex flex-col max-w-xl text-center">Continue compartilhando conhecimento e oportunidades. Cada nova indicação é um passo a mais para um futuro melhor!</p>
                </div>
            </div>
        </div>
    );
}