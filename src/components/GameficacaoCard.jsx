import { FaTrophy, FaBullseye, FaUserAlt } from "react-icons/fa";

export default function GameficacaoCard({ nivel, metasBatidas, rankingPosicao }) {
  return (
    <div className="w-full h-[300px] bg-white rounded-3xl shadow-lg p-6 flex flex-col gap-6 border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-800">Sua Gamificação ⭐</h2>

      <div className="grid grid-cols-3 gap-4 text-center h-full">

        {/* Nivel */}
        <div className="rounded-2xl p-5 flex flex-col items-center justify-center 
          bg-gradient-to-b from-sky-50 to-sky-100 shadow-sm 
          hover:shadow-md hover:scale-[1.03] transition">
          
          <FaUserAlt className="text-sky-600 text-5xl drop-shadow-md" />

          <span className="text-gray-600 mt-2 text-lg font-medium">
            Nível
          </span>

          <span className="text-sky-700 text-4xl font-extrabold">
            {nivel ?? 0}
          </span>
        </div>

        {/* Metas Batidas */}
        <div className="rounded-2xl p-5 flex flex-col items-center justify-center 
          bg-gradient-to-b from-lime-50 to-lime-100 shadow-sm 
          hover:shadow-md hover:scale-[1.03] transition">
          
          <FaBullseye className="text-lime-600 text-5xl drop-shadow-md" />

          <span className="text-gray-600 mt-2 text-lg font-medium">
            Metas
          </span>

          <span className="text-lime-700 text-4xl font-extrabold">
            {metasBatidas ?? 0}
          </span>
        </div>

        {/* Ranking */}
        <div className="rounded-2xl p-5 flex flex-col items-center justify-center 
          bg-gradient-to-b from-amber-50 to-amber-100 shadow-sm 
          hover:shadow-md hover:scale-[1.03] transition">

          <FaTrophy className="text-amber-500 text-5xl drop-shadow-md" />

          <span className="text-gray-600 mt-2 text-lg font-medium">
            Ranking
          </span>

          <span className="text-amber-700 text-4xl font-extrabold">
            {rankingPosicao ? `#${rankingPosicao}` : "-"}
          </span>
        </div>

      </div>
    </div>
  );
}
