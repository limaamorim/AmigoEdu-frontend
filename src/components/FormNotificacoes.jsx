import { useState } from "react";
import { FaRegBell } from "react-icons/fa6";

export default function FormNotificacoes() {
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    promocoes: false,
    atualizacoes: true,
    novidades: true
  });

  const toggleNotificacao = (tipo) => {
    setNotificacoes(prev => ({
      ...prev,
      [tipo]: !prev[tipo]
    }));
  };

  const Switch = ({ enabled, onChange }) => (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
      onClick={onChange}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const ConfigItem = ({ title, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <Switch enabled={enabled} onChange={onToggle} />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2 bg-orange-50 rounded-lg">
          <FaRegBell className="text-xl text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notificações</h2>
          <p className="text-gray-600 text-sm">Controle como você recebe as notificações</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-1">
        <ConfigItem
          title="Notificações por E-mail"
          description="Receba atualizações sobre suas indicações e recompensas"
          enabled={notificacoes.email}
          onToggle={() => toggleNotificacao('email')}
        />
        
        <ConfigItem
          title="Promoções e Ofertas"
          description="Receba notificações sobre promoções especiais"
          enabled={notificacoes.promocoes}
          onToggle={() => toggleNotificacao('promocoes')}
        />
        
        <ConfigItem
          title="Atualizações do Sistema"
          description="Notificações sobre novas funcionalidades"
          enabled={notificacoes.atualizacoes}
          onToggle={() => toggleNotificacao('atualizacoes')}
        />
        
        <ConfigItem
          title="Novidades e Dicas"
          description="Receba dicas para melhorar suas indicações"
          enabled={notificacoes.novidades}
          onToggle={() => toggleNotificacao('novidades')}
        />
      </div>

      {/* Save Hint */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 text-center">
          As alterações são salvas automaticamente
        </p>
      </div>
    </div>
  );
}