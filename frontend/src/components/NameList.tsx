import React from "react";

interface NameListProps {
  names: { id: number; nome: string }[];
  onEdit: (name: string, id: number) => void;
  onDelete: (id: number) => void;
}

const NameList: React.FC<NameListProps> = ({ names, onEdit, onDelete }) => {
  return (
    <ul>
      {names.map((n) => (
        <li key={n.id}>
          {n.nome}
          <button onClick={() => onEdit(n.nome, n.id)}>Editar</button>
          <button onClick={() => onDelete(n.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default NameList;
