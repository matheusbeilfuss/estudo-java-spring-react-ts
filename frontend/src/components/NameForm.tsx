import React, { useState, useEffect } from "react";

interface NameFormProps {
  onAdd: (name: string) => void;
  onEdit: (name: string, index: number) => void;
  editName: string;
  editIndex: number | null;
}

const NameForm: React.FC<NameFormProps> = ({
  onAdd,
  onEdit,
  editName,
  editIndex,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editName) {
      setName(editName);
    }
  }, [editName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      onEdit(name, editIndex);
    } else {
      onAdd(name);
    }
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite um nome"
      />
      <button type="submit">
        {editIndex !== null ? "Editar" : "Adicionar"}
      </button>
    </form>
  );
};

export default NameForm;
