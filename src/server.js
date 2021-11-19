"use strict";

const { Axios, default: axios } = require("axios");
const express = require("express");

//express
const app = express();
const port = 3333;


app.get('/', (req, res) => {
    res.send('Hello World Take!')
  })
  
app.get("/repos", async (req, res) => {
  await axios.get('https://api.github.com/orgs/takenet/repos').then((response) => {
    let repos = response.data;

      const novo = repos.map((repo) =>{
        if(repo.language === 'C#' ){
          return {
            avatar_url: repo.owner.avatar_url,
            name: repo.name,
            description: repo.description
          }
        } 
      })
      .filter((x) => x)

    const ostres = novo.slice(0, 3) 
    res.send(ostres)
    
  })
});

// express porta
app.listen(port, () => {
  console.log(
    `RODANDO NO ENDEREÇO: http://localhost:${port}`
  );
});
