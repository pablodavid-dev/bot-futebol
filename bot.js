const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// permite acessar index.html
app.use(express.static(__dirname));

// rota que devolve os jogos ao vivo em JSON
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

// sobe o servidor
app.listen(PORT, () => {
  console.log(`🔥 Site rodando em http://localhost:${PORT}`);
});

app.use(express.static(__dirname));
