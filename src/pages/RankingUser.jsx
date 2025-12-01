import { useState, useEffect } from "react";
import Ranking from "../components/admin/Ranking"; // ou ajuste o caminho correto
import api from "../services/api";

export default function RankingUser() {
  const [activeTab, setActiveTab] = useState("Diário");
  const [rankingData, setRankingData] = useState([]);
  const tabs = ["Diário", "Semanal", "Mensal", "Todos"];

  useEffect(() => {
    const carregarRanking = async () => {
      try {
        const endpoint = `/ranking/${activeTab
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")}`;
        
        const res = await api.get(endpoint);
        setRankingData(res.data?.data ?? res.data ?? []);
      } catch (err) {
        console.error("Erro ao carregar ranking:", err);
        setRankingData([]);
      }
    };

    carregarRanking();
  }, [activeTab]);

  return (
    <div className="flex flex-col m-5">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Ranking
        </h1>
        <p className="text-gray-600 mt-2">Visualize sua posição no ranking</p>
      </div>

      <Ranking
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        data={rankingData}
      />
    </div>
  );
}
