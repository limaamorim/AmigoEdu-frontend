import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/authContext";
import Dashboard from "../../components/admin/Dashboard";
import GraficoUsuarios from "../../components/admin/GraficoUsuarios";
import GraficoIndicacao from "../../components/admin/GraficoIndicacao";

export default function VisaoGeral() {
  const { user } = useContext(AuthContext);
  const [nome, setNome] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setNome(userData.nome);
  }, [user]);

  return (
    <div className="flex flex-col gap-8 px-4 lg:px-0">

      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Olá, {nome}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Aqui está o resumo da sua plataforma</p>
      </div>

      <Dashboard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoUsuarios />
        <GraficoIndicacao />
      </div>

    </div>
  );
}