import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import api from "../../services/api";

export default function GraficoIndicacao() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/indicacoes");
        const indicacoes = res.data;

        const meses = {};
        indicacoes.forEach(i => {
          if (i.data_indicacao) {
            const mes = new Date(i.data_indicacao).getMonth();
            meses[mes] = (meses[mes] || 0) + 1;
          }
        });

        const nomeMes = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
        setData(Object.keys(meses).map(m => ({ mes: nomeMes[m], total: meses[m] })));

      } catch (err) {
        console.error(err);
      }
    }
    carregar();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-80 w-full hover:shadow-lg transition-all duration-300">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Indicações por Mês</h3>
        
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
          <XAxis 
            dataKey="mes" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar 
            dataKey="total" 
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}