class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
       
        console.log(score);
                form.hide();

                var player1name;
                var player2name;
                var player1score;
                var player2score;
                
                var player1nameInfo = database.ref("players/player1/name");
                player1nameInfo.on("value", (data) => {
                    player1name = data.val();
                })
                var player2nameInfo = database.ref("players/player2/name");
                player2nameInfo.on("value", (data) => {
                    player2name = data.val();
                })
                var player1scoreInfo = database.ref("players/player1/score");
                player1scoreInfo.on("value", (data) => {
                    player1score = data.val();
                })
                var player2scoreInfo = database.ref("players/player2/score");
                player2scoreInfo.on("value", (data) => {
                    player2score = data.val();
                })
                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                       //add code to display the player's name on the respective basket.
                       
                       textSize(24);
                       fill(255,30,120);
                        
                        //text("hello", x-25,y+25);
                        text(allPlayers[plr].name, x-25,y+25);
                        
                     }
                     textSize(24);
                     var topPlayer = 100;
                     var bottomPlayer = 120;
                     if(player1score > player2score){
                         topPlayer = 100;
                         bottomPlayer = 120;
                     }
                     else if(player1score < player2score){
                        topPlayer = 120;
                        bottomPlayer = 100;
                     }
                     else{
                        topPlayer = 100;
                        bottomPlayer = 120;
                     }
                     text(player1name + ": " + player1score,width-150,topPlayer);
                     text(player2name + ": " +player2score,width-150,bottomPlayer);
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                    
                     if(fruits.velocityY<12){
                        fruits.velocityY += 0.8;
                     }
                     else if(fruits.velocityY > 12){
                        fruits.velocityY = 12;
                     }
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                    for (var i = 0; i < fruitGroup.length; i++) {
                        if (fruitGroup.get(i).isTouching(players)) {
                            player.score++
                            fruitGroup.get(i).destroy();
                         
                            
                        }
                        
                    }
                  }
                

       
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}
