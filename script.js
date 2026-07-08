const API_KEY = "2b47c65905d8e5cf61770e6f5703d395";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const inputCidade = document.getElementById("inputCidade");
const btnBuscar   = document.getElementById("btnBuscar");
const card        = document.getElementById("card");
const erroDiv     = document.getElementById("erro");

btnBuscar.addEventListener("click", () => {
  const cidade = inputCidade.value.trim();
  if (cidade) buscarClima(cidade);
});

inputCidade.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const cidade = inputCidade.value.trim();
    if (cidade) buscarClima(cidade);
  }
});

async function buscarClima(cidade) {
  try {
    card.style.display    = "none";
    erroDiv.style.display = "none";

    const resposta = await fetch(
      `${API_URL}?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`
    );

    if (!resposta.ok) throw new Error("Cidade não encontrada");

    const dados = await resposta.json();
    exibirDados(dados);

  } catch (erro) {
    erroDiv.style.display = "block";
  }
}

function exibirDados(dados) {
  document.getElementById("nomeCidade").textContent  = dados.name;
  document.getElementById("pais").textContent        = dados.sys.country;
  document.getElementById("temperatura").textContent = `${Math.round(dados.main.temp)}°C`;
  document.getElementById("descricao").textContent   = dados.weather[0].description;
  document.getElementById("umidade").textContent     = `${dados.main.humidity}%`;
  document.getElementById("vento").textContent       = `${Math.round(dados.wind.speed * 3.6)} km/h`;
  document.getElementById("sensacao").textContent    = `${Math.round(dados.main.feels_like)}°C`;

  const icone = dados.weather[0].icon;
  document.getElementById("icone").src = 
    `https://openweathermap.org/img/wn/${icone}@2x.png`;

  card.style.display = "block";
}