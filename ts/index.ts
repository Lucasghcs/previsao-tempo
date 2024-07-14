const form = document.querySelector("#search > form");
const input: HTMLInputElement | null = document.querySelector("#localizacao");

const sectionTempoInfo = document.querySelector("#tempo-info")

form?.addEventListener("submit", async (event) => {
    event.preventDefault()

    if (!input || !sectionTempoInfo) return;

    const localizacao = input.value;

    if(localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras.");
        return;
    }

    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=158f6fd90b8247c273da159cf34eaaed&lang=pt_br&units=metric`)

    const dados = await resposta.json();

    console.log(dados);

    const info = {
        temperatura: Math.round(dados.main.temp),
        local:dados.name,
        icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    }

    sectionTempoInfo.innerHTML = `
                <div class="dados-tempo">
            <h2>${info.local}</h2>
            <span>${info.temperatura}ºC</span>
            </div>
            <img src="${info.icone}"/>`
});