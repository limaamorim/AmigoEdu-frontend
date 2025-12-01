import { FaTrophy } from "react-icons/fa";

export default function Ranking({ tabs = [], activeTab, onChangeTab, data = [] }) {
  // Função para pegar medalha/top 3
  const getMedalColor = (index) => {
    if (index === 0) return "text-yellow-400"; // ouro
    if (index === 1) return "text-gray-400";   // prata
    if (index === 2) return "text-amber-700";  // bronze
    return "text-gray-500";
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* TABS */}
      <div className="flex gap-2 flex-wrap mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChangeTab(tab)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LISTA DO RANKING */}
      {data.length === 0 ? (
        <p className="text-gray-500">Nenhum usuário encontrado.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((usuario, index) => {
            const pontos = usuario.pontos ?? usuario.gamificacao?.pontos ?? 0;

            return (
              <div
                key={usuario.id ?? index}
                className="flex justify-between items-center p-4 bg-white rounded-3xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  {/* Medalha para top 3 */}
                  <FaTrophy className={`${getMedalColor(index)} text-2xl`} />
                  <span className="font-medium text-lg">
                    {index + 1}. {usuario.nome ?? usuario.usuario?.nome ?? "—"}
                  </span>
                </div>
                <span className="font-bold text-blue-600 text-lg">{pontos} pts</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
