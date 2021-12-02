# Tech Challenge

## Features

- [x] Pesquisar filme
- [x] Adicionar filme aos favoritos
- [x] Listar Filmes Favoritos
- [x] Deltar Filme dos favoritos


### 🎲 Rodando o Back-End 

```bash

# Clone este repositório
$ git clone <https://github.com/Math2121/tech-challenge.git>
 

# Instale as dependências
$ yarn 

# Execute o conmando para baixar o redis a partir de uma imagem no docker
$ docker run --name redis -p 6379:6379 -d -t redis:alpine

# Execute o container
$ docker start redis

# Execute o conmando caso queira visualizar o cache de pesquisa
$ docker run --name redis-client -v redisinsight:/db -p -t redislabs/redisinsight:latest

# Execute o container
$ docker start redis-client


# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3333>
```

### Utilizando os endpoints

## Pesquisa - (POST) http://localhost:3000/search

+ Request (application/json)

    + Body

            {
               "name":"superman"
            }

+ Response 200 (application/json)

    + Body

            Search": [
            {
                "Title": "Batman v Superman: Dawn of Justice",
                "Year": "2016",
                "imdbID": "tt2975590",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            },
            {
                "Title": "Superman Returns",
                "Year": "2006",
                "imdbID": "tt0348150",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
            },
            ]



## Adcionar aos Favoritos - (POST) http://localhost:3000/favorites-movies

+ Request (application/json)

    + Body

            {
               "imdbID":"tt0372784"
            }

+ Response 204 



## Listar  Favoritos - (GET) http://localhost:3000/favorites-movies

+ Response 200

    
        [
            {
                "id": "3b738189-89e0-459e-9511-22742618cc97",
                "title": "Batman Begins",
                "year": "2005",
                "imdbID": "tt0372784"
            }
        ]


## Deletar  Favorito - (DELETE) http://localhost:3000/favorites-movies/:id

+ Response 204

    
      
