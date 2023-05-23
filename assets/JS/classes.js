// Base de criação dos personagens
class Character {
    _life = 1;
    maxlife = 1;
    attack = 0;
    defense = 0;

    constructor (name) {
        this.name = name;
    }

    get life() {
            return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

// Criando os personagens com suas características, (extends) é usado para vincular os dados da base (Character) o personagem que esta sendo criado
// O Super vai acessar o contrutor que estamos extendendo, no caso o (Character).

//GUERREIRO
class Knight extends Character {
    constructor (name) {
            super(name);
            this.life = 100;
            this.attack = 10;
            this.defense = 8;
            this.maxlife = this.life;
    }
}

//MAGO
class Sorcerer extends Character {
    constructor (name) {
            super(name);
            this.life = 80;
            this.attack = 15;
            this.defense = 3;
            this.maxlife = this.life;
    }
}

//LittleMonster
class LittleMonster extends Character {
    constructor () {
        super('LittleMonster');
                this.life = 40;
                this.attack = 4;
                this.defense = 4;
                this.maxlife = this.life;
    }
}

//BigMonster
class BigMonster extends Character {
    constructor () {
        super('BigMonster');
                this.life = 120;
                this.attack = 16;
                this.defense = 6;
                this.maxlife = this.life;
    }
}

//Criando o cenário da luta, onde deve ser inserido quem são os dois lutadores e os elementos de cada um deles.
class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    //criando a função que irá dar o start no jogo
    start() {
        this.update();
    
        // Criando ação de clique para atacar
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    //Criando a função (update) que será responsável por atualizar a tela com as informações dos lutadores
    update() {
        //fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        //preenchimento da barra de vida
        let f1pct = (this.fighter1.life / this.fighter1.maxlife) * 100;
        //Apresentação gráfica da quantidade de vida de 0 à 100
        this.fighter1El.querySelector('.bar').style.width = `${f1pct}%`;


        //fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        //preenchimento da barra de vida
        let f2pct = (this.fighter2.life / this.fighter2.maxlife) * 100;
        //Apresentação gráfica da quantidade de vida de 0 à 100
        this.fighter2El.querySelector('.bar').style.width = `${f2pct}%`;
    }
    
    doAttack(attacking, attacked) {
        


        //Criando fatores de ataque e defesa
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Atacando cachorro morto`);
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack} de dano em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }




        this.update(); 
    }
}

// Criando uma classe para exibir os resultados no log 
class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}
