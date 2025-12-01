import  { useEffect, useState } from "react";
import api from "../../services/api";
import Busca from "../../components/admin/Busca";
import GerenciarUsuario from "../../components/admin/UsuariosGerenciar";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function UsuariosGerenciarPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);


  const buscaDebounced = useDebounce(busca, 300);


  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    carregarUsuarios();
  }, []);


  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome?.toLowerCase().includes(buscaDebounced.toLowerCase()) ||
    u.email?.toLowerCase().includes(buscaDebounced.toLowerCase()) ||
    u.id.toString().includes(buscaDebounced) ||
    u.cpf?.toLowerCase().includes(buscaDebounced.toLowerCase())
  );


  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Gerenciar Usuários
        </h1>
        <p className="text-gray-600 mt-2">Visualize e controle todas as informações dos usuários</p>
      </div>

      <div className="flex justify-center mt-2">
        <Busca value={busca} onChange={setBusca} />
      </div>

      {loading ? (
        <p className="text-center mt-10 text-lg">Carregando usuários...</p>
      ) : usuariosFiltrados.length === 0 ? (
        <p className="mt-5 opacity-60 text-center text-[16px]">
          Nenhum usuário encontrado...
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full mx-auto">
          {usuariosFiltrados.map((u) => (
            <GerenciarUsuario
              key={u.id}
              usuario={u}
              onAtualizarLista={carregarUsuarios}
            />
          ))}
        </div>
      )}
    </div>
  );
}