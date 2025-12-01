import FormDadosPessoais from "../../components/admin/FormDadosPessoaisAdmin";
import FormNotificacoes from "../../components/FormNotificacoes";

export default function Configuracoes() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-6">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Configurações
                </h1>
                <p className="text-gray-600 mt-2">Atualize seus dados</p>
            </div>

            {/* Forms */}
            <div className="flex flex-col gap-6">
                <FormDadosPessoais />
                <FormNotificacoes />
            </div>
        </div>
    );
}