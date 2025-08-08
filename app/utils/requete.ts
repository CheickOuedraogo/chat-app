import axios from "axios";

const base_url = "https://chat-backend-wheat.vercel.app";

const connexion_endpoint = "/api/user/connexion";
const inscription_endpoint = "/api/user";

interface connexionProps {
  email: String;
  password: String;
}

interface inscriptionProps {
  nom: String;
  prenom: String;
  username: String;
  email: String;
  password: String;
}
async function connexion(props: connexionProps): Promise<String> {
  if (!props.email || props.email.trim().length === 0) return "Email maquant";
  if (!props.password || props.password.trim().length === 0)
    return "Mot de passe maquant";
  const result = await axios
    .post(`${base_url}${connexion_endpoint}`, {
      email: props.email,
      password: props.password,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return "connexion reussi";
}

async function inscription(props: inscriptionProps): Promise<String> {
  if (!props.nom || props.nom.trim().length === 0)
    return "nom maquant";
  if (!props.prenom || props.prenom.trim().length === 0) return "prenom maquant";
  if (!props.username || props.username.trim().length === 0)
    return "username maquant";
  if (!props.email || props.email.trim().length === 0) return "Email maquant";
  if (!props.password || props.password.trim().length === 0)
    return "Mot de passe maquant";
  const result = await axios
    .post(`${base_url}${inscription_endpoint}`, {
      nom: props.nom,
      prenom: props.prenom,
      username: props.username,
      email: props.email,
      password: props.password,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return "connexion reussi";
}

async function connexiontest(): Promise<String> {
  const result = await axios
    .post(`${base_url}${connexion_endpoint}`, {
      email: "hceick77@gmail.com",
      password: "1234",
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return "connexion reussi";
}


async function inscriptionTest(): Promise<String> {
  const result = await axios
    .post(`${base_url}${inscription_endpoint}`, {
      nom: "cheick",
      prenom: "ouedraogo",
      username: "checik07",
      email: "hceick77@gmail.com",
      password: "1234",
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return "connexion reussi";
}

console.log(inscriptionTest());
