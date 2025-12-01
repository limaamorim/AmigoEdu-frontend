import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { register } from "../services/authService"; // Função que chama a API

// ==========================
// Máscaras CPF e Telefone
// ==========================

// Máscara CPF → 123.456.789-10
function maskCPF(value) {
  return value
    .replace(/\D/g, "") // remove tudo que não é número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14); // tamanho máximo
}

// Máscara Telefone → (81) 99999-9999
function maskTelefone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const usuario = { nome, data_nascimento, email, telefone, cpf, senha };
      const data = await register(usuario);

      alert("✅ Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      alert("❌ Erro ao cadastrar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: "#3D70B4" }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-3xl flex flex-col items-center">
        <Logo />

        <p className="text-[#3B5474] font-medium text-sm mt-2 mb-4 text-center">
          Preencha os campos a seguir:
        </p>

        <form
          onSubmit={handleCadastro}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
          <Input
            className="w-full"
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            className="w-full"
            type="date"
            placeholder="Data de nascimento"
            value={data_nascimento}
            onChange={(e) => setData_nascimento(e.target.value)}
          />

          <Input
            className="w-full"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 📌 TELEFONE com máscara */}
          <Input
            className="w-full"
            type="text"
            placeholder="Digite seu telefone"
            value={telefone}
            maxLength={15}
            onChange={(e) => setTelefone(maskTelefone(e.target.value))}
          />

          {/* 📌 CPF com máscara */}
          <Input
            className="w-full"
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            maxLength={14}
            onChange={(e) => setCpf(maskCPF(e.target.value))}
          />

          <Input
            className="w-full"
            type="password"
            placeholder="A senha deve ter pelo menos 6 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-between items-center mt-4 w-full gap-3">
            <span
              className="text-sm text-[#3D70B4] hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Retornar
            </span>

            <div className="w-full flex justify-center sm:w-auto">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
