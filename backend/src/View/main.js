import './css/css.css'
import './css/css_002.css'
import './css/chunk-vendors.css'
import './css/loading-bar.css'
import './css/app.css'

// import './js/app';
import './js/chunk-vendors';
import './js/loading-bar';
// import './js/prompt';

function importAll(r) {
    return r.keys().map(r);
}

if(hasScreenshots){
    importAll(require.context(`./images/${userEmail}/${appName}/screenshots`, false, /\.(png|jpe?g|svg)$/));
}
if (hasAvatars){
    importAll(require.context(`./images/${userEmail}/${appName}/usersAvatars`, false, /\.(png|jpe?g|svg)$/));
}
importAll(require.context('./img/', false, /\.(png|jpe?g|svg|gif)$/));
importAll(require.context(`./images/${userEmail}/${appName}/appLogo`, false, /\.(png|jpe?g|svg)$/));

firebase.initializeApp({
    apiKey: "AIzaSyD2HWSU3ahplXr1_O4NtBXjwqKbH7hV4YA",
    authDomain: "play777-fa962.firebaseapp.com",
    databaseURL: "https://play777-fa962.firebaseio.com",
    projectId: "play777-fa962",
    storageBucket: "play777-fa962.appspot.com",
    messagingSenderId: "998804748155",
    appId: "1:998804748155:web:9e419b004ce0e214"
});
let btnAdd = document.getElementById('vbtn_adds');
let blockVButton = document.getElementById('block_vbutton');
let blockVProgressBar = document.getElementById('block_vprogr');
let blockProgressText = document.getElementById('progress-text');
let btnAddTxt = document.getElementById('vbtn_adds_txt');
let setupisok = false;
let btnLoad = true;

let deferredPrompt;
let bar1 = new ldBar("#bprogress");
const messaging = firebase.messaging();
const url = new URL(window.location.href);
const isPWA = new URLSearchParams(url.search).get('utm_source');
const args = window.location.search.replace('?', '').split('&').reduce((akk, params) => {
    const [name, value] = params.split('=');
    akk[name] = value;
    return akk;
}, {});
const redirectUrlWithParams = Object.keys(args).reduce((akk, key) => {
    return akk.replace(`{${key}}`, args[key]);
}, `https://pwa-generator.web.app/thanks.html?redirect=${encodeURI(redirectUrl)}`);

if (isPWA) {
    window.location.href = redirectUrlWithParams;
}

document.addEventListener("DOMContentLoaded", ()=> {
    const loader = document.getElementById('page-loader');
    const content = document.getElementById('market-wrap');
    loader.classList.add('is-hidden');
    content.classList.remove('is-hidden');
});



// window.onappinstalled = function() {
//     setTimeout(() => {
//         window.location.href = redirectUrlWithParams;
//     }, 1000)
// };

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
            console.log(registration);
            messaging.useServiceWorker(registration);
            console.log("Registration successful, scope is:", registration.scope);
            firebaseInit();
        })
        .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
        });
}


    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        btnLoad = false;
        btnAddTxt.innerHTML = 'УСТАНОВИТЬ';
    });


if (btnLoad == true) {
    btnAddTxt.innerHTML = '<img src="./images/fader.gif" style="padding-left:36px;padding-right:36px;">';
}
btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    let fullAppSize = Number(appSize);
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');


                    blockVButton.style.display = 'none';
                    blockVProgressBar.style.display = 'block';

                    getStatusBar({
                        totalTime: 7000,
                        period: 100,
                        periodCallback: (time) => {
                            const timePercent = getPartPercent(7000, time);
                            const currentSize = Math.round(getPart(fullAppSize, timePercent));
                            blockProgressText.innerHTML = `<div>${currentSize} ${lang !== 'en' ? 'мб из' : 'mb of'} ${fullAppSize}${lang !== 'EN' ? 'мб' : 'mb'}</div><div>${Math.round(timePercent)}%</div>`;
                            bar1.set(Math.round(timePercent));
                        }
                    });


                    setTimeout(() =>  {

                        window.location.href = redirectUrlWithParams;

                    }, 7000);



            } else {
                console.log('User dismissed the A2HS prompt');
            }
        });

});

function firebaseInit() {
    const messaging = firebase.messaging();

    messaging.usePublicVapidKey(
        "BCC9VOAxTVCvBtGhm0-yT9IvByqdpQH2WhDKOV_7vRHPg1d6Jk2-5MkUBBfotnwuGD6WmhiPN-mwfYt7CHE4BRE"
    );

    const askForPermission = async () => {
        try {
            await messaging.requestPermission();
            const token = await messaging.getToken();
            return token;
        } catch (error) {
            console.error(error);
        }
    };


    const headers = {
        headers: {
            authorization: 'key=AAAA6I1m93s:APA91bFKWm_X-zcZDfeypqeyq3AyT2g6ArxPMefXHiHiKM_kMKBL1VD8O9lQ4kzeR2Kx7o4zvKou9CrUi-nWsHZ0OcEHHG9bTY1OXMhOpAllc-1ZzekOxDpTmuoLHSX8BVfeFGteoHbg',
        }
    };
    askForPermission()
        .then(res => {
            axios.post(`https://iid.googleapis.com/iid/v1/${res}/rel/topics/${user}-${appName}`,
                {}, headers)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        });
}

function getPartPercent(total, part) {
    return (100 * part) / total;
}

function getPart(total, partPercent) {
    return (total * partPercent) / 100;
}

function getStatusBar({ totalTime, period, periodCallback, totalCallback }) {
    let timer = 0;
    const intervalId = setInterval(periodCallbackWrapper, period);

    function periodCallbackWrapper () {
        if(timer >= totalTime) {
            clearInterval(intervalId);
            if (totalCallback) {
                totalCallback();
            }

            return;
        }

        timer += period;
        if(periodCallback) {
            periodCallback(timer);
        }
    }

    return intervalId;
}
