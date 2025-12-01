import { useState, useEffect, useContext } from "react";
import { BsPerson } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { alterarAdmin } from "../../services/userService";
import { AuthContext } from "../../services/authContext";

export default function FormDadosPessoaisAdmin() {
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nome: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        const local = stored ? JSON.parse(stored) : null;
        const initial = user ?? local;

        if (initial) {
            setFormData({
                nome: initial.nome ?? "",
                email: initial.email ?? ""
            });
        }
    }, [user]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user?.id) {
            alert("Erro: Usuário não encontrado.");
            return;
        }

        setLoading(true);
        try {
            const payload = { nome: formData.nome, email: formData.email };
            const response = await alterarAdmin(user.id, payload);
            
            const updated = response?.data ?? response ?? {};
            const newUser = {
                ...user,
                ...updated,
                nome: updated.nome ?? formData.nome,
                email: updated.email ?? formData.email,
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            if (setUser) setUser(newUser);
            
            setHasChanges(false);
            alert("Dados alterados com sucesso!");
        } catch (error) {
            alert(error.message || "Não foi possível alterar os dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <BsPerson className="text-xl text-blue-600" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Dados Pessoais</h2>
                    <p className="text-gray-600 text-sm">Atualize suas informações de contato</p>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Nome Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Nome completo
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => handleChange("nome", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                            placeholder="Seu nome completo"
                        />
                        <LuPencil className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        E-mail
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                            placeholder="seu@email.com"
                        />
                        <LuPencil className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={!hasChanges || loading}
                        className={`px-8 py-3 rounded-xl font-medium transition-all ${
                            hasChanges && !loading
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Salvando...
                            </div>
                        ) : (
                            "Salvar Alterações"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}