const pokedex = document.getElementById('pokedex')


const fetchPokemon = () => {

    const promises = [];
    for (let i = 1; i <= 151 ; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then(resp => resp.json()).then((data) => data));
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
    console.log(pokemon);
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
                        <div class="typing">
                            <span class="${pokemon.type}">${pokemon.type}</span>
                        </div>
                        <div class="typing">
                            <span class="${pokemon.type}">${pokemon.type2}</span>
                        </div>
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
                        <div class ="typing">
                            <span class="${pokemon.type}">${pokemon.type}</span>
                        </div>
                    </div>
                </li>`
            }
        }).join("") 
        pokedex.innerHTML = pokemonHTMLString;
};