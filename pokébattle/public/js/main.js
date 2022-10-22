const urlSearchPokemon = "https://pokeapi.co/api/v2/pokemon/?limit=1000";


fetch(urlSearchPokemon)
    .then(response => response.json())
    .then(data => displayPokemonList(data));




//affichage de la liste des pokémons dans le select
function displayPokemonList(data) {
    const select = document.getElementById("pokemon-list");
    data.results.forEach(pokemon => {
        const option = document.createElement("option");
        option.value = pokemon.name;
        //si le nom du pokémon contient un tiret, on le remplace par un espace
        option.textContent = pokemon.name.replace("-", " ");
       //recuperation de l'option dans le select
        select.appendChild(option);
    });   
    
}


//recuperation des parametres de l'url
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const pokemon = urlParams.get("pokemon");   
console.log(username, pokemon);

//requette dans l'api avec le nom du pokémon sélectionné
const selectedPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
fetch(selectedPokemon)
    .then(response => response.json())
    .then(data => displayPokemon(data));

//affichage du sprite back du pokémon
function displayPokemon(data) {
    const sprite = document.getElementById("player-sprite");
    sprite.src = data.sprites.back_default;
    sprite.alt = data.name;

    //affichage du nom du pokémon
    const name = document.getElementById("pokemon-name");
    name.textContent = data.name;

    //affichage des stats du pokémon chiffre/chiffre
    const hp = document.getElementById("hp");

}









