const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// libera acesso do GitHub Pages
app.use(cors());

const PORT = process.env.PORT || 3000;

// rota dos jogos
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
    res.status(500).json({ erro: "Erro ao buscar jogos" });
  }
});

app.listen(PORT, () => {
  console.log("Bot rodando na porta " + PORT);
});
