// ==========================================
// STICKERCURRENCY
// Conversor + Sistema de Pegatinas
// ==========================================


// Tasas de ejemplo
// Todas están expresadas tomando USD como referencia.

const rates = {
    USD: 1,
    ARS: 1176.47,
    EUR: 0.85,
    GBP: 0.74,
    BRL: 5.40
};


// Elementos del HTML

const amountInput = document.getElementById("amount");

const fromCurrency = document.getElementById("fromCurrency");

const toCurrency = document.getElementById("toCurrency");

const convertButton = document.getElementById("convertButton");

const resultValue = document.getElementById("resultValue");

const operation = document.getElementById("operation");

const stickerPreview = document.getElementById("stickerPreview");

const newStickerText = document.getElementById("newStickerText");

const stickerCollection =
    document.getElementById("stickerCollection");

const stickerCount =
    document.getElementById("stickerCount");


// Colección de pegatinas

let stickers = [];


// Emojis de cada moneda

const flags = {
    ARS: "🇦🇷",
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    BRL: "🇧🇷"
};


// ==========================================
// FUNCIÓN PARA CONVERTIR
// ==========================================

function convertCurrency() {

    const amount = parseFloat(amountInput.value);

    const from = fromCurrency.value;

    const to = toCurrency.value;


    // Comprobamos que el usuario haya ingresado un número

    if (isNaN(amount) || amount <= 0) {

        alert("Ingresá un monto válido.");

        return;
    }


    /*
        Primero convertimos la moneda de origen
        a USD.

        Después convertimos USD
        a la moneda de destino.
    */

    const amountInUSD = amount / rates[from];

    const result = amountInUSD * rates[to];


    // Mostrar resultado

    resultValue.textContent =
        `${formatNumber(result)} ${to}`;


    operation.textContent =
        `(${formatNumber(amount)} ${from} = ${formatNumber(result)} ${to})`;


    // Crear automáticamente la pegatina

    createSticker(result, to);
}


// ==========================================
// FORMATO DE NÚMEROS
// ==========================================

function formatNumber(number) {

    return number.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


// ==========================================
// CREAR PEGATINA
// ==========================================

function createSticker(value, currency) {

    const sticker = {

        currency: currency,

        value: value

    };


    // Guardamos la pegatina

    stickers.push(sticker);


    // Actualizamos la pantalla

    updateNewSticker(sticker);

    updateCollection();

}


// ==========================================
// MOSTRAR NUEVA PEGATINA
// ==========================================

function updateNewSticker(sticker) {

    stickerPreview.innerHTML = `
        <span>${flags[sticker.currency]}</span>

        <strong>${sticker.currency}</strong>

        <small>
            ${formatNumber(sticker.value)}
        </small>
    `;


    newStickerText.textContent =
        `${sticker.currency} - ${formatNumber(sticker.value)}`;

}


// ==========================================
// ACTUALIZAR COLECCIÓN
// ==========================================

function updateCollection() {

    stickerCollection.innerHTML = "";


    /*
        Agrupamos las pegatinas por moneda.
        Si convertís varias veces a USD,
        aumenta la cantidad de esa pegatina.
    */

    const grouped = {};


    stickers.forEach(sticker => {

        if (!grouped[sticker.currency]) {

            grouped[sticker.currency] = {

                value: sticker.value,

                quantity: 0

            };

        }

        grouped[sticker.currency].quantity++;

    });


    // Creamos las tarjetas

    Object.entries(grouped).forEach(
        ([currency, data]) => {

            const card =
                document.createElement("div");

            card.className = "sticker-card";


            card.innerHTML = `

                <div class="sticker">

                    <span>
                        ${flags[currency]}
                    </span>

                    <strong>
                        ${currency}
                    </strong>

                    <small>
                        ${formatNumber(data.value)}
                    </small>

                </div>

                <p>
                    ${getCurrencyName(currency)}
                </p>

                <span class="quantity">
                    x${data.quantity}
                </span>

            `;


            stickerCollection.appendChild(card);

        }
    );


    // Actualizar contador

    stickerCount.textContent = stickers.length;

}


// ==========================================
// NOMBRE DE LAS MONEDAS
// ==========================================

function getCurrencyName(currency) {

    const names = {

        ARS: "Peso Argentino",

        USD: "Dólar Estadounidense",

        EUR: "Euro",

        GBP: "Libra Esterlina",

        BRL: "Real Brasileño"

    };

    return names[currency];

}


// ==========================================
// BOTÓN CONVERTIR
// ==========================================

convertButton.addEventListener(
    "click",
    convertCurrency
);


// ==========================================
// CONVERTIR AL PRESIONAR ENTER
// ==========================================

amountInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            convertCurrency();

        }

    }
);
