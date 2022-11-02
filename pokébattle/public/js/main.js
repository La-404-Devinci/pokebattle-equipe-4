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
    .then(data => PokemonBattle(data));

//affichage du sprite back du pokémon
function PokemonBattle(data) {
    const sprite = document.getElementById("player-sprite");
    sprite.src = data.sprites.back_default;
    sprite.alt = data.name;

    //affichage du nom du pokémon
    const name = document.getElementById("pokemon-name");
    name.textContent = data.name;

    //affichage des pv du pokémon 64/100
    var hp = document.getElementById("hp");
    actualHp = data.stats[0].base_stat;
    hp.textContent = actualHp + " / " + data.stats[0].base_stat;

    //class hp-bar-fill ,  ajouter une width à 100% si actualHp = data.stats[0].base_stat mettre la couleur en vert
    var hpBar = document.getElementById("player-health-bar");
        hpBar.style.width = "100%";
        hpBar.style.backgroundColor = "#00FF00";//vert


    //affichage de quatre attaques du pokémon prise aléatoirement
    const attack1 = document.getElementById("attack1");
    const attack2 = document.getElementById("attack2");
    const attack3 = document.getElementById("attack3");
    const attack4 = document.getElementById("attack4");

    //recuperation des attaques du pokémon
    const attacks = data.moves;
    //recuperation des attaques aléatoirement
    const randomAttacks = [];
    for (let i = 0; i < 4; i++) {
        const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
        randomAttacks.push(randomAttack);
    }
    //affichage des attaques
    attack1.textContent = randomAttacks[0].move.name;
    attack2.textContent = randomAttacks[1].move.name;
    attack3.textContent = randomAttacks[2].move.name;
    attack4.textContent = randomAttacks[3].move.name;


    //pokemon sauvage
    const wildPokemonSprite = document.getElementById("wild-sprite");
    const wildPokemonName = document.getElementById("wild-name");


     //on récupère un pokémon sauvage aléatoire
    const randomWildPokemon = Math.floor(Math.random() * 1000);
    const wildPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomWildPokemon}`;
    fetch(wildPokemonUrl)
        .then(response => response.json())
        .then( wild_data => {
            wildPokemonSprite.src = wild_data.sprites.front_default;
            wildPokemonSprite.alt = wild_data.name;
            wildPokemonName.textContent = wild_data.name;
        //on récupère les attaques du pokémon sauvage
        const wildAttacks = wild_data.moves;
        //on récupère les attaques aléatoirement
        const randomWildAttacks = [];
        for (let i = 0; i < 4; i++) {
            const randomWildAttack = wildAttacks[Math.floor(Math.random() * wildAttacks.length)];
            randomWildAttacks.push(randomWildAttack);

            // à chaque fois qu'on clique sur une attaque 
            attack1.addEventListener("click", () => {
                narrator.textContent = `${data.name} utilise ${attack1.textContent} !`;
                //animation de l'attaque sur le sprite du pokémon du joueur
                sprite.classList.add("attack");
                wildPokemonSprite.classList.add("damaged");

                    //le pokémon du joueur attaque le pokémon sauvage
                    const damage = Math.floor(Math.random() * 10);
                    wildActualHp -= damage;
                    wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                    wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                    //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 2) {
                        wildHpBar.style.backgroundColor = "#FFA500";
                    }
                    //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 4) {
                        wildHpBar.style.backgroundColor = "#FF0000";
                    }
                    // les pv du pokémon sauvage ne peuvent pas être inférieurs à 0 , le sprite du pokémon sauvage disparait
                    if (wildActualHp <= 0) {
                        wildActualHp = 0;//on maintient les pv à 0
                        wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                        wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                        wildPokemonSprite.style.display = "none";
                        wildPokemonName.style.display = "none";
                        narrator.textContent = `${username} a gagné !`;
                        //redirection vers la page de victoire
                        setTimeout(() => {
                            window.location.href = `victory.html?username=${username}&pokemon=${pokemon}`;
                        }, 2000);

                    }
                        

                setTimeout(() => {
                    
                narrator.textContent = `${wildPokemonName.textContent} utilise ${randomWildAttacks[0].move.name} !`;
                 //animation de l'attaque sur le sprite du pokémon sauvage
                wildPokemonSprite.classList.add("attack");
                sprite.classList.add("damaged");

                    //le pokémon sauvage inflige des dégats
                    const wilddamage = Math.floor(Math.random() * 10);
                    actualHp -= wilddamage;
                    hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                    hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                    //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                    if (actualHp < data.stats[0].base_stat / 2) {
                        hpBar.style.backgroundColor = "#FFA500";
                    }
                    //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                    if (actualHp < data.stats[0].base_stat / 4) {
                        hpBar.style.backgroundColor = "#FF0000";
                    }
                    // les pv du pokémon ne peuvent pas être inférieurs à 0 , le sprite du pokémon disparait
                    if (actualHp <= 0) {
                        actualHp = 0;//on maintient les pv à 0
                        hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                        hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                        sprite.style.display = "none";
                        name.style.display = "none";
                        narrator.textContent = `${username} a perdu !`;
                        //redirection vers la page de défaite
                        setTimeout(() => {
                            window.location.href = `defeat.html?username=${username}&pokemon=${pokemon}`;
                        }, 2000);
                    }
                    

                }, 3000);
                setTimeout(() => {
                    narrator.textContent = `Choisis une attaque !`;
                }, 6000);
            });
            attack2.addEventListener("click", () => {
                narrator.textContent = `${data.name} utilise ${attack2.textContent} !`;
                //animation de l'attaque sur le sprite du pokémon du joueur
                sprite.classList.add("attack");
                wildPokemonSprite.classList.add("damaged");
                

                    //le pokémon du joueur attaque le pokémon sauvage
                    const damage = Math.floor(Math.random() * 10);
                    wildActualHp -= damage;
                    wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                    wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                    //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 2) {
                        wildHpBar.style.backgroundColor = "#FFA500";
                    }
                    //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 4) {
                        wildHpBar.style.backgroundColor = "#FF0000";
                    }
                    // les pv du pokémon sauvage ne peuvent pas être inférieurs à 0 , le sprite du pokémon sauvage disparait
                    if (wildActualHp <= 0) {
                        wildActualHp = 0;//on maintient les pv à 0
                        wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                        wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                        wildPokemonSprite.style.display = "none";
                        wildPokemonName.style.display = "none";
                        narrator.textContent = `${username} a gagné !`;
                        //redirection vers la page de victoire
                        setTimeout(() => {
                        window.location.href = `victory.html?username=${username}&pokemon=${pokemon}`;
                        }, 2000);

                        
                        
                    
                    }



                setTimeout(() => {
                    narrator.textContent = `${wildPokemonName.textContent} utilise ${randomWildAttacks[1].move.name} !`;
                    //animation de l'attaque sur le sprite du pokémon sauvage
                    wildPokemonSprite.classList.add("attack");
                    sprite.classList.add("damaged");

                        //le pokémon sauvage inflige des dégats
                        const wilddamage = Math.floor(Math.random() * 10);
                        actualHp -= wilddamage;
                        hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                        hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                        //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                        if (actualHp < data.stats[0].base_stat / 2) {
                            hpBar.style.backgroundColor = "#FFA500";
                        }
                        //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                        if (actualHp < data.stats[0].base_stat / 4) {
                            hpBar.style.backgroundColor = "#FF0000";
                        }
                        // les pv du pokémon ne peuvent pas être inférieurs à 0 , le sprite du pokémon disparait
                        if (actualHp <= 0) {
                            actualHp = 0;//on maintient les pv à 0
                            hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                            hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                            sprite.style.display = "none";
                            name.style.display = "none";
                            narrator.textContent = `${username} a perdu !`;
                            //redirection vers la page de défaite
                            setTimeout(() => {
                                window.location.href = `defeat.html?username=${username}&pokemon=${pokemon}`;
                            }, 2000);
                        }
                    
                }, 3000);
                setTimeout(() => {
                    narrator.textContent = `Choisis une attaque !`;
                }, 6000);
            });
            attack3.addEventListener("click", () => {
                narrator.textContent = `${data.name} utilise ${attack3.textContent} !`;
                //animation de l'attaque sur le sprite du pokémon du joueur
                sprite.classList.add("attack");
                wildPokemonSprite.classList.add("damaged");

                    //le pokémon du joueur attaque le pokémon sauvage
                    const damage = Math.floor(Math.random() * 10);
                    wildActualHp -= damage;
                    wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                    wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                    //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 2) {
                        wildHpBar.style.backgroundColor = "#FFA500";
                    }
                    //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 4) {
                        wildHpBar.style.backgroundColor = "#FF0000";
                    }
                    // les pv du pokémon sauvage ne peuvent pas être inférieurs à 0 , le sprite du pokémon sauvage disparait
                    if (wildActualHp <= 0) {
                        wildActualHp = 0;//on maintient les pv à 0
                        wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                        wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                        wildPokemonSprite.style.display = "none";
                        wildPokemonName.style.display = "none";
                        narrator.textContent = `${username} a gagné !`;
                        //redirection vers la page de victoire
                        setTimeout(() => {
                        window.location.href = `victory.html?username=${username}&pokemon=${pokemon}`;
                        }, 2000);
                        
                    }

                setTimeout(() => {
                    narrator.textContent = `${wildPokemonName.textContent} utilise ${randomWildAttacks[2].move.name} !`;
                    //animation de l'attaque sur le sprite du pokémon sauvage
                    wildPokemonSprite.classList.add("attack");
                    sprite.classList.add("damaged");

                        //le pokémon sauvage inflige des dégats
                        const wilddamage = Math.floor(Math.random() * 10);
                        actualHp -= wilddamage;
                        hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                        hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                        //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                        if (actualHp < data.stats[0].base_stat / 2) {
                            hpBar.style.backgroundColor = "#FFA500";
                        }
                        //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                        if (actualHp < data.stats[0].base_stat / 4) {
                            hpBar.style.backgroundColor = "#FF0000";
                        }
                        // les pv du pokémon ne peuvent pas être inférieurs à 0 , le sprite du pokémon disparait
                        if (actualHp <= 0) {
                            actualHp = 0;//on maintient les pv à 0
                            hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                            hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                            sprite.style.display = "none";
                            name.style.display = "none";
                            narrator.textContent = `${username} a perdu !`;
                            //redirection vers la page de défaite
                            setTimeout(() => {
                                window.location.href = `defeat.html?username=${username}&pokemon=${pokemon}`;
                            }, 2000);
                        }
                    
                }, 3000);
                setTimeout(() => {
                    narrator.textContent = `Choisis une attaque !`;
                }, 6000);
            });
            attack4.addEventListener("click", () => {
                narrator.textContent = `${data.name} utilise ${attack4.textContent} !`;
                //animation de l'attaque sur le sprite du pokémon du joueur
                sprite.classList.add("attack");
                wildPokemonSprite.classList.add("damaged");

                    //le pokémon du joueur attaque le pokémon sauvage
                    const damage = Math.floor(Math.random() * 10);
                    wildActualHp -= damage;
                    wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                    wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                    //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 2) {
                        wildHpBar.style.backgroundColor = "#FFA500";
                    }
                    //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                    if (wildActualHp < wild_data.stats[0].base_stat / 4) {
                        wildHpBar.style.backgroundColor = "#FF0000";
                    }
                    // les pv du pokémon sauvage ne peuvent pas être inférieurs à 0 , le sprite du pokémon sauvage disparait
                    if (wildActualHp <= 0) {
                        wildActualHp = 0;//on maintient les pv à 0
                        wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
                        wildHpBar.style.width = (wildActualHp / wild_data.stats[0].base_stat) * 100 + "%";
                        wildPokemonSprite.style.display = "none";
                        wildPokemonName.style.display = "none";
                        narrator.textContent = `${username} a gagné !`;
                        //redirection vers la page de victoire
                        setTimeout(() => {
                        window.location.href = `victory.html?username=${username}&pokemon=${pokemon}`;
                        }, 2000);
                        
                    }

                setTimeout(() => {
                    narrator.textContent = `${wildPokemonName.textContent} utilise ${randomWildAttacks[3].move.name} !`;
                    //animation de l'attaque sur le sprite du pokémon sauvage
                    wildPokemonSprite.classList.add("attack");
                    sprite.classList.add("damaged");

                    //le pokémon sauvage inflige des dégats
                    const wilddamage = Math.floor(Math.random() * 10);
                    actualHp -= wilddamage;
                    hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                    hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                    //si les pv du pokémon sont inférieurs à 50% on change la couleur de la barre de vie
                    if (actualHp < data.stats[0].base_stat / 2) {
                        hpBar.style.backgroundColor = "#FFA500";
                    }
                    //si les pv du pokémon sont inférieurs à 25% on change la couleur de la barre de vie
                    if (actualHp < data.stats[0].base_stat / 4) {
                        hpBar.style.backgroundColor = "#FF0000";
                    }
                    // les pv du pokémon ne peuvent pas être inférieurs à 0 , le sprite du pokémon disparait
                    if (actualHp <= 0) {
                        actualHp = 0;//on maintient les pv à 0
                        hp.textContent = actualHp + " / " + data.stats[0].base_stat;
                        hpBar.style.width = (actualHp / data.stats[0].base_stat) * 100 + "%";
                        sprite.style.display = "none";
                        name.style.display = "none";
                        narrator.textContent = `${username} a perdu !`;
                        //redirection vers la page de défaite
                        setTimeout(() => {
                            window.location.href = `defeat.html?username=${username}&pokemon=${pokemon}`;
                        }, 2000);


                    }
                    
                }, 3000);
                //si les pv du pokémon sauvage sont supérieurs à 0 , on affiche le message "choisis une attaque"
                setTimeout(() => {
                    narrator.textContent = `Choisis une attaque !`;
                }, 6000);
            });
            

        }

        

            //affichage des pv du pokémon sauvage
            var wildHp = document.getElementById("wild-hp");
            wildActualHp = wild_data.stats[0].base_stat;
            wildHp.textContent = wildActualHp + " / " + wild_data.stats[0].base_stat;
            console.log( "pv actuels pokémon sauvage : " + wildActualHp);
            console.log("pv actuels pokémon joueur : " + actualHp);

            //class hp-bar-fill ,  ajouter une width à 100% si actualHp = data.stats[0].base_stat mettre la couleur en vert
            var wildHpBar = document.getElementById("wild-health-bar");
            
                wildHpBar.style.width = "100%";
                wildHpBar.style.backgroundColor = "#00FF00";//vert
            

        });


    //texte du narrateur

    // à l'arrivée du joueur un texte s'affiche pendant 3 secondes puis disparait pour laisser place à un autre texte
    const narrator = document.getElementById("narrator-txt");
    narrator.textContent = `Bonjour ${username}, tu as choisi ${data.name} !`;
    attack1.style.display = "none";
    attack2.style.display = "none";
    attack3.style.display = "none";
    attack4.style.display = "none";

    setTimeout(() => {
        narrator.textContent = `Un ${wildPokemonName.textContent} sauvage apparait !`;
    }, 3000);
    setTimeout(() => {
        narrator.textContent = `Choisis une attaque !`;
        attack1.style.display = "block";
        attack2.style.display = "block";
        attack3.style.display = "block";
        attack4.style.display = "block";
    }, 6000);



    //si on clique sur une attaque on désactive les attaques pour ne pas pouvoir cliquer plusieurs fois
    attack1.addEventListener("click", () => {
        attack1.style.display = "none";
        attack2.style.display = "none";
        attack3.style.display = "none";
        attack4.style.display = "none";
        setTimeout(() => {
            attack1.style.display = "block";
            attack2.style.display = "block";
            attack3.style.display = "block";
            attack4.style.display = "block";
        }, 7000);
    }
    );
    attack2.addEventListener("click", () => {
        attack1.style.display = "none";
        attack2.style.display = "none";
        attack3.style.display = "none";
        attack4.style.display = "none";
        setTimeout(() => {
            attack1.style.display = "block";
            attack2.style.display = "block";
            attack3.style.display = "block";
            attack4.style.display = "block";

        }, 7000);
    }
    );
    attack3.addEventListener("click", () => {
        attack1.style.display = "none";
        attack2.style.display = "none";
        attack3.style.display = "none";
        attack4.style.display = "none";
        setTimeout(() => {
            attack1.style.display = "block";
            attack2.style.display = "block";
            attack3.style.display = "block";
            attack4.style.display = "block";
        }, 7000);
    }
    );
    attack4.addEventListener("click", () => {
        attack1.style.display = "none";
        attack2.style.display = "none";
        attack3.style.display = "none";
        attack4.style.display = "none";
        setTimeout(() => {
            attack1.style.display = "block";
            attack2.style.display = "block";
            attack3.style.display = "block";
            attack4.style.display = "block";
        }, 7000);
    }
    );

}







