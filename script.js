let start_div = $('#start_div');
let start_btn = $('#start');
let restart_div = $('#restart_div');
let restart_btn = $('#restart');



// let start_sound = new Audio('keyboard_key.mp3');
// start_sound.volume =1;
// let paddle_sound = new Audio('paddle_strike.mp3');
// paddle_sound.volume=.1;
// let paddle_strike = new Audio('paddle_hit.mp3');
// paddle_strike.volume = .1;
// let finish_sound = new Audio('game_over.mp3');
// finish_sound.volume=1;

$(function (){

    function sound_play(action){
        let res=false;
        if (action==='start'){
             res = new Audio('keyboard_key.mp3');
            res.volume =1;
        }
        else if(action==='finish'){
             res = new Audio('game_over.mp3');
            res.volume =1;
        }
        else if(action==='side'){
             res = new Audio('paddle_strike.mp3');
            res.volume =.1;
        }
        else if (action==='paddle'){
             res = new Audio('paddle_hit.mp3');
            res.volume =.1;
        }
        res.play();
    }

    start_btn.click(function rstrt(){
        start_div.slideUp();
       // start_sound.play();
       sound_play('start');
        start_the_game();   
    })

    restart_btn.click(function(){
       
       // start_sound.play();
       // setTimeout(location.reload(),1000); 
       sound_play('start');
        restart_div.slideUp();
        start_the_game();
        ball.style.top='30%';
        ball.style.left='50%';

    })

    function start_the_game(){
        
        let anim_id;
        let container = $ ('#container');
        let ball = $('#ball');
        
        
        let paddle =$('.paddle');
        let paddle_1 = $('#paddle_1');
        let paddle_2 = $('#paddle_2');
        
        let winner = $('#winner');

        let container_width = parseInt(container.width());
        let container_height = parseInt(container.height());
        let paddle_width = parseInt(paddle.width());
        let ball_height = parseInt(ball.height());
        let ball_width = parseInt(ball.width());


        let game_over = false;

        let ball_center;
        let paddle_center;

        let ball_go = 'down';
        let ball_right_left = 'right';

        let top = 6;
        let right_left_angle = 0;

        let move_right_p1 = false;
        let move_left_p1 = false;

        let move_right_p2 = false;
        let move_left_p2 = false;

        let who_won;
        

        $(document).on('keydown', function (e){
            if(game_over === false){
                //keydown is an action which will execute below function
                let key = e.keyCode;

                //37 is keycode for left arrow key
                if(key === 37 && move_left_p1 === false){
                    // we have passed a function in request animation frame are not using set inter val function 
                    move_left_p1 = requestAnimationFrame(left_p1);
                } 
                else if( key === 39 && move_right_p1 === false){
                    move_right_p1 = requestAnimationFrame(right_p1);
                }
                //a key
                else if(key === 65 && move_left_p2 === false){
                    // we have passed a function in request animation frame are not using set inter val function 
                    move_left_p2 = requestAnimationFrame(left_p2);
                } 

                //s key
                else if( key === 83 && move_right_p2 === false){
                    move_right_p2 = requestAnimationFrame(right_p2);
                }

                }
            }
        );

        $(document).on('keyup', function (e){
            //keyup is an action which will execute below function
            let key = e.keyCode;

            //37 is keycode for left arrow key
            if(key === 37){
                cancelAnimationFrame(move_left_p1);
                move_left_p1 = false;
            } 
            else if(key === 39){
                cancelAnimationFrame(move_right_p1);
                move_right_p1 = false;
            }
            else if(key === 65){
                cancelAnimationFrame(move_left_p2);
                move_left_p2 = false;
            } 
            else if(key === 83){
                cancelAnimationFrame(move_right_p2);
                move_right_p2 = false;
            }
            
        });

        //we have to decrease the css left of the paddle one
        function left_p1(){
            if(parseInt(paddle_1.css('left'))>0){
            paddle_1.css('left', parseInt(paddle_1.css('left')) - 15);
            //it will become recursive and call it again and again;
            move_left_p1 = requestAnimationFrame(left_p1);
            }
        }

        function right_p1(){
            if(parseInt(paddle_1.css('left'))< 350 ){
            paddle_1.css('left', parseInt(paddle_1.css('left')) + 15);
            //it will become recursive and call it again and again;
            move_right_p1 = requestAnimationFrame(right_p1);
            }
        }
        function left_p2(){
            if(parseInt(paddle_2.css('left'))>0){
            paddle_2.css('left', parseInt(paddle_2.css('left')) - 15);
            //it will become recursive and call it again and again;
            move_left_p2 = requestAnimationFrame(left_p2);
            }
        }

        function right_p2(){
            if(parseInt(paddle_2.css('left'))< 350 ){
            paddle_2.css('left', parseInt(paddle_2.css('left')) + 15);
            //it will become recursive and call it again and again;
            move_right_p2 = requestAnimationFrame(right_p2);
            }
        }

        //ball controls

        anim_id = requestAnimationFrame(repeat);

        function repeat(){
            //if we want animatins to work when game is not over
            if(game_over === false){
                
                if(collision(ball, paddle_1)){
                    //to move ball left and right direction while it is going up and down
                    ball_center = parseInt(ball.css('left'))+ball_width/2;
                    paddle_center = parseInt(paddle_1.css('left'))+ paddle_width/2;
                    ball_right_left = (ball_center > paddle_center ? 'right' : 'left');
                    //determine the right left angle to shift the ball
                    right_left_angle = parseInt(Math.abs(paddle_center - ball_center)/7);
                    
                    //calling the up function
                    // paddle_strike.play();
                    sound_play('paddle');
                    ball_go = 'up';
                } else if(collision(ball, paddle_2)){
                    //to move ball left and right direction while it is going up and down
                    ball_center = parseInt(ball.css('left'))+ball_width/2;
                    paddle_center = parseInt(paddle_2.css('left'))+ paddle_width/2;
                    ball_right_left = (ball_center > paddle_center ? 'right' : 'left');
                    //determine the right left angle to shift the ball
                    right_left_angle = parseInt(Math.abs(paddle_center-ball_center)/7);
                    // paddle_strike.play();
                    sound_play('paddle');
                    ball_go = 'down';
                }
                //ball hitting the right-left wall
                else if(parseInt(ball.css('left')) <= 0){
                    ball_right_left ='right';
                   // paddle_sound.play();
                   sound_play('side');
                }
                else if(parseInt(ball.css('left'))>= container_width - ball_width){
                    ball_right_left ='left';
                    //paddle_sound.play();
                    sound_play('side');
                }

                //ball hitting top and bottom of the container
                //top
                else if(parseInt(ball.css('top'))<=0){
                    who_won = 'Player 1';
                    //function to stop the game
                    stop_the_game();
                }
                //bottom
                else if(parseInt(ball.css('top')) >= (container_height - ball_height)){
                    who_won = 'Player 2';
                    //function to stop the game
                    stop_the_game();
                }

                // function stop_the_game(){
                //     game_over = true;
                //     cancelAnimationFrame(anim_id);
                // }


                if(ball_go ==='down'){
                    ball_down();
                }
                else{
                    ball_up();
                }
                anim_id = requestAnimationFrame(repeat);
            }
        }

        function ball_down(){
            ball.css('top',parseInt(ball.css('top'))+(top/2));
            if (ball_right_left === 'right'){
                ball.css('left', parseInt(ball.css('left')) + right_left_angle);    
            } 
            else{
                ball.css('left', parseInt(ball.css('left')) - right_left_angle);    
            } 
        }
        function ball_up(){
            ball.css('top',parseInt(ball.css('top'))-(top/2));
            if (ball_right_left === 'right'){
                ball.css('left', parseInt(ball.css('left')) + right_left_angle);    
            } 
            else{
                ball.css('left', parseInt(ball.css('left')) - right_left_angle);    
            } 
        }

        function stop_the_game(){
            game_over = true;
            // finish_sound.play();
            sound_play('finish');
            
            cancelAnimationFrame(anim_id);
            cancelAnimationFrame(move_left_p1);
            cancelAnimationFrame(move_left_p2);
            cancelAnimationFrame(move_right_p1);
            cancelAnimationFrame(move_right_p2);
            winner.text(who_won + ' won the game');
            restart_div.slideDown();
            // ball.style.top ='30%';
            // ball.style.left='50%';

        }

       


        function collision($div1, $div2){
            
            let x1 = $div1.offset().left;
            let y1 = $div1.offset().top;
            let h1 = $div1.outerHeight(true);
            let w1 = $div1.outerWidth(true);

            let b1 = y1 + h1;
            let r1 = x1 + w1;

            let x2 = $div2.offset().left;
            let y2 = $div2.offset().top;
            let h2 = $div2.outerHeight(true);
            let w2 = $div2.outerWidth(true);

            let b2 = y2 + h2;
            let r2 = x2 + w2;

            if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2){
                return false;
            }
            {
                return true;
            }

        } 

    }
}
)
