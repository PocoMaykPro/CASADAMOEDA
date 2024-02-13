const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

const url = "https://v6.exchangerate-api.com/v6/765c3f40de7346cfad665999/latest/USD";

const fetchExchangeRates = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.conversion_rates;
    } catch (error) {
        console.error("Erro ao buscar taxas de câmbio:", error);
        return null;
    }
}

const convertValues = async () => {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueConverted = document.querySelector(".currency-value");

    const exchangeRates = await fetchExchangeRates();

    if (!exchangeRates) {
        console.error("Falha ao buscar as taxas de câmbio");
        return;
    }

    const selectedCurrency = currencySelect.value;

    if (selectedCurrency in exchangeRates) {
        const exchangeRate = exchangeRates[selectedCurrency];
        const convertedValue = inputCurrencyValue * exchangeRate;

        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: selectedCurrency.toUpperCase()
        }).format(convertedValue);
    } else {
        console.error("Moeda selecionada não encontrada nas taxas de câmbio");
        // Aqui você pode lidar com a situação de moeda não encontrada, se necessário
    }
}

const changeCurrency = () => {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    const currencyOptions = {
        "dolar-usd": { name: "Dólar americano", img: "./assents/dolar.png" },
        "euro-eur": { name: "Euro", img: "./assents/euro.png" },
        "libra-gbp": { name: "Libra", img: "./assents/libra.png" },
        "iene-jpy": { name: "Iene", img: "./assents/iene.png" },
        "dolar-cad": { name: "Dólar Canadense", img: "./assents/dolarcad.png" },
        "franco-chf": { name: "Franco Suiço", img: "./assents/franco.png" },
        "dolar-aud": { name: "Dólar Australiano", img: "./assents/dolaraud.png" },
        "iuan-cny": { name: "Iuan Chinês", img: "./assents/iuan.png" },
        "dolar-sgd": { name: "Dólar de Singapura", img: "./assents/dolarsgd.png" },
        "dolar-hkd": { name: "Dólar Hong Kong", img: "./assents/dolarhkd.png" },
        "bitcoin": { name: "Bit Coin", img: "./assents/bitcoin.png" }
    };

    const selectedCurrency = currencySelect.value;
    const { name, img } = currencyOptions[selectedCurrency];

    currencyName.innerHTML = name;
    currencyImage.src = img;
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
