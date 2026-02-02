const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/jogos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": "5f90e827fcf1fd44fc9b3ebeea94517c"
        }
      }
    );

    const jogos = response.data.response.map(jogo => ({
      casa: jogo.teams.home.name,
      fora: jogo.teams.away.name,
      minuto: jogo.fixture.status.elapsed
    }));

    res.json(jogos);
  } catch (err) {
    console.log("Falha na API externa");
    res.json([]); // comportamento correto
  }
});

app.listen(PORT, () => {
  console.log("Bot rodando na porta " + PORT);
});
