import { Users, CheckCircle, Wallet, TrendingUp } from "lucide-react";

export default function CardResumo({ valor, titulo, icon, color }) {
  const icons = {
    usuarios: <Users size={24} />,
    indicacoes: <CheckCircle size={24} />,
    saques: <Wallet size={24} />,
    renda: <TrendingUp size={24} />,
  };

  const colorStyles = {
    blue: "bg-blue-500",
    green: "bg-green-500", 
    yellow: "bg-yellow-500",
    purple: "bg-purple-500"
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4 group hover:-translate-y-1">
      
      <div className={`p-3 rounded-xl ${colorStyles[color]} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icons[icon]}
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900">{valor}</p>
        <span className="text-gray-600 text-sm font-medium">{titulo}</span>
      </div>

    </div>
  );
}