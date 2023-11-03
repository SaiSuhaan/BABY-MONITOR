song="";
objects=[];
status = "";
objectdetected = "";

function preload()
{
    song = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(400,400);
    canvas.center()
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectdetected = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status: DETECTING OBJECTS";
}

function modelloaded()
{
    console.log("Model has loaded");
    status = true;
}

function gotresult(error,results)
{
    if(error)
    {
        console.error(error);
    }

    console.log(results)
    objects = results;
}

function draw()
{
    image(video,0,0,400,400);
    if(status !="")
    {
        objectdetected.detect(video,gotresult);
        
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status: OBJECT DETECTED";
            percent = floor(objects[i].confidence*100);
            fill(255, 0, 0)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(0,255,0)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("bfnf").innerHTML = "BABY FOUND";
                song.stop()
            }

            else
            {
                document.getElementById("bfnf").innerHTML = "BABY NOT FOUND";
                song.play();
            }
        }

        if(objects.length == 0)
        {
            document.getElementById("bfnf").innerHTML = "BABY NOT FOUND";
                song.play();
        }
    }
}