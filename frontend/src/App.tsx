import React, { useEffect, useState } from "react";
import NameForm from "./components/NameForm";
import NameList from "./components/NameList";
import { fetchNames, deleteName } from "./services/api";

interface Nome {
  id: number;
  nome: string;
}

const App: React.FC = () => {
  const [nomes, setNomes] = useState<Nome[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novoNome, setNovoNome] = useState<string>("");

  useEffect(() => {
    const getNames = async () => {
      const namesFromAPI = await fetchNames();
      setNomes(namesFromAPI);
    };
    getNames();
  }, []);

  const adicionarNome = async (nome: string) => {
    const response = await fetch("http://localhost:8080/nomes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });
    const novoNome = await response.json();
    setNomes([...nomes, novoNome]);
  };

  const atualizarNome = async (nome: string, id: number) => {
    await fetch(`http://localhost:8080/nomes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    setNomes(nomes.map((n) => (n.id === id ? { ...n, nome } : n)));
    setEditandoId(null);
  };

  const excluirNome = async (id: number) => {
    await deleteName(id);
    setNomes(nomes.filter((n) => n.id !== id));
  };

  return (
    <div className="container">
      <h1>Lista de Nomes</h1>
      <NameForm
        onAdd={adicionarNome}
        onEdit={atualizarNome}
        editName={novoNome}
        editIndex={editandoId}
      />
      <NameList
        names={nomes}
        onEdit={(nome, id) => {
          setEditandoId(id);
          setNovoNome(nome);
        }}
        onDelete={excluirNome}
      />
    </div>
  );
};

export default App;
