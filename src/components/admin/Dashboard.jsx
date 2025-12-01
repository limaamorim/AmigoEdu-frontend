// src/components/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import CardResumo from "./CardResumo";

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [indicacoesValidas, setIndicacoesValidas] = useState(0);
  const [saques, setSaques] = useState(0);
  const [rendaTotal, setRendaTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/usuarios");
        const data = Array.isArray(res.data) ? res.data : [];
        setUsuarios(data);

        const indicacoesCount = data.filter(u => u.gamificacao?.pontos >= 10).length;
        const saquesCount = data.filter(u => u.gamificacao?.metas_batidas > 0).length;
        const renda = data.reduce((acc, u) => acc + ((u.gamificacao?.pontos || 0) * 10), 0);

        setIndicacoesValidas(indicacoesCount);
        setSaques(saquesCount);
        setRendaTotal(renda);

      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-600">Carregando dashboard...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

      <CardResumo 
        valor={usuarios.length}
        titulo="Usuários cadastrados"
        icon="usuarios"
        color="blue"
      />

      <CardResumo 
        valor={indicacoesValidas}
        titulo="Indicações válidas"
        icon="indicacoes"
        color="green"
      />

      <CardResumo 
        valor={saques}
        titulo="Saques solicitados"
        icon="saques"
        color="purple"
      />

      <CardResumo 
        valor={`R$ ${rendaTotal}`}
        titulo="Renda total gerada"
        icon="renda"
        color="yellow"
      />

    </div>
  );
}
