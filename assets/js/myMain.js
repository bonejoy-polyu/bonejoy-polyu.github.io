const bxW = 300;
const bxMargin = 20;

function init() {
    var numOfBx = document.getElementsByClassName("paper-block").length;
    document.getElementById("paper-row").style.width = (numOfBx * (bxW+bxMargin*2) - bxMargin*2)+"px"; // - 40 since start & end margin doesn't exist (20 each)
    for (var i = 0; i < document.getElementsByClassName("paper-block").length; i++) {
        document.getElementsByClassName("paper-block")[i].style.width = bxW;
        if (i != 0)
            document.getElementsByClassName("paper-block")[i].style.marginLeft = bxMargin;
        if (i != document.getElementsByClassName("paper-block").length-1)
            document.getElementsByClassName("paper-block")[i].style.marginRight = bxMargin;
    }
}

function slide(elem) {
    var sliderWrap_w = document.getElementById("paper-slider").offsetWidth;
    var fullSlider_w = document.getElementById("paper-row").offsetWidth;
    var sliderWrap_rightPos = document.getElementById("paper-slider").getBoundingClientRect().right;
    var sliderWrap_leftPos = document.getElementById("paper-slider").getBoundingClientRect().left;
    var fullSlider_leftPos = document.getElementById("paper-row").getBoundingClientRect().left;
    var fullSlider_rightPos = document.getElementById("paper-row").getBoundingClientRect().right;

    var bxCanFit = Math.floor(sliderWrap_w/(bxW+bxMargin*2));
    var slided = sliderWrap_rightPos-fullSlider_leftPos;
    var numOfSlidedBx = Math.floor(slided/(bxW+bxMargin*2));
    
    var slideTo = 0;
    if (elem.parentNode.id == "right-arrow") {
        slideTo = -(document.getElementsByClassName("paper-block")[numOfSlidedBx].getBoundingClientRect().left-fullSlider_leftPos);
        if ((fullSlider_rightPos-sliderWrap_rightPos) <= sliderWrap_w) slideTo = parseInt(document.getElementById("paper-row").style.left, 10)-(fullSlider_rightPos-sliderWrap_rightPos);
    } else if (elem.parentNode.id == "left-arrow") {
        if (numOfSlidedBx-bxCanFit <= bxCanFit)
            slideTo = 0;
        else
            slideTo = parseInt(document.getElementById("paper-row").style.left, 10)+(sliderWrap_rightPos-document.getElementsByClassName("paper-block")[numOfSlidedBx-bxCanFit].getBoundingClientRect().right);
    }
    console.log(numOfSlidedBx);
    console.log(bxCanFit);
    console.log(slideTo);
    document.getElementById("paper-row").style.left = slideTo+"px";
    // if slideTo > remaining slide then just slide to remaining
}