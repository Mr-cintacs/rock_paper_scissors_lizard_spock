let arr =[];
let player_score_value =0;
let computer_score_value=0;
let modal= document.getElementById('modal');


let rock = {
    weapon:'rock',
    weapon_beats:['lizard','scissors'],
    weapon_rules:[
    'Rock crushes lizard',
    'Rock crushes scissors'
    ]
};
let paper={
    weapon:'paper',
    weapon_beats:['rock','spock'],
    weapon_rules:[
    'paper covers rock',
    'paper disproves spock'
    ]
};
let scissors={
    weapon:'scissors',
    weapon_beats:['paper','lizard'],
    weapon_rules:[
    'scissors cuts paper',
    'scissors decapitates lizard'
    ]
};
let lizard={
    weapon:'lizard',
    weapon_beats:['spock','paper'],
    weapon_rules:[
    'lizard poisons spock',
    'lizard eats paper'
    ]
};
let spock={
    weapon:'spock',
    weapon_beats:['scissors','rock'],
    weapon_rules:[
    'spock smashes scissors',
    'spock vaporises rock'
    ]
};
let loss_msg= ['AI WILL TAKE OVER !',
                'DESTROY HUMAN !',
                'THE SUPERIOR BEING HAS WON !',
                'BOW DOWN HUMAN !',
                'TRY AGAIN, TRY BETTER'];

arr.push(rock,paper,scissors,lizard,spock);


let buttons= document.getElementsByClassName('choice');
//ADD EVENTLISTENER ON BUTTONS/IMAGES
for(let button of buttons)
{
    button.addEventListener('click',runEvent);
}

//ADD EVENTLISTENER ON IMAGES




window.addEventListener('click',modalclose);

function modalclose(e)
{
    if(e.target == modal)
    {
        modal.style.display= 'none';
    }
}

function result_finder(ch1 , ch2)// TO FIND THE WINNER AFTER PASSING PLAYER AND COMPUTER CHOICES
{  
    let result= {
        winner:'',
        loser:'',
        tie:'',
        reason:''
    }
    let winner,loser;
    if(ch1 == ch2)
    {
        result.tie = 'tie';
        return result;
    }
    for(let rule of arr)
    {
        if(rule.weapon == ch1)
        {
            result.winner = rule.weapon_beats.includes(ch2) ? ch1:ch2 ;
            result.loser = (result.winner == ch1)? ch2 : ch1;
            console.log('the winner is ' + result.winner +' the loser is ' + result.loser);
            break;
        }
    }

    for(let entry of arr)
    {
        if(result.winner == entry.weapon)
        {
            for(let rule of entry.weapon_rules)
            {
                if(rule.includes(result.loser))
                {
                    result.reason= rule;
                   // console.log('ACCORDING TO THE RULES ' + result.reason);
                }
            }
        }
    }
    return result;
    //RETURNS AN OBJECT WITH INFO ABOUT THE RESULT
}


function getRandom(min,max)//BOTH ARE INCLUSIVE
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function computerSelects()//MAKE RANDOM COMPUTER SELECTION
{
    let choices = ['rock','paper','scissors','lizard','spock'];
    let choice= choices[getRandom(0,4)];
    console.log(choice);
    return choice;
};


function runEvent(e)
{
    let player_weapon= ""+e.target.id;
    let computer_weapon = computerSelects();
    console.log('player chose ' + player_weapon);
    console.log('computer chose ' + computer_weapon);
    let result_header= document.getElementById('result-header').firstElementChild;
    let reason= document.getElementById('reason');
    let winner= document.getElementById('winner');
    let player_score=document.getElementById('player-score');
    let computer_score=document.getElementById('computer-score');
    let result = result_finder(player_weapon,computer_weapon);

    modal.style.display= 'block';

    if(result.winner == player_weapon)
    {
        player_score_value += 1;
        reason.innerHTML = result.reason.toUpperCase();
        winner.innerHTML ='the player won using ' + player_weapon;
        console.log('The player won using ' + player_weapon);
        player_score.innerHTML= player_score_value;
        result_header.innerHTML= 'YOU WON !!!';
    }
    else if(result.tie != '')
    {
        result_header.innerHTML=' BT CLASH ';
        reason.innerHTML = ' BT CLASH ';
        winner.innerHTML = 'Nobody won it\'s a tie ';
    }
    else
    {
        computer_score_value += 1;
        reason.innerHTML = result.reason.toUpperCase();
        winner.innerHTML = 'The computer won using ' + computer_weapon;
        console.log('the computer won using ' + computer_weapon)
        computer_score.innerHTML= computer_score_value;
        result_header.innerHTML= loss_msg[getRandom(0,4)];
    }
    

   
}




