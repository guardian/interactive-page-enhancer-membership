$.getJSON("https://interactive.guim.co.uk/docsdata-test/11aao6b2cD9twEd4FSRPncmPDgwnqASkHfqR_0h2ro4k.json", function(json) {
	console.log(json.sheets);
	var timelineDate = json.sheets;
	var source   = $("#data__template").html();
	var template = Handlebars.compile(source);
	var data = timelineDate;

	$(".story-timeline").append(template(data));
	var clickCount = 1;
	var canClickDown = true;
	var canClickUp = false;
	var leftButton = $('.left-button')[0];
	var downButton = $('.right-button')[0]

	var listItem = $('.story-timeline--item');
	var list = $('.story-timeline--list');
	var itemHeights = [];
	var itemHeightsBack = [];
	var moveAmount = 0;
	var moveAmountUp = 0;
	var totalHeight = 0;
	var publishedCount = 0;
	var scrollTo = 0;


	console.log('up', canClickUp);

	//get the height of each of the items in the list
	$(document).ready(function(){

		var n = json.sheets.Sheet1.length+1;

		list.css('width', (n*200)+'px')

		addListEls()

		positionCircles(n)
	});




	function addListEls(){

		for(i=0; i<json.sheets.Sheet1.length; i++){
				//height of the item
				var itemWidth = listItem[i].scrollWidth;
				//the amount which the timeline should move each time when the button is clicked
				moveAmount = listItem[0].scrollWidth + 16;
				//array of heights of each of the items used to calculate the amount which needs to be moved
				itemHeights.push(itemWidth);
				//checks how many have a link and therefor are published
				if(json.sheets.Sheet1[i].Link.indexOf("www.") >= 0){
					publishedCount ++;
				};
				console.log("published", publishedCount);
				if(publishedCount >= 6){
					//$('.story-timeline--container').animate({scrollLeft:$(document).width()});
					$('.story-timeline--title.first').css('display', 'block').delay(100).animate({opacity:'1'});
					canClickUp = true;
					moveAmount = $(document).height();
				}


		}


	}
	


  // $(downButton).click(function(){
  //   if(canClickDown != false){
		// 	$('.story-timeline--container').animate({scrollTop:moveAmount});
		// 	$(list).not('.last').scrollTop()
  //     clickCount++;
		// 	moveAmount = moveAmount + itemHeights[clickCount-1] + 16;
  //     canClickUp = true;
		// 	$('.story-timeline--title.first').css('display', 'block').delay(100).animate({opacity:'1'});
  //   }
  // });
  // $(leftButton).click(function(){
  //   if(canClickUp != false){
		// 	itemHeightsBack = itemHeights.reverse();
		// 	moveAmount = listItem[0].scrollHeight + 16;
		// 	$('.story-timeline--container').animate({scrollTop:-moveAmountUp});
  //     clickCount = 0;
  //     canClickDown = true;
		// 	moveAmountUp = moveAmountUp + itemHeights[clickCount-1] + 16;
		// 	moveAmount = listItem[0].scrollHeight + 16;
  //   }
  // });
});


function positionCircles(n){
	var l = 0;
	for(i=n; i>0; i--){  	

		$("#circle-"+i).css('left', l +'px');
		console.log("#circle-"+i)

		l += 173;

	}	
 }

Handlebars.registerHelper("inc", function(value, options){
  return parseInt(value) + 1;
});