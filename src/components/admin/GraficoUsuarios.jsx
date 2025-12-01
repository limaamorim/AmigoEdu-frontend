import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import api from "../../services/api";

export default function GraficoUsuarios() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/usuarios");
        const users = res.data;

        const meses = {};
        users.forEach(u => {
          if (u.criado_em) {
            const mes = new Date(u.criado_em).getMonth();
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
        <h3 className="text-xl font-bold text-gray-800">Novos Usuários</h3>
        
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
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
          <Line 
            dataKey="total" 
            type="monotone" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={{ r: 6, fill: "#1d4ed8" }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}