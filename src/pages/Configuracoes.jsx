import FormDadosPessoais from "../components/FormDadosPessoais";
import FormNotificacoes from "../components/FormNotificacoes";

export default function Configuracoes() {
    return (
        <div className="flex flex-col gap-5 m-5 mb-30 md:m-0 md:mr-5 md:mb-0 justify-center">
            <div className="border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Configuração
            </h1>
          <p className="text-gray-600 mt-2">Visualize seus dados</p>
            </div>
            <div className="flex flex-col gap-5">
                <FormDadosPessoais />
                <FormNotificacoes />
            </div>
        </div>
    );
}