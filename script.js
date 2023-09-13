const videos = ["stock.mp4", "stock2.mp4", "stock3.mp4"]
const scroller = document.getElementById("bruh!");
var videoListIndex = 0;
var scrolling = false;
var onFeedbackScreen = false;

document.onkeydown = (e) => {
    if (e.key == 'ArrowDown' || e.key == 's') {
        scrollVideo()
    }
};

window.onwheel = (e) => {
    if(e.deltaY > 0){
        scrollVideo()
    }
}

function scrollVideo(){

    if(scrolling === true){
        return
    }
    scrolling = true;

    const currentVideo = scroller.firstChild;
    var htmlToInsert;

    if(onFeedbackScreen){

        videoListIndex += 1;
        if(videoListIndex >= videos.length){
            videoListIndex = 0;
        }

        htmlToInsert = 
        `<div class="video">

            <video class="videoPlayer" muted autoplay loop>
                <source src="./${videos[videoListIndex]}" type="video/mp4">
            </video>

            <div class="videoOverlay">
                <div class="text">
                    <p><b>William Wallace</b></p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut sint asperiores deserunt nisi optio accusantium mollitia eos! Et eligendi ea mollitia quae rerum neque repudiandae suscipit ratione cum soluta!</p>
                </div>
                <div class="controls">
                    <img onclick="likeVideo(this)" src="./like.png">
                    <img src="./comment.png">
                    <img src="./bookmark.png">
                    <img src="./share.png">
                </div>
            </div>
        </div>`;
        onFeedbackScreen = false;
    }
    else{
        htmlToInsert = 
        `<div class="videoResponse">
            <video class="videoThumb" muted>
                <source src="./${videos[videoListIndex]}" type="video/mp4">
            </video>
            <div class="responseRest">
                <h3>How do you feel about the video you just watched?</h3>
                
                <div class="options">
                    <div><input class="feedbackRadio" type="radio" name="response" value="offensive"><p class="radioText">I find it offensive</p></div>
                    <div><input class="feedbackRadio" type="radio" name="response" value="not-offensive"><p class="radioText">I don't find it offensive</p></div>
                    <div><input class="feedbackRadio" type="radio" name="response" value="no-opinion"><p class="radioText">I have no opinion on this video</p></div>
                </div>
    
                <button class="submitButton" onclick="submitFeedback()">Submit</button>
            </div>
        </div>`;

        onFeedbackScreen = true;
    }

    scroller.insertAdjacentHTML('afterbegin', htmlToInsert);
    const nextVideo = scroller.firstChild;

    currentVideo.classList.add("scrollAway");
    nextVideo.classList.add("scrollIn");

    setTimeout(()=>{
        currentVideo.remove()
        nextVideo.classList.remove("scrollIn");
        scrolling = false;
    }, 480)

}

function submitFeedback(){

    var feedback;
    var radios = document.getElementsByName('response');

    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked){
            feedback = radios[i].value;
        }
    }

    if(feedback === undefined){
        feedback = "no-response";
    }

    alert("user's response was '" + feedback + "'")

    scrollVideo()
}

function likeVideo(el){
    if(el.classList.contains("liked")){
        el.classList.remove("liked");
    }
    else{
        el.classList.add("liked");
    }
}

function loadFirstVid(){

    const htmlToInsert = 
    `<div class="video">

        <video class="videoPlayer" muted autoplay loop>
            <source src="./${videos[videoListIndex]}" type="video/mp4">
        </video>

        <div class="videoOverlay">
            <div class="text">
                <p><b>William Wallace</b></p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut sint asperiores deserunt nisi optio accusantium mollitia eos! Et eligendi ea mollitia quae rerum neque repudiandae suscipit ratione cum soluta!</p>
            </div>
            <div class="controls">
                <img onclick="likeVideo(this)" src="./like.png">
                <img src="./comment.png">
                <img src="./bookmark.png">
                <img src="./share.png">
            </div>
        </div>
    </div>`;

    scroller.insertAdjacentHTML('afterbegin', htmlToInsert);
}

loadFirstVid()