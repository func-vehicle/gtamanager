import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setLastNotified
} from './redux/sessionSlice';
import { business_icons } from './img/';
import { capitalize } from './Utility';
import { staticInfo } from './InfoContext';

// Handle sending push notifications
export const notify = {
    list: [],
    id: 0,
    log: function(msg) {
        console.log(msg);
    },
    compatible: function() {
        if (typeof Notification === 'undefined') {
            return false;
        }
        return true;
    },
    authorize: async function() {
        if (notify.compatible()) {
            return await Notification.requestPermission();
        }
        else {
            alert("Unfortunately, push notifications are not available for your browser.");
            return false;
        }
    },
    show: function(title, body, business) {
        if (notify.compatible()) {
            if (!navigator.serviceWorker) {
                notify.log("serviceWorker API unavailable in this browser");
                return;
            }
            navigator.serviceWorker.ready.then(function(registration) {
                notify.id++;
                let id = notify.id;
                notify.list[id] = registration.showNotification(title, {
                    body: body,
                    tag: business,
                    icon: business_icons[business],
                    lang: "",
                    dir: "auto",
                });
                notify.log("Notification #"+id+" queued for display");
            });
        }
        else {
            notify.log("Notifications not supported, ignoring.");
        }
    },
};

const audio = new Audio(process.env.PUBLIC_URL + "/sfx/chime.mp3");

export function useNotifyBusiness(business) {

    const dispatch = useDispatch();

    const businessInfo = useSelector(state => state.userInfo[business]);
    const running = useSelector(state => state.session.running);
    const audioEnabled = useSelector(state => state.userInfo.settings.audio.enabled);
    const volume = useSelector(state => state.userInfo.settings.audio.volume);
    const interval = useSelector(state => state.userInfo.settings.audio.interval);
    const pushEnabled = useSelector(state => state.userInfo.settings.push_notifications);
    const updateState = useSelector(state => state.session.updateState);

    const [state, setState] = useState(false);
    const lastPlayed = useSelector(state => state.session.lastNotified);

    function playAudioIfNecessary() {
        if (!audioEnabled || businessInfo.muted) {
            return;
        }
        let timestamp = new Date().getTime();
        if (timestamp - lastPlayed.general > (1000*60) * interval) {
            let payload = {
                type: "general",
                timestamp: timestamp,
            }
            dispatch(setLastNotified(payload));
            audio.pause();
		    audio.currentTime = 0;
            audio.volume = volume;
            audio.play();
        }
    }

    function pushNotifyIfNecessary(business, title, body) {
        if (!audioEnabled || !pushEnabled || businessInfo.muted) {
            return;
        }
        let timestamp = new Date().getTime();
        if (timestamp - lastPlayed[business] > (1000*60) * interval) {
            let payload = {
                type: business,
                timestamp: timestamp,
            }
            dispatch(setLastNotified(payload));
            notify.show(title, body, business);
        }
    }

    function shouldNotify() {
        // Wheel
        if (business === "wheel") {
            if ((running || businessInfo.notify_while_paused) && new Date().getTime() - businessInfo.timestamp > (1000*60)*60*24) {
                setState(true);
                playAudioIfNecessary();
                pushNotifyIfNecessary("wheel", "GTA V Business Manager", "The Lucky Wheel is ready to be spun.");
                return;
            }
            setState(false);
            return;
        }

        // General pruning
        if (!businessInfo.owned || !running) {
            setState(false);
            return;
        }

        // Bunker, MC Businesses
        if (["bunker", "coke", "meth", "cash", "weed", "forgery"].includes(business)) {
            let upgradeIndex = (businessInfo.upgrades.equipment ? 1 : 0) + (businessInfo.upgrades.staff ? 1 : 0);
            for (let resource of staticInfo[business].resources) {
                if (resource === "supplies") {
                    if (businessInfo.supplies <= 0) {
                        setState(true);
                        playAudioIfNecessary();
                        let business_name = staticInfo[business].fullName;
                        if (business !== "bunker") {
                            business_name += " business";
                        }
                        pushNotifyIfNecessary(business, "GTA V Business Manager", "Your "+business_name+" has run out of supplies.");
                        return;
                    }
                }
                else if (businessInfo[resource] >= staticInfo[business]["max"+capitalize(resource)][upgradeIndex]) {
                    setState(true);
                    playAudioIfNecessary();
                    let business_name = staticInfo[business].fullName;
                    if (business !== "bunker") {
                        business_name += " business";
                    }
                    // Bunker research cannot notify as will immediately empty upon filling
                    pushNotifyIfNecessary(business, "GTA V Business Manager", "Your "+business_name+" has reached maximum product and is ready to sell.");
                    return;
                }
            }
            setState(false);
            return;
        }

        // Nightclub
        if (business === "nightclub") {
            let products = staticInfo.nightclub.products;
            let storage_floors = businessInfo.storage_floors;
            for (let product of products) {
                if (businessInfo.producing[product]) {
                    if (businessInfo[product] >= staticInfo.nightclub["max"+capitalize(product)][storage_floors - 1]) {
                        setState(true);
                        playAudioIfNecessary();
                        pushNotifyIfNecessary("nightclub", "GTA V Business Manager", "Your Nightclub is at maximum capacity in one or more products.");
                        return;
                    }
                }
            }
            setState(false);
            return;
        }
    }

    useEffect(shouldNotify, [updateState, running, businessInfo.owned, businessInfo.muted, audioEnabled, pushEnabled]);

    return state;
}
