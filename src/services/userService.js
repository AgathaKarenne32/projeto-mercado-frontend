//////////////////////////////////////////////////////////////////
// simulação da API -> trocar pelo fetch ou axios mais tarde!!! //
//////////////////////////////////////////////////////////////////

const FAKE_USER = {
  id: "u_1", // usuário 1
  name: "João Paulo Santos",
  email: "joao.paulo@email.com",
};

export async function getMe() {
  // simula latencia ao pegar a informação
  await new Promise((r) => setTimeout(r, 200));
  return { ...FAKE_USER };
}

export async function updateProfile({ name, email }) {
  await new Promise((r) => setTimeout(r, 300));
  // aqui a gente chamaria a API de verdade
  return { ...FAKE_USER, name, email };
}

export async function changePassword({ current, next }) {
  await new Promise((r) => setTimeout(r, 300));
  // regra fake: senha atual precisa ser "123456"
  if (current !== "123456") {
    const err = new Error("Senha atual incorreta");
    err.code = "INVALID_PASSWORD";
    throw err;
  }
  return { ok: true };
}
