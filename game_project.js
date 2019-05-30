var plyr1 = prompt("player one: Enter Your name,you will be blue");
var plyr1color='rgb(86, 151, 255)';

var plyr2 = prompt("player two: Enter Your name,you will be red");
var plyr2color='rgb(237, 45, 73)';

var game_on = true;
var table=$("table tr");

function reportWin(rowNum,colNum) {
  console.log('You won at starting from row : '+rowNum+' and column : '+colNum);
}

function colorChanger(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
  }


function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


// rgb(128, 128, 128)  is rgb value for gray which is initial color of all circles
function checkBottom(colIndex){
  for(var row=5;row>-1;row--){
    if(returnColor(row,colIndex)==='rgb(128, 128, 128)'){
      return row;
    }
  }
}


// undefined when we check for row or col that is not present i.e outside table
// UNDEFINED  IS USEFUL IN DIAGONAL WIN CHECK
function colorMatchCheck(one,two,three,four) {
  return (one===two && one === three && one=== four &&
    one!=='rgb(128, 128, 128)' && one !== undefined)
}

// Horizontal Win
function horizontalWin() {
  for (var row=0;row<6;row++){
    for(var col=0;col<4;col++){
      if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
        console.log("horizontalWin");
        reportWin(row,col);
        return true;
      }  else {
        continue;
      }
    }
  }
}


// VERTICAL WIN
function verticalWin() {
  for (var col=0;col<7;col++){
    for(var row=0;row<3;row++){
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        console.log("verticalWin");
        reportWin(row,col);
        return true;
      }  else {
        continue;
      }
    }
  }
}


// DIAGONAL WIN CHECK
// HERE returnColor() RETURNS undefined IF ROW INDEX IS NOT IN table
function diagonalWinCheck() {
  for(var col=0;col<4;col++){
    for(var row=0;row<6;row++){
      // CHECK FOR 4 COLORS HAVING NEGATIVE SLOP
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
        console.log('diagonalWin');
        reportWin(row,col);
        return true;
      }
        // CHECK FOR 4 COLORS HAVING POSITIVE SLOP
      else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log('diagonalWin');
                reportWin(row,col);
                return true;
              }
            else{ continue;}
    }
  }
}


// GAME START WITH PLAYER 1
 var currentPlayer=1;
 var currentName=plyr1;
 var currentColor=plyr1color;

$('h3').text(plyr1+" : it is your turn,please pick a column to drop your blue chip");



// FINAL LOGIC
$('.board button').on('click',function () {
  //this refer to button which is clicked
  // closest('td') GIVES THE closest td ANCESSTOR(Parent) IN DOM
  // i.e it gives the td in which button tag is present as each td has button

  // Thus   $(this ).closet('td').index()  gives column index of button clicked
      var col = $(this).closest("td").index();
      var bottomAvilablity = checkBottom(col);  // give row index
      colorChanger(bottomAvilablity,col,currentColor);
      if(horizontalWin() || verticalWin() || diagonalWinCheck()){
        $('h1').text(currentName+': You have won the game! Refresh Your browser to play again').css("fontSize", "50px");
        $('h2').fadeOut(30);
        $('h3').fadeOut(30);
      }
        currentPlayer= currentPlayer * -1;
        if(currentPlayer === 1){
          currentName = plyr1;
          $('h3').text(currentName+" : it is your turn to drop blue chip");
          currentColor =plyr1color;
        }else{
          currentName = plyr2;
          $('h3').text(currentName+" : it is your turn to drop red chip");
          currentColor =plyr2color;
        }

})
