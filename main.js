// 2020 Seongki Sohn.
// Renewal of 2018 work - Visual Braille.
//
//

function init() {
    // var mobydick = "Moby Dick; or The Whale, by Herman Melville. Call me Ishmael. Some years ago--never mind how long precisely--having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.  It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off--then, I account it high time to get to sea as soon as I can.  This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.";
    var poem = "[Fire & Ice by Robert Frost] Some say the world will end in fire, Some say in ice. From what I’ve tasted of desire I hold with those who favour fire. But if it had to perish twice, I think I know enough of hate To say that for destruction ice Is also great And would suffice.";

    var content = document.getElementById("content");



    var widthVal = window.innerWidth;
    var division = 0;

    if(widthVal <768) {
        division = 6;
    } else if (widthVal >= 768 && widthVal < 1280) {
        division =8;

    }if (widthVal >= 1280) {
        division = 10;
    }


    // Exclude left margin
    const marginLW = window.innerWidth / 100 * 5;
    // Exclude Header + Instruction height
    const marginTH = window.innerHeight / 100 * 30;

    //Offset for touch(finger)
    const offset = window.innerHeight / 100 * 2;
    const unitSize = window.innerWidth / 100 / division * 90;
    // console.log(marginLW + " "+ marginTH + " " + unitSize);

    var items = [];
    var activeItems = [];

    for(var i=0; i<poem.length; i++) {
        var item = document.createElement("DIV");
        item.innerHTML = "";

        item.setAttribute("class", "item disableselect");
        item.setAttribute("key", i);

        item.innerHTML="<p>"+poem[i]+"</p>"

        content.appendChild(item);
        items.push(item);
    }

    var clearItems;


    content.addEventListener("touchmove", function(e) {
        columnRowDetect(e.touches[0].pageX, e.touches[0].pageY);
    });

    content.addEventListener("touchstart", function(e) {
        columnRowDetect(e.touches[0].pageX, e.touches[0].pageY);
    });

    content.addEventListener("touchend", function() {
        clearItem();
    });

    content.addEventListener("mouseup", function() {
        clearItem();
    });

    function columnRowDetect(_xVal, _yVal) {
        var columnDetect = Math.floor((_xVal - marginLW) / unitSize);
        if(columnDetect<0) {
            columnDetect = 0;
        }
        if(columnDetect>=division) {
            columnDetect = division-1;
        }
        var rowDetect = Math.floor((_yVal - marginTH - offset) / unitSize);

        itemSet(columnDetect, rowDetect);
    }

    function itemSet(_x, _y) {
        var indexNum = _x + _y*division;

        var target = items[indexNum];

        target.setAttribute("class", "item disableselect itemactive");
    }

    function clearItem() {
        items.forEach(item => {
            item.removeAttribute("class");
            item.setAttribute("class", "item disableselect")
        });

    }

}


window.addEventListener("load", init);