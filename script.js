const pokedex = document.getElementById('pokedex')

const fetchPokemon = () => {

    const promises = [];
    for (let i = 1; i <= 151 ; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then(resp => resp.json()));
    };
    Promise.all(promises).then( results => {
          const pokemon = results.map((data) => 
          ({
                name: data.name,
                id: data.id,
                sprite: data.sprites["front_default"],
                type: data.types["0"].type.name,
                type2: data.types && data.types[1] && data.types[1].type && data.types[1].type.name
        }));
        displayPokemon(pokemon);
        
    });
};
fetchPokemon();

const displayPokemon = pokemon => {
    const pokemonHTMLString = pokemon
        .map(pokemon => {
            if (pokemon.type2) {
                return `
                <li class="card">
                    <img src="${pokemon.sprite}"/>
                    <div class="pokemon-info">
                        <p class="id">
                            <span class="number-prefix">#</span>
                            ${pokemon.id}
                        </p>
                        <h3 class="name">${pokemon.name}</h3>
                    </div>
                    <div class="typing">
                         <span class="${pokemon.type}">${pokemon.type}</span>
                    </div>
                    <div class="typing">
                        <span class="${pokemon.type2}">${pokemon.type2}</span>
                    </div>
                </li>`
            } else {
                return `
                <li class= "card">
                    <img src="${pokemon.sprite}"/>
                    <div class="pokemon-info">
                        <p class="id">
                            <span class="number-prefix">#</span>
                            ${pokemon.id}
                        </p>
                        <h3 class="name">${pokemon.name}</h3>
                    </div>
                    <div class ="typing">
                        <span class="${pokemon.type}">${pokemon.type}</span>
                    </div>
                </li>`
            }
        }).join("") 
        pokedex.innerHTML = pokemonHTMLString;
};

const namesAndIds = [];
const pokePromises = [];

for(let i = 1; i <= 151 ; i++){
    const names = [`https://pokeapi.co/api/v2/pokemon/${i}`];
    pokePromises.push(fetch(names).then((resp) =>  resp.json()));
}

Promise.all(pokePromises).then(results => {
     pokeInfo = results.map((data) => ({
        name: data.name,
        id: data.id,
        sprite: data.sprites["front_default"],
        type: data.types["0"].type.name,
        type2: data.types && data.types[1] && data.types[1].type && data.types[1].type.name
    }))
}).then(data => namesAndIds.push(...pokeInfo)); 

function displayMatches() {
    const searchInput = this.value;
    const filteredPokemon = namesAndIds.filter( data => {
       return data.name.includes(searchInput) || data.id.toString().match(searchInput)
    });
    displayPokemon(filteredPokemon)
};

const searchInput = document.getElementById('search')
const suggestions = document.querySelector('.search')

searchInput.addEventListener('keyup', displayMatches);
