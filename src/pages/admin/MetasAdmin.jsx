import { useEffect, useState } from "react";
import api from "../../services/api";
import MetaCardCriar from "../../components/admin/MetaCardCriar";
import FormCriarMeta from "../../components/admin/FormCriarMeta";
import ListaMetas from "../../components/admin/ListaMetas";

export default function MetasAdmin() {
  const [metas, setMetas] = useState([]);
  const [mostrandoForm, setMostrandoForm] = useState(false);
  const [metaEditando, setMetaEditando] = useState(null);

  async function carregarMetas() {
    const res = await api.get("/metas");
    setMetas(res.data || []);
  }

  useEffect(() => {
    carregarMetas();
  }, []);

  function abrirFormularioCriar() {
    setMetaEditando(null);
    setMostrandoForm(true);
  }

  function abrirFormularioEditar(meta) {
    setMetaEditando(meta);
    setMostrandoForm(true);
  }

  function atualizarLista() {
    carregarMetas();
    setMostrandoForm(false);
    setMetaEditando(null);
  }

  return (
    <div className="p-0 w-full pb-0 md:pb-10">

      {/* Título da página */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Criar metas
        </h1>
        <p className="text-gray-600 mt-2">Crie metas estratégicas para alcançar seus objetivos</p>
      </div>

      {/* Card criar meta ou formulário */}
      <div className="flex w-full justify-center py-4">
        {!mostrandoForm ? (
          <MetaCardCriar onAbrirFormulario={abrirFormularioCriar} />
        ) : (
          <FormCriarMeta
            metaParaEditar={metaEditando}
            onSucesso={atualizarLista}
            onCancelar={() => setMostrandoForm(false)}
          />
        )}
      </div>

      {/* Lista */}
      <ListaMetas
        metas={metas}
        onAtualizarLista={carregarMetas}
        onEditar={abrirFormularioEditar}
      />
    </div>
  );
}
