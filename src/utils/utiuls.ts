const formatarCPF = (cpf: string): string => {
  // Verifica se a string tem exatamente 11 caracteres (apenas números)
  if (!/^\d{11}$/.test(cpf)) {
    throw new Error("O CPF deve conter exatamente 11 números.");
  }

  // Aplica a formatação usando regex
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

function formatarTelefone(telefone: string): string {
  // Verifica se a string contém apenas números e tem 10 ou 11 dígitos
  if (!/^\d{10,11}$/.test(telefone)) {
    throw new Error("O telefone deve conter 10 ou 11 números.");
  }

  // Aplica a formatação dependendo se o telefone tem 10 ou 11 dígitos
  if (telefone.length === 11) {
    // Formato (00) 00000-0000
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    // Formato (00) 0000-0000
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
}

export { formatarCPF, formatarTelefone };
