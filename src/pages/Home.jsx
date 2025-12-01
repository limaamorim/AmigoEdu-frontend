import { useContext, useState, useEffect } from 'react';
import Overview from '../components/Overview';
import Link from '../components/Link';
import { AuthContext } from '../services/authContext';
import GameficacaoCard from "../components/GameficacaoCard";
import api from '../services/api';

export default function Home() {
    const { user } = useContext(AuthContext)
    const [nome, setNome] = useState('');
    const [gamificacao, setGamificacao] = useState(null);
    const [posicaoRanking, setPosicaoRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setLoading(true);
                const userDataString = localStorage.getItem('user');

                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setNome(userData.nome);
                }

                if (user?.id) {
                    // Buscar gamificação
                    const gamificacaoResponse = await api.get(`/gamificacao/usuario/${user.id}`);
                    // resposta pode vir em resp.data.data ou resp.data
                    setGamificacao(gamificacaoResponse.data?.data ?? gamificacaoResponse.data ?? null);

                    // Buscar impacto (renda gerada)
                    const impactoResponse = await api.get(`/impactos/usuario/${user.id}`);

                    // Buscar ranking para obter posição
                    const rankingResponse = await api.get('/ranking/todos');
                    const usuarios = rankingResponse.data?.data ?? rankingResponse.data ?? [];

                    const userPos = usuarios.findIndex(u =>
                        u.usuario_id === user.id || u.id === user.id || u.usuario?.id === user.id
                    ) + 1;

                    setPosicaoRanking(userPos > 0 ? userPos : null);

                }
            } catch (err) {
                console.error('Erro ao carregar dados:', err);
                setErro('Não foi possível carregar os dados. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, [user]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    }

    if (erro) {
        return <div className="flex justify-center items-center h-screen text-gray-500">{erro}</div>;
    }

    return(
        <div className="flex flex-col gap-10 m-5 mb-30 md:mb-0 md:ml-0 justify-center">
        <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Olá, {nome}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Aqui está o resumo da sua plataforma</p>
      </div>
            <Link />
            <Overview />
            <GameficacaoCard
                nivel={gamificacao?.nivel ?? 0}
                metasBatidas={gamificacao?.metas_batidas ?? 0}
                rankingPosicao={posicaoRanking ?? 0}
            />
    
        </div>
    )
}