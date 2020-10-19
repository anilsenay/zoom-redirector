const zoom = {
    monday: [
        {
            endTime: 950,
            url: "https://zoom.us/meeting/register/tJAod-uoqTgiHNNuEzs_PIPwu1U4sLRCE-9D"
        },
        {
            endTime: 1050,
            url: "https://zoom.us/meeting/register/tJAod-uoqTgiHNNuEzs_PIPwu1U4sLRCE-9D"
        },
        {
            endTime: 1150,
            url: "https://zoom.us/j/2319763386?pwd=N0d0eEFwTXlib3hseitnNUZoVWhqdz09"
        }
    ],
    tuesday: [
        {
            endTime: 950,
            url: "https://zoom.us/j/2319763386?pwd=N0d0eEFwTXlib3hseitnNUZoVWhqdz09"
        },
        {
            endTime: 1050,
            url: "https://zoom.us/j/2319763386?pwd=N0d0eEFwTXlib3hseitnNUZoVWhqdz09"
        },
        {
            endTime: 1150,
            url: "https://zoom.us/meeting/register/tJAod-uoqTgiHNNuEzs_PIPwu1U4sLRCE-9D"
        },
        {
            endTime: 1550,
            url: ""
        },
        {
            endTime: 1650,
            url: ""
        }
    ],
    wednesday: [
        {
            endTime: 950,
            url: "https://zoom.us/j/93785999668?pwd=R3VHaU5lbTREOVNHOWNhNmZ1dC9FQT09"
        },
        {
            endTime: 1050,
            url: "https://zoom.us/j/2319763386?pwd=N0d0eEFwTXlib3hseitnNUZoVWhqdz09"
        },
        {
            endTime: 1150,
            url: "https://zoom.us/j/2319763386?pwd=N0d0eEFwTXlib3hseitnNUZoVWhqdz09"
        },
        {
            endTime: 1350,
            url: "https://zoom.us/j/95444347430?pwd=WjZOQU43MG5jMW8zSnkvT1dSd3lUUT09"
        },        
        {
            endTime: 1450,
            url: "https://zoom.us/j/95444347430?pwd=WjZOQU43MG5jMW8zSnkvT1dSd3lUUT09"
        },       
        {
            endTime: 1550,
            url: ""
        },
        {
            endTime: 1650,
            url: ""
        }
    ],
    thursday: [
        {
            endTime: 950,
            url: "https://zoom.us/j/2319763386?pwd=N0d0eEFwTXlib3hseitnNUZoVWhqdz09"
        },
        {
            endTime: 1050,
            url: ""
        },
        {
            endTime: 1150,
            url: ""
        },
        {
            endTime: 1550,
            url: "https://zoom.us/j/97675775681?pwd=cWo5UkxyMmZqZ0FSSStqQXJGRU0yZz09"
        },
        {
            endTime: 1650,
            url: "https://zoom.us/j/97675775681?pwd=cWo5UkxyMmZqZ0FSSStqQXJGRU0yZz09"
        }
    ],
    friday: [
        {
            endTime: 950,
            url: ""
        },
        {
            endTime: 1050,
            url: "https://zoom.us/j/93785999668?pwd=R3VHaU5lbTREOVNHOWNhNmZ1dC9FQT09"
        },
        {
            endTime: 1150,
            url: "https://zoom.us/j/93785999668?pwd=R3VHaU5lbTREOVNHOWNhNmZ1dC9FQT09"
        }
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
