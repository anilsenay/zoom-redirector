const zoom = {
    monday: [
        {
            endTime: 1020,
            url: "https://zoom.us/j/715290255?pwd=TXJVWEpmSEhFOGdLMzFqK3ZDQkJ6UT09"
        },
        {
            endTime: 1120,
            url: "https://zoom.us/j/467031639?pwd=TG5uOXhJWm1kUnNScXpOcVNEZmlZQT09"
        },
        {
            endTime: 1220,
            url: "https://zoom.us/j/625198789?pwd=aGEwZUczSGROdHVUc0RpdDFDSzdxdz09"
        },
        {
            endTime: 1450,
            url: "https://zoom.us/j/2551333127"
        }
    ],
    tuesday: [
        {
            endTime: 1220,
            url: "https://zoom.us/j/98085186759"
        },
        {
            endTime: 1350,
            url: "https://zoom.us/j/260035356?pwd=MDRsS2pwd0xubHYyUzR1ZGpTcTNBdz09"
        }
    ],
    wednesday: [
        {
            endTime: 1220,
            url: "https://zoom.us/j/561393261?pwd=MjBiSFVlM25kVFZhSUJSRHRXSGpzUT09"
        },
        {
            endTime: 1450,
            url: "https://zoom.us/j/478663266"
        },
        {
            endTime: 1650,
            url: "https://zoom.us/j/918532011?pwd=U01BcmJ5eDhPVTk1bnBYaHdkT2duQT09"
        },
    ],
    thursday: [
        {
            endTime: 1020,
            url: "https://zoom.us/j/227241150?pwd=eWZRVVJJaWxJdG9IbFpjR1JkUFFCUT09"
        },
        {
            endTime: 1220,
            url: "https://zoom.us/j/561393261?pwd=MjBiSFVlM25kVFZhSUJSRHRXSGpzUT09"
        }
    ],
    friday: [
        {
            endTime: 1220,
            url: "https://zoom.us/j/317856657?pwd=T1BvS1kvSGRGeWJRS3E5aVZTTDN1Zz09"
        },
        {
            endTime: 1550,
            url: "https://zoom.us/j/529892810?pwd=L2xybldlckExREF6TDFqYldMd05jdz09"
        },
    ],
}

var today = new Date();
var date = today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear();
var time = today.getHours() + "";
time += (today.getMinutes()+"").length === 1 ? "0"+today.getMinutes() : today.getMinutes();

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

var day = getDayName(date, "en-US").toLocaleLowerCase();

var url = null;

zoom[day].map(item => {
    if(item.endTime - parseInt(time) >0 && item.endTime - parseInt(time) <= 100 && url === null){
        console.log("şu anki dersin: " + item.url)
        url = item.url;
    }
})

let countdown = 3;
let warningText = url ? "You are directing in " + countdown + " sec... Please wait..." : "You have not any lesson right now";

document.getElementById("mainText").innerText = warningText

if(url !== null && window.location.href.includes("?auto-redirect")) window.location.replace(url);
else if (url !== null) {
    var button = document.createElement('BUTTON');
    button.appendChild(document.createTextNode("Stop Redirecting"));
    document.getElementsByTagName('body')[0].insertBefore(button, document.getElementsByClassName('container')[0]);
    button.onclick = function(){
        countdown = countdown ? null : 3;
        document.getElementsByTagName('button')[0].innerText = (countdown ? "Stop" : "Resume") + " Redirecting";
    };
    setInterval(() => {
        if(countdown === null) {
            document.getElementById("mainText").innerText = "Redirecting Stopped!"
        }
        else {
            countdown--;
            document.getElementById("mainText").innerText = "You are directing in " + countdown + " sec... Please wait..."
            countdown <= 0 && window.location.replace(url);
        }
    }, 1000)
}
