import SaqueButton from "./SaqueButton";
import api from "../services/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../services/authContext";

export default function Overview() {
  const { user } = useContext(AuthContext);

  const [overviewData, setOverviewData] = useState({
    saldoAcumulado: "0,00",
    indicacoesValidas: 0,
    metasBatidas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // formata renda para BR: aceita number ou string com ponto/virgula
  function formatCurrencyBR(value) {
    if (value === null || value === undefined || value === "") return "0,00";
    let num = typeof value === "number" ? value : Number(String(value).replace(",", "."));
    if (Number.isNaN(num)) return String(value);
    return num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  useEffect(() => {
    let mounted = true;

    async function loadOverview() {
      if (!user?.id) {
        if (mounted) {
          setErro("Usuário não autenticado");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setErro(null);

      try {
        const [resUsuario, resImpacto] = await Promise.all([
          api.get(`/usuarios/${user.id}`),
          api.get(`/impactos/usuario/${user.id}`),
        ]);

        if (!mounted) return;

        const metas_batidas = resUsuario?.data?.gamificacao.metas_batidas ?? 0;
        const renda = resImpacto?.data?.renda ?? 0;
        const indicacoes_count = resImpacto?.data?.impacto.indicacoes_count ?? 0;

        setOverviewData({
          saldoAcumulado: formatCurrencyBR(renda),
          indicacoesValidas: Number(indicacoes_count) || 0,
          metasBatidas: Number(metas_batidas) || 0,
        });
      } catch (err) {
        console.error("Erro ao carregar overview:", err);
        if (!mounted) return;
        setErro(
          err?.response?.data?.message ||
            err?.response?.data ||
            err?.message ||
            "Erro desconhecido"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadOverview();

    return () => {
      mounted = false;
    };
  }, [user]);

  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div className="flex gap-4 md:gap-10 w-full justify-center items-center flex-wrap">
      <div className="flex w-full md:w-auto gap-8 justify-center items-center bg-white py-7 px-9 rounded-3xl shadow-sm hover:shadow-lg transition">
        <div className="flex flex-col items-center">
          <span className="font-medium text-3xl">
            {loading ? "—" : `R$ ${overviewData.saldoAcumulado}`}
          </span>
          <h1 className="text-sky-800 text-base text-center font-semibold">Saldo acumulado</h1>
        </div>
        <SaqueButton />
      </div>

      <div className="flex flex-col w-full md:w-auto justify-center bg-white py-7 px-9 rounded-2xl items-center shadow hover:shadow-lg transition">
        <span className="font-medium text-3xl">
          {loading ? "—" : overviewData.indicacoesValidas}
        </span>
        <h1 className="text-sky-800 text-base font-semibold">Indicações válidas</h1>
      </div>

      <div className="flex flex-col w-full md:w-auto justify-center bg-white py-7 px-9 rounded-2xl items-center shadow hover:shadow-lg transition">
        <span className="font-medium text-3xl">{loading ? "—" : overviewData.metasBatidas}</span>
        <h1 className="text-sky-800 text-base font-semibold">Metas batidas</h1>
      </div>

      {erro && (
        <div className="w-full mt-4 text-center text-red-600">
          Erro ao carregar dados: {String(erro)}
        </div>
      )}
    </div>
  );
}
