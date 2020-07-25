var userInfo;

// The current format of user's data.
var defaultUserInfo = {
	version: "1.10.1",
	recentFriday: 0,
	settings: {
		hide_unowned: false,
		push_notifications: false,
		audio: {
			enabled: true,
			volume: 1,
			interval: 3,
		},
		progress_bar_style: 1,
		app_style: 0,
	},
	bunker: {
		owned: false,
		muted: false,
		product: 0,
		research: 0,
		supplies: 0,
		mode: 0,
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		hide_research: 0,
		map_position: {
			x: 58.47,
			y: 49.49,
		},
	},
	coke: {
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		map_position: {
			x: 48.94,
			y: 38.73,
		},
	},
	meth: {
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		map_position: {
			x: 47.40,
			y: 47.62,
		},
	},
	cash: {
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		map_position: {
			x: 50.92,
			y: 45.00,
		},
	},
	weed: {
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		map_position: {
			x: 68.87,
			y: 31.02,
		},
	},
	forgery: {
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		map_position: {
			x: 59.28,
			y: 28.46,
		},
	},
	nightclub: {
		owned: false,
		muted: false,
		sidebar: true,
		cargo: 0,
		sporting: 0,
		imports: 0,
		pharma: 0,
		creation: 0,
		organic: 0,
		copying: 0,
		producing: {
			cargo: false,
			sporting: false,
			imports: false,
			pharma: false,
			creation: false,
			organic: false,
			copying: false,
		},
		upgrades: {
			equipment: false,
			staff: false,
			security: false
		},
		storage_floors: 1,
		map_position: {
			x: 36.30,
			y: 76.79,
		},
	},
	importExport: {
		owned: false,
		highend_cars: 0,
		cooldown: 0,
		map_position: {
			x: 53.86,
			y: 82.30,
		},
	},
	wheel: {
		owned: true,
		muted: false,
		notify_while_paused: false, 
		timestamp: 0,
		map_position: {
			x: 53.89,
			y: 66.46,
		},
	},
}

// Load saved data JSON from localStorage
var newUser = false;
if (localStorage.getItem("userInfo") == null) {
	userInfo = defaultUserInfo;
	newUser = true;
}
else {
	userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

var windowStack = [];
var backupInfo = {};
var changeInfo = {};

var lastTickTime = null;

// Session notification information
var feesCooldown = 0;
var notifications = {
	pushAllowed: false,
	lastPlayed: 0,
	lastPlayedDict: {
		bunker: 0,
		coke: 0,
		meth: 0,
		cash: 0,
		weed: 0,
		forgery: 0,
		nightclub: 0,
		wheel: 0,
	},
}
var flashIconState = true;

// Times are in minutes
var staticInfo = {
	mcbusinesses: ["coke", "meth", "cash", "weed", "forgery"],
	bunker: {
		fullName: "Bunker",
		shortName: "Bunker",
		upgrades: ["equipment", "staff", "security"],
		maxProduct: [1000, 850, 700],
		maxResearch: [500, 340, 210],
		maxSupplies: [100, 127.5, 140],
		maxResearchSupplies: [250, 300, 350],
		locations: [
			{
				name: "Paleto Forest",
				x: 39.23,
				y: 19.51,
			},
			{
				name: "Raton Canyon",
				x: 42.75,
				y: 32.41,
			},
			{
				name: "Lago Zancudo",
				x: 21.43,
				y: 40.72,
			},
			{
				name: "Chumash",
				x: 20.36,
				y: 55.97,
			},
			{
				name: "Grapeseed",
				x: 60.02,
				y: 29.64,
			},
			{
				name: "Route 68",
				x: 45.31,
				y: 43.71,
			},
			{
				name: "Grand Senora Oilfields",
				x: 49.79,
				y: 43.28,
			},
			{
				name: "Grand Senora Desert",
				x: 52.99,
				y: 43.07,
			},
			{
				name: "Smoke Tree Road",
				x: 62.90,
				y: 40.30,
			},
			{
				name: "Thomson Scrapyard",
				x: 65.99,
				y: 41.68,
			},
			{
				name: "Farmhouse",
				x: 58.47,
				y: 49.49,
			},
		],
	},
	coke: {
		fullName: "Cocaine",
		shortName: "Cocaine",
		upgrades: ["equipment", "staff", "security"],
		maxProduct: [500, 400, 300],
		maxSupplies: [100, 120, 120],
		locations: [
			{
				name: "Morningwood",
				x: 33.37,
				y: 70.90,
			},
			{
				name: "Elysian Island",
				x: 43.82,
				y: 87.95,
			},
			{
				name: "Paleto Bay",
				x: 46.27,
				y: 14.82,
			},
			{
				name: "Alamo Sea",
				x: 48.94,
				y: 38.73,
			},
		],
	},
	meth: {
		fullName: "Meth",
		shortName: "Meth",
		upgrades: ["equipment", "staff", "security"],
		maxProduct: [600, 480, 360],
		maxSupplies: [120, 144, 144],
		locations: [
			{
				name: "El Burro Heights",
				x: 57.57,
				y: 80.70,
			},
			{
				name: "Terminal",
				x: 55.65,
				y: 92.43,
			},
			{
				name: "Paleto Bay",
				x: 46.70,
				y: 16.10,
			},
			{
				name: "Grand Senora Desert",
				x: 47.40,
				y: 47.62,
			},
		],
	},
	cash: {
		fullName: "Counterfeit Cash",
		shortName: "Counterfeit Cash",
		upgrades: ["equipment", "staff", "security"],
		maxProduct: [480, 400, 320],
		maxSupplies: [120, 150, 160],
		locations: [
			{
				name: "Vespucci Canals",
				x: 36.46,
				y: 79.10,
			},
			{
				name: "Cypress Flats",
				x: 51.17,
				y: 89.66,
			},
			{
				name: "Paleto Bay",
				x: 42.22,
				y: 18.12,
			},
			{
				name: "Grand Senora Desert",
				x: 50.92,
				y: 45.00,
			},
		],
	},
	weed: {
		fullName: "Weed",
		shortName: "Weed",
		upgrades: ["equipment", "staff", "security"],
		maxProduct: [480, 400, 320],
		maxSupplies: [150, 187.5, 200],
		locations: [
			{
				name: "Downtown Vinewood",
				x: 46.59,
				y: 65.78,
			},
			{
				name: "Elysian Island",
				x: 47.23,
				y: 87.10,
			},
			{
				name: "Mount Chilliad",
				x: 49.25,
				y: 14.71,
			},
			{
				name: "San Chianski Mountain Range",
				x: 68.87,
				y: 31.02,
			},
		],
	},
	forgery: {
		fullName: "Document Forgery",
		shortName: "Doc. Forgery",
		upgrades: ["equipment", "staff", "security"],
		maxProduct: [300, 240, 180],
		maxSupplies: [125, 150, 150],
		locations: [
			{
				name: "Textile City",
				x: 47.87,
				y: 73.56,
			},
			{
				name: "Elysian Island",
				x: 43.18,
				y: 89.77,
			},
			{
				name: "Paleto Bay",
				x: 44.24,
				y: 16.84,
			},
			{
				name: "Grapeseed",
				x: 59.28,
				y: 28.46,
			},
		],
	},
	nightclub: {
		fullName: "Nightclub",
		shortName: "Nightclub",
		products: ["cargo", "sporting", "imports", "pharma", "creation", "organic", "copying"],
		upgrades: ["equipment", "staff", "security"],
		// Here max is max capacity of product, accrue is the time per product in minutes
		maxCargo: [10, 20, 30, 40, 50],
		maxSporting: [20, 40, 60, 80, 100],
		maxImports: [2, 4, 6, 8, 10],
		maxPharma: [4, 8, 12, 16, 20],
		maxCreation: [8, 16, 24,32, 40],
		maxOrganic: [16, 32, 48, 64, 80],
		maxCopying: [12, 24, 36, 48, 60],
		accrueCargo: [140, 70],
		accrueSporting: [80, 40],
		accrueImports: [240, 120],
		accruePharma: [120, 60],
		accrueCreation: [60, 30],
		accrueOrganic: [40, 20],
		accrueCopying: [30, 15],
		locations: [
			{
				name: "West Vinewood",
				x: 46.27,
				y: 65.88,
			},
			{
				name: "Downtown Vinewood",
				x: 48.72,
				y: 65.57,
			},
			{
				name: "Del Perro",
				x: 35.93,
				y: 72.92,
			},
			{
				name: "Strawberry",
				x: 44.78,
				y: 78.04,
			},
			{
				name: "La Mesa",
				x: 51.92,
				y: 78.14,
			},
			{
				name: "Mission Row",
				x: 48.51,
				y: 75.37,
			},
			{
				name: "Cypress Flats",
				x: 52.88,
				y: 84.33,
			},
			{
				name: "Vespucci Canals",
				x: 36.30,
				y: 76.79,
			},
			{
				name: "LSIA",
				x: 40.30,
				y: 87.63,
			},
			{
				name: "Elysian Island",
				x: 47.55,
				y: 93.07,
			},
		],
	},
	importExport: {
		fullName: "Import / Export",
		shortName: "Import / Export",
		locations: [
			{
				name: "La Mesa",
				x: 53.86,
				y: 82.30,
			},
			{
				name: "El Burro Heights",
				x: 59.91,
				y: 80.49,
			},
			{
				name: "Elysian Island",
				x: 47.12,
				y: 91.58,
			},
			{
				name: "LSIA 1",
				x: 36.57,
				y: 84.65,
			},
			{
				name: "LSIA 2",
				x: 41.90,
				y: 85.07,
			},
			{
				name: "Davis",
				x: 45.31,
				y: 81.98,
			},
			{
				name: "Cypress Flats",
				x: 52.35,
				y: 85.61,
			},
			{
				name: "La Puerta",
				x: 41.15,
				y: 81.88,
			},
			{
				name: "Murrieta Heights",
				x: 55.54,
				y: 77.51,
			},
		],
	},
	wheel: {
		fullName: "Lucky Wheel",
		shortName: "Lucky Wheel",
	}
}

// Useful regexp
var typeRegexp = /^.*(product|research|supplies|sell|cargo|sporting|imports|pharma|creation|organic|copying).*$/;
var businessRegexp = /^.*(bunker|coke|meth|cash|weed|forgery|nightclub|importExport|wheel).*$/;

// Set up main loop to run every second
var intervalID = setInterval(tick, 1000);
var running = 0;

// Useful generic functions
function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

Number.prototype.mod = function(b) { 
    return ((this % b) + b) % b; 
}

// Update userInfo with new features
function update() {
	if (userInfo.version == "1.0.0") {
		userInfo.audio = {enabled: true};
		userInfo.bunker.name = "Bunker";
		userInfo.coke.name = "Cocaine";
		userInfo.meth.name = "Meth";
		userInfo.cash.name = "Counterfeit Cash";
		userInfo.weed = jQuery.extend(true, {}, defaultUserInfo.weed);
		userInfo.forgery = jQuery.extend(true, {}, defaultUserInfo.forgery);
		userInfo.nightclub.name = "Nightclub";
		userInfo.importExport.name = "Import / Export";
		userInfo.wheel.name = "Lucky Wheel";
		userInfo.bunker.research /= 60000;
		var toUpdate = ["bunker", "coke", "meth", "cash"];
		for (var i = 0; i < toUpdate.length; i++) {
			var business = toUpdate[i];
			userInfo[business].product /= 60000;
			userInfo[business].supplies /= 60000;
		}
		userInfo.version = "1.1.0";
	}
	if (userInfo.version == "1.1.0") {
		userInfo.settings = jQuery.extend(true, {}, defaultUserInfo.settings);
		userInfo.settings.audio.enabled = userInfo.audio.enabled;
		delete userInfo.audio;
		userInfo.nightclub.sidebar = true;
		userInfo.nightclub.organic = 0;
		userInfo.nightclub.copying = 0;
		userInfo.nightclub.producing.organic = false;
		userInfo.nightclub.producing.copying = false;
		userInfo.version = "1.2.0";
	}
	if (userInfo.version == "1.2.0") {
		userInfo.settings.progress_bar_style = 0;
		userInfo.version = "1.3.0";
	}
	if (userInfo.version == "1.3.0") {
		userInfo.bunker.muted = false;
		userInfo.coke.muted = false;
		userInfo.meth.muted = false;
		userInfo.cash.muted = false;
		userInfo.weed.muted = false;
		userInfo.forgery.muted = false;
		userInfo.nightclub.muted = false;
		userInfo.wheel.muted = false;
		userInfo.wheel.owned = true;
		userInfo.version = "1.4.0";
	}
	if (userInfo.version == "1.4.0") {
		userInfo.version = "1.5.0";
	}
	if (userInfo.version == "1.5.0") {
		if (userInfo.settings.progress_bar_style == 0) {
			userInfo.settings.progress_bar_style = 1;
		}
		userInfo.version = "1.5.3";
	}
	if (userInfo.version == "1.5.3") {
		userInfo.recentFriday = 0;
		userInfo.settings.push_notifications = false;
		userInfo.wheel.notify_while_paused = false;
		userInfo.version = "1.6.0";
	}
	if (userInfo.version == "1.6.0") {
		userInfo.app_style = 0;
		userInfo.version = "1.7.0";
	}
	if (userInfo.version == "1.7.0") {
		userInfo.version = "1.7.1";
	}
	if (userInfo.version == "1.7.1") {
		userInfo.version = "1.7.2";
	}
	if (userInfo.version == "1.7.2") {
		userInfo.version = "1.7.3";
	}
	if (userInfo.version == "1.7.3") {
		userInfo.version = "1.8.0";
	}
	if (userInfo.version == "1.8.0") {
		let toUpdate = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub", "importExport", "wheel"];
		for (let i = 0; i < toUpdate.length; i++) {
			let business = toUpdate[i];
			delete userInfo[business].name;
		}
		userInfo.version = "1.9.0";
	}
	if (userInfo.version == "1.9.0") {
		let toUpdate = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub"];
		for (let i = 0; i < toUpdate.length; i++) {
			let business = toUpdate[i];
			userInfo[business].upgrades = {
				equipment: true,
				staff: true,
				security: true
			};
		}
		userInfo.bunker.product = Math.min(userInfo.bunker.product, staticInfo.bunker.maxProduct[2]);
		userInfo.bunker.supplies = Math.min(userInfo.bunker.supplies, staticInfo.bunker.maxSupplies[2]);
		
		userInfo.nightclub.storage_floors = 5;
		userInfo.version = "1.10.0";
	}
	if (userInfo.version == "1.10.0") {
		userInfo.version = "1.10.1";
	}
}

// Modules
var PatchModule = (function () {
	var patchnotes = null;
	var patchIndex = null;
	var updateScreen = function (b_left) {
		if (b_left) {
			patchIndex--;
			if (patchIndex < 0)
				patchIndex = 0;
		}
		else {
			patchIndex++;
			if (patchIndex >= patchnotes.length)
				patchIndex = patchnotes.length - 1;
		}
		var noteSet = $(patchnotes.get(patchIndex));
		$("#updateNotice .main").html(noteSet.html());
		redraw();
	};
	var redraw = function () {
		if (patchIndex == null) {
			// Haven't loaded external file, assume on latest and there is a previous patch
			$("#updateNotice .pageSwap button[data-value=1]").prop("disabled", true);
		}
		else {
			$("#updateNotice .pageSwap button[data-value=0]").prop("disabled", patchIndex == 0);
			$("#updateNotice .pageSwap button[data-value=1]").prop("disabled", patchIndex == patchnotes.length - 1);
		}
	};
	var clickMethod = function (b_left) {
		// Check if we need to GET the patchnotes
		if (patchnotes == null) {
			$.get("patchnotes.html", {"_": $.now()}, function(html) {
				html = html.replace(/>\s+</g,'><');  // Strip whitespace between html tags
				patchnotes = $(html);
				patchIndex = patchnotes.length - 1;
				updateScreen(b_left);
			});
		}
		else {
			updateScreen(b_left);
		}
	};
	return {
		clickMethod: clickMethod,
		redraw: redraw,
	};
})();

var MiniNotifModule = (function() {
	var setMessage = function(divName) {
		$("#mini_notif > *").hide();
		$("#"+divName).show();
	};
	var show = function() {
		$("#mini_notif").show();
	};
	var hide = function() {
		$("#mini_notif").hide();
	};
	return {
		setMessage: setMessage,
		show: show,
		hide: hide,
	};
})();

var SelectLocationModule = (function() {
	var index;
	var mapIcon;
	var mapIconMute;
	var locations;
	var templateIcon;

	var beginSelection = function(business) {
		mapIcon = $("#"+business+"_map");
		mapIconMute = $("#"+business+"_mute");

		mapIcon.hide();
		mapIconMute.hide();

		locations = staticInfo[business].locations;

		templateIcon = mapIcon.clone();
		templateIcon.removeAttr("id");
		templateIcon.addClass("faded");

		hidePopup();
		MiniNotifModule.setMessage("selectLocation");
		MiniNotifModule.show();
		$('html, body').animate({
			scrollTop: $("#mapscreen").offset().top
		}, 300);

		$("#infotab button, #options button").on("click", cancelSelection);
		$("#mapscreen .icons-map").off("click", muteBusiness);

		index = 0;
		swapToIndex(0);
	};
	var swapToIndex = function(idx) {
		index = idx;
		$(".potential_spot").remove();
		for (let i = 0; i < locations.length; i++) {
			let fadedIcon = templateIcon.clone();

			fadedIcon.css({
				left: locations[i].x + "%",
				top: locations[i].y + "%",
			});
			fadedIcon.addClass("clickable potential_spot");
			fadedIcon.attr("data-value", i);
			fadedIcon.insertAfter("#bunker_map");
			fadedIcon.show();

			fadedIcon.on("click", function() {
				swapToIndex(i);
			});

			if (i == index) {
				fadedIcon.removeClass("faded");
				$("#selectLocation span").html(locations[i].name);
			}
		}
	};
	var incrementIndex = function() {
		index = (index + 1).mod(locations.length);
		swapToIndex(index);
	};
	var decrementIndex = function() {
		index = (index - 1).mod(locations.length);
		swapToIndex(index);
	};
	var confirmCurrentLocation = function() {
		changeInfo.map_position.x = locations[index].x;
		changeInfo.map_position.y = locations[index].y;
		showSettings();
	};
	var showSettings = function() {
		$("#infotab button, #options button").off("click", cancelSelection);
		$("#mapscreen .icons-map").on("click", muteBusiness);
		$(".potential_spot").remove();
		$("#notification").show();
		$("#overlay").show();
		redrawBusinessTabs();
		mapIcon.show();
		mapIconMute.show();
		MiniNotifModule.setMessage("pausedMiniNotif");
		if (running) {
			MiniNotifModule.hide();
		}
	};
	var cancelSelection = function() {
		showSettings();
	};
	var startManualSelection = function() {
		var outerDiv = $("#map");
		var outDim = outerDiv.offset();
		outDim.right = (outDim.left + outerDiv.width() - 15);
		outDim.bottom = (outDim.top + outerDiv.height() - 15);
		outDim.left += 15;
		outDim.top += 15;
		
		hidePopup();
		MiniNotifModule.setMessage("customLocation");
		MiniNotifModule.show();
		$('html, body').animate({
			scrollTop: $("#mapscreen").offset().top
		}, 300);

		$(".potential_spot").remove();
		mapIcon.show();
		mapIconMute.show();
		
		$(document).on("mousemove", function(e) {
			var x = (e.pageX);
			var y = (e.pageY);
			var x_allowed = (x >= outDim.left && x <= outDim.right);
			var y_allowed = (y >= outDim.top && y <= outDim.bottom);
			if (x_allowed && y_allowed) {
				mapIcon.css({
				   left: e.pageX,
				   top:  e.pageY,
				});
				mapIconMute.css({
				   left: e.pageX + 8,
				   top:  e.pageY - 8,
				});
			}
		});
		
		$("#map").on("click", function(e) {
			var final_x = 100.0 * parseInt(mapIcon.css("left"), 10) / outerDiv.width();
			var final_y = 100.0 * parseInt(mapIcon.css("top"), 10) / outerDiv.width();
			changeInfo.map_position.x = final_x;
			changeInfo.map_position.y = final_y;
			cancelSelectionManual();
		});

		var cancelSelectionManual = function() {
			$(document).off("mousemove");
			$("#map").off("click");
			$("#infotab button, #options button, #mini_notif button").off("click", cancelSelectionManual);
			cancelSelection();
		};
		$("#infotab button, #options button, #mini_notif button").on("click", cancelSelectionManual);
	};
	return {
		beginSelection: beginSelection,
		incrementIndex: incrementIndex,
		decrementIndex: decrementIndex,
		confirmCurrentLocation: confirmCurrentLocation,
		cancelSelection: cancelSelection,
		startManualSelection: startManualSelection,
	};
})();

// TODO: having this in global scope is awful, create notification module
function muteBusiness(event) {
	var business = businessRegexp.exec($(event.target).attr("id"))[1];
	if (userInfo[business].hasOwnProperty("muted")) {
		userInfo[business].muted = !userInfo[business].muted;
	}
	redrawBusinessTabs();
}

$(document).ready(function() {
	// Multiple instance check
	localStorage.openPages = Date.now();
	var onLocalStorageEvent = function(e) {
		if (e.key == "openPages") {
			// Listen if anybody else opening the same page!
			localStorage.pageAvailable = Date.now();
		}
		if (e.key == "pageAvailable") {
			alert("Warning: you have multiple tabs of the business manager open. Ensure you only have one open at a time.");
		}
	};
	window.addEventListener('storage', onLocalStorageEvent, false);
	
	// Update if necessary
	var needsUpdate = userInfo.version != defaultUserInfo.version;
	if (needsUpdate) {
		update();
	}
	
	// Check if new week
	// This is called "Friday" but actually it's Thursday in UTC
	var remindFriday = false;
	var recentFriday = new Date();
	// Use last Friday if Friday today but before 10AM UTC
	if (recentFriday.getUTCDay() === 4 && recentFriday.getUTCHours() < 10) {
		recentFriday.setUTCDate(recentFriday.getUTCDate() - 7);
	}
	// Find recent Friday
	while (recentFriday.getUTCDay() !== 4) {
		recentFriday.setUTCDate(recentFriday.getUTCDate() - 1);
	}
	// Set time to 10AM UTC
	recentFriday.setUTCHours(10);
	recentFriday.setUTCMinutes(0);
	recentFriday.setUTCSeconds(0);
	recentFriday.setUTCMilliseconds(0);
	if (recentFriday.toUTCString() != userInfo.recentFriday) {
		userInfo.recentFriday = recentFriday.toUTCString();
		remindFriday = true;
	}
	
	// Display initial notices
	displayPopup("pauseNotice");
	if (remindFriday) {
		displayPopup("newWeekNotice");
	}
	if (needsUpdate) {
		PatchModule.redraw();
		displayPopup("updateNotice");
	}
	if (newUser) {
		displayPopup("newUserNotice", true);
	}

	// Display paused mini notif
	MiniNotifModule.setMessage("pausedMiniNotif");
	
	// Window resize function
	$(window).resize(function() {
		var scr_w, scr_h, map_w, map_h;
		// Resize map
		scr_w = document.body.clientWidth;
		scr_h = document.body.clientHeight;
		if (scr_w > 600) {
			$("body").removeClass("mobile");
			$("body").addClass("desktop");
			$("#mapscreen").append($("#overlay"));
			$("#mapscreen").append($("#notification"));
			// If there is a scroll bar, make room for it
			var element = document.getElementById("infotab");
			var scrollBarWidth = element.offsetWidth - element.clientWidth;
			$("#infotab").css("width", 220 + scrollBarWidth);
			$("#mapscreen #bg").css("max-width", scr_w - 220 - scrollBarWidth);
			$("#mapscreen #bg").css("max-height", scr_h);
			// Make transparent overlay same size as map
			map_w = $("#mapscreen #bg").width();
			map_h = $("#mapscreen #bg").height();
			$("#overlay").css("width", map_w);
			$("#overlay").css("height", map_h);
			// Limit max notification height
			$("#notification .main").css("max-height", map_h - 100);
			// Remain static
			$("#notification").css("position", "absolute");
			$("#overlay").css("position", "absolute");
		} else {
			$("body").removeClass("desktop");
			$("body").addClass("mobile");
			$("#wrapper").append($("#overlay"));
			$("#wrapper").append($("#notification"));
			$("#infotab").css("width", "");
			$("#mapscreen #bg").css("max-width", scr_w);
			$("#mapscreen #bg").css("max-height", "");
			// Make transparent overlay cover screen
			$("#overlay").css("width", "100%");
			$("#overlay").css("height", "100%");
			// Revert limit on max notification height
			$("#notification .main").css("max-height", "");
			// Move with screen
			$("#notification").css("position", "fixed");
			$("#overlay").css("position", "fixed");
		}
	});
	
	// Click icon to mute business
	$("#mapscreen .icons-map").on("click", muteBusiness);
	
	// General notification settings
	$("#notification button.ok").on("click", function(event) {
		hidePopup();
	});
	
	$(".setupGUI .buttons button.cancel").on("click", function(event) {
		loadBackup();
		redrawBusinessTabs();
		redrawScreen();
		hidePopup();
	});
	
	// General input field settings
	$(".incDecButtons button.minus").on("click", function(event) {
		let inputField = $(event.target).siblings("input");
		inputField.val(function(i, oldval) {
			inputField.parent().removeClass("invalid-value");
			let minVal = parseInt($(this).attr("min"), 10);
			let value = parseInt(oldval, 10);
			if (isNaN(value)) {
				return minVal;
			}
			return Math.max(value - 1, minVal);
		});
		inputField.trigger("keyup");
	});
	
	$(".incDecButtons button.plus").on("click", function(event) {
		let inputField = $(event.target).siblings("input");
		inputField.val(function(i, oldval) {
			inputField.parent().removeClass("invalid-value");
			let maxVal = parseInt($(this).attr("max"), 10);
			let value = parseInt(oldval, 10);
			if (isNaN(value)) {
				return maxVal;
			}
			return Math.min(value + 1, maxVal);
		});
		inputField.trigger("keyup");
	});
	
	$("input").on("focus", function() {
		$(this).parent().removeClass("invalid-value");
	});
	
	$("input.integer_only").on("keydown", function(event) {
		// Only allow digits and backspace
		let digitRegexp = /^[0-9]?(?:Backspace)?$/;
		let result = digitRegexp.test(event.key);
		return result;
	});
	
	let inputChecker = function(event) {
		let input = $(event.target);
		if (input.attr("type") == "number") {
			let current = parseInt(input.val(), 10);
			console.log(current);
			if (isNaN(current)) {
				input.parent().addClass("invalid-value");
				return false
			}
		}
		return true;
	};
	
	$("input").on("focusout", inputChecker);
	
	$(".range_enforced").on("keyup", function(event) {
		var minVal = parseInt($(this).attr("min"), 10);
		var maxVal = parseInt($(this).attr("max"), 10);
		var current = parseInt($(this).val(), 10);
		if (isNaN(current)) {
			return;
		}
		if (current > maxVal) { $(this).val(maxVal); }
		if (current < minVal) { $(this).val(minVal); }
	});
	
	// Patch notes buttons
	$("#updateNotice .pageSwap button").on("click", function(event) {
		var b_left = $(event.target).attr("data-value") == 0;
		PatchModule.clickMethod(b_left);
	});
	
	// Nightclub Manager buttons
	$("#nightclubGUI button.sellsome").on("click", function(event) {
		// TODO: fix hacky validation
		let valid = true;
		let products = staticInfo["nightclub"]["products"];
		// First check if all fields are valid
		for (let i = 0; i < products.length; i++) {
			let product = products[i];
			let toSell = parseInt($("#nightclubGUI ."+product+" input[type=number]").val(), 10);
			if (isNaN(toSell)) {
				valid = false;
			}
		}
		if (!valid) {
			return;
		}
		// Then do actual modifications
		for (let i = 0; i < products.length; i++) {
			let product = products[i];
			let toSell = parseInt($("#nightclubGUI ."+product+" input").val(), 10);
			userInfo["nightclub"][product] = Math.max(userInfo["nightclub"][product] - toSell, 0);
			$("#nightclubGUI ."+product+" input").val("0");
		}
		redrawScreen();
	});
	
	$("#nightclubGUI button.sell").on("click", function(event) {
		var products = staticInfo["nightclub"]["products"];
		for (var i = 0; i < products.length; i++) {
			var product = products[i];
			userInfo["nightclub"][product] = 0;
		}
		redrawScreen();
	});
	
	// Business setupGUIs
	$("#bunker button.setup").on("click", function(event) {
		createBackup("bunker");
		
		displayPopup("bunkerSetupGUI", true);
		if (changeInfo["hide_research"]) {
			$("#bunkerSetupGUI .mode").hide();
		}
		redrawScreen();
	});
	
	$(".mcbusiness button.setup").on("click", function(event) {
		var business = $(event.target).parents(".mcbusiness").attr("id");
		$("#mcbusinessSetupGUI .heading h1").html(staticInfo[business].fullName+" Setup");
		$("#mcbusinessSetupGUI").prop("class", "setupGUI "+business);
		createBackup(business);
		
		displayPopup("mcbusinessSetupGUI", true);
		redrawScreen();
	});
	
	$(".setupGUI .own button").on("click", function(event) {
		var business = businessRegexp.exec($(event.target).parents(".setupGUI").attr("class"))[1];
		changeInfo["owned"] = !changeInfo["owned"];
		if (changeInfo["owned"]) {
			$("#"+business+"_map").css("top", userInfo[business].map_position.y+"%");
			$("#"+business+"_map").css("left", userInfo[business].map_position.x+"%");
			$("#"+business+"_map").show();
			$("#"+business+"_mute").show();
		}
		else {
			$("#"+business+"_map").hide();
			$("#"+business+"_mute").hide();
		}
		
		redrawScreen();
	});

	$(".setupGUI .position button").on("click", function(event) {
		let business = businessRegexp.exec($(event.target).parents(".setupGUI").attr("class"))[1];
		SelectLocationModule.beginSelection(business);
	});

	$("#selectLocation button[data-value=0]").on("click", function(event) {
		SelectLocationModule.decrementIndex();
	});

	$("#selectLocation button[data-value=1]").on("click", function(event) {
		SelectLocationModule.incrementIndex();
	});

	$("#selectLocation button[data-value=2]").on("click", function(event) {
		SelectLocationModule.confirmCurrentLocation();
	});

	$("#selectLocation button[data-value=3]").on("click", function(event) {
		SelectLocationModule.cancelSelection();
	});

	$("#selectLocation button[data-value=4]").on("click", function(event) {
		SelectLocationModule.startManualSelection();
	});
	
	$(".setupGUI .hide_research button").on("click", function(event) {
		changeInfo["hide_research"] = !changeInfo["hide_research"];
		if (changeInfo["hide_research"]) {
			changeInfo["mode"] = 0;
			$(".setupGUI .mode").hide();
		}
		else {
			$(".setupGUI .mode").show();
		}
		redrawScreen();
	});
	
	$(".setupGUI .mode button").on("click", function(event) {
		changeInfo["mode"] = parseInt($(event.target).attr("data-value"), 10);
		redrawScreen();
	});
	
	$(".setupGUI .upgrades button").on("click", function(event) {
		var toChange = $(event.target).attr("data-value");
		var gui = $(event.target).parents(".setupGUI").prop("id");
		var business = businessRegexp.exec($("#"+gui).prop("class"))[1];
		if (business == "nightclub") {
			changeInfo["upgrades"][toChange] = !changeInfo["upgrades"][toChange];
		} else {
			var old_upgrades = (userInfo[business].upgrades.equipment ? 1 : 0) + (userInfo[business].upgrades.staff ? 1 : 0);
			changeInfo["upgrades"][toChange] = !changeInfo["upgrades"][toChange];
			var new_upgrades = (changeInfo["upgrades"].equipment ? 1 : 0) + (changeInfo["upgrades"].staff ? 1 : 0);

			for (var type in userInfo[business]) {
				if (["supplies","product","research"].indexOf(type) > -1) {
					userInfo[business][type] = userInfo[business][type]
						/ staticInfo[business]["max"+capitalize(type)][old_upgrades]
						* staticInfo[business]["max"+capitalize(type)][new_upgrades];
				}
			}
		}
		redrawScreen();
	});

	$(".setupGUI button.apply").on("click", function(event) {
		// TODO: fix hacky validation
		let valid = true;
		var gui = $(event.target).parents(".setupGUI").prop("id");
		var business = businessRegexp.exec($("#"+gui).prop("class"))[1];
		inputs = $("#"+gui + " input[type=number]");
		for (let i = 0; i < inputs.length; i++) {
			input = $(inputs[i]);
			if (input.attr("type") == "number") {
				let current = parseInt(input.val(), 10);
				if (isNaN(current)) {
					input.addClass("invalid-value");
					valid = false;
				}
			}
		}
		if (!valid) {
			return false;
		}
		userInfo[business] = changeInfo;
		hidePopup();
		redrawBusinessTabs();
		redrawScreen();
	});
	
	$("#importExportSetupGUI .highEndCars input").on("keyup", function(event) {
		var value = $(event.target).val();
		changeInfo.highend_cars = parseInt(value, 10);
		redrawScreen();
	});
	
	$("#nightclubSetupGUI .producing button").on("click", function(event) {
		var toChange = $(event.target).attr("data-value");
		changeInfo["producing"][toChange] = !changeInfo["producing"][toChange];
		redrawScreen();
	});
	
	$("#nightclubSetupGUI .storageFloors input").on("keyup", function(event) {
		var value = $(event.target).val();
		changeInfo.storage_floors = parseInt(value, 10);
		redrawScreen();
	});

	$("#nightclubSetupGUI .sidebar button").on("click", function(event) {
		changeInfo.sidebar = !changeInfo.sidebar;
		redrawScreen();
	});
	
	$(".setupGUI .resetCooldown button").on("click", function(event) {
		var gui = $(event.target).parents(".setupGUI").prop("id");
		var business = businessRegexp.exec($("#"+gui).prop("class"))[1];
		if (userInfo[business].hasOwnProperty("cooldown")) {
			userInfo[business]["cooldown"] = 0;
		}
		else if (userInfo[business].hasOwnProperty("timestamp")) {
			userInfo[business]["timestamp"] = 0;
		}
		redrawScreen();
	});
	
	$("#wheelSetupGUI .notifyWhilePaused button").on("click", function(event) {
		changeInfo.notify_while_paused = !changeInfo.notify_while_paused;
		redrawScreen();
	});
	
	// Main setup buttons
	$("#mainSetup .buttons button.cancel").off("click");
	$("#mainSetup .buttons button.apply").off("click");
	
	$("#mainSetup .buttons button.cancel").on("click", function(event) {
		loadBackup();
		redrawBusinessTabs();
		redrawScreen();
		hidePopup();
	});
	
	$("#mainSetup .buttons button.apply").on("click", function(event) {
		// TODO: fix hacky validation
		let valid = true;
		inputs = $("#mainSetup" + " input[type=number]");
		for (let i = 0; i < inputs.length; i++) {
			input = $(inputs[i]);
			let current = parseInt(input.val(), 10);
			if (isNaN(current)) {
				input.addClass("invalid-value");
				valid = false;
			}
		}
		if (!valid) {
			return false;
		}
		userInfo.settings = changeInfo;
		notifications.lastPlayed = 0;
		redrawBusinessTabs();
		redrawScreen();
		hidePopup();
	});
	
	$("#mainSetup .hideUnowned button").on("click", function(event) {
		changeInfo.hide_unowned = !changeInfo.hide_unowned;
		if (changeInfo.hide_unowned) {
			$("#inactiveBusinesses").hide();
		}
		else {
			$("#inactiveBusinesses").show();
		}
		redrawBusinessTabs();
		redrawScreen();
	});
	
	$("#mainSetup .notificationSettings button[data-value=push]").on("click", function(event) {
		if (!changeInfo.push_notifications) {
			notify.authorize();
		}
		else {
			$("#mainSetup .notificationSettings button[data-value=push]").addClass("off");
			changeInfo.push_notifications = false;
		}
	});
	
	$("#mainSetup .audioFreq input").on("keyup", function(event) {
		var value = $(event.target).val();
		changeInfo.audio.interval = value;
		redrawScreen();
	});
	
	$("#mainSetup .audioVolume input").on("input", function(event) {
		var value = $(event.target).val();
		$("#mainSetup .audioVolume span").html(value+"%");
		changeInfo.audio.enabled = true;
		if (new Date().getTime() - notifications.lastPlayed > 1000) {
			notifications.lastPlayed = 0;
		}
		playNotification();
		changeInfo.audio.volume = value/100.0;
		redrawScreen();
	});
	
	$("#mainSetup .progressBarStyle button").on("click", function(event) {
		changeInfo.progress_bar_style = parseInt($(event.target).attr("data-value"), 10);
		redrawScreen();
	});

	$("#mainSetup .appStyle button").on("click", function (event) {
		changeInfo.app_style = parseInt($(event.target).attr("data-value"), 10);
		redrawScreen();
	});

	$("#mainSetup .dataDownload button[data-value=0]").on("click", function(event) {
		// https://stackoverflow.com/questions/19721439/
		var name = "manager_data.json";
		var file = new Blob([JSON.stringify(userInfo)], {type: "text/json"});
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveOrOpenBlob(file, name);
        }
        else {
            var a = document.getElementById("dataDownloadLink");
            a.href = URL.createObjectURL(file);
            a.download = name;
            a.click();
		}
		
		redrawScreen();
	});
	
	$("#mainSetup .dataDownload button[data-value=1]").on("click", function(event) {
		$("#fileInput").trigger("click");
	});
	$("#mainSetup .dataDownload input").on("change", function(event) {
		var reader = new FileReader();
		var file = this.files[0];
		if (file.name.split('.').pop() != "json") {
			console.log("Invalid file type!");
			return;
		}
		reader.onload = function(e) {
			userInfo = JSON.parse(reader.result);
			localStorage.setItem("userInfo", JSON.stringify(userInfo));
			window.onbeforeunload = null;
			window.location.reload(false);
		};
		reader.readAsText(file);
	});

	$("#mainSetup .dataDownload button[data-value=reset]").on("click", function(event) {
		displayPopup("resetWarning");
		redrawScreen();
	});
	
	$("#mainSetup .about button[data-value=0]").on("click", function(event) {
		PatchModule.redraw();
		displayPopup("updateNotice");
		redrawScreen();
	});
	
	// Reset dialog
	$("#resetWarning button.cancel").on("click", function(event) {
		hidePopup();
	});
	
	$("#resetWarning button.reset").on("click", function(event) {
		userInfo = jQuery.extend(true, {}, defaultUserInfo);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawBusinessTabs();
		redrawScreen();
		hidePopup(true);
	});
	
	// General sliders
	$(".slider").on("input", function(event) {
		var value = $(event.target).val();
		var type = typeRegexp.exec($(event.target).parents("tr").attr("class"))[1];
		var business = $(event.target).parents("div.information").attr("id");
		var storage_index = userInfo["nightclub"].storage_floors - 1;
		if (business == "nightclub") {
			var upgrades = userInfo["nightclub"].upgrades.equipment ? 1 : 0;
			userInfo["nightclub"][type] = (value/100)*(staticInfo["nightclub"]["max"+capitalize(type)][storage_index]);
		} else {
			var upgrades = (userInfo[business].upgrades.equipment ? 1 : 0) + (userInfo[business].upgrades.staff ? 1 : 0);
			userInfo[business][type] = (value/100)*staticInfo[business]["max"+capitalize(type)][upgrades];
		}
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawScreen();
	});
	
	// General supplies / sell buttons
	$("#infotab button.supplies, #infotab button.sell").on("click", function(event) {
		var type = typeRegexp.exec($(event.target).attr("class"))[1];
		var business = $(event.target).parents("div.information").attr("id");
		if (business == "importExport") {
			return;
		}
		var upgrades = (userInfo[business].upgrades.equipment ? 1 : 0) + (userInfo[business].upgrades.staff ? 1 : 0);
		if (type == "supplies") {
			userInfo[business]["supplies"] = staticInfo[business]["maxSupplies"][upgrades];
		}
		else {
			userInfo[business]["product"] = 0;
		}
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawScreen();
	});
	
	// Nightclub
	$("#nightclub button.modify").on("click", function() {
		displayPopup("nightclubGUI", true);
		redrawScreen();
	});
	
	$("#nightclub button.setup").on("click", function(event) {
		createBackup("nightclub");
		$("#nightclubSetupGUI .storageFloors input").val(userInfo.nightclub.storage_floors);
		displayPopup("nightclubSetupGUI", true);
		redrawScreen();
	});
	
	// Import / Export
	$("#importExport button.source").on("click", function() {
		userInfo.importExport.highend_cars = Math.min(userInfo.importExport.highend_cars + 1, 20);
		redrawScreen();
	});
	
	$("#importExport button.sell").on("click", function() {
		var tenMin = 600000;
		var toSell = parseInt($("#importExport select[name='toSell']").val(), 10);
		userInfo["importExport"]["cooldown"] = tenMin*(toSell+1);
		userInfo["importExport"]["highend_cars"] = Math.max(userInfo["importExport"]["highend_cars"] - toSell, 0);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawScreen();
	});
	
	$("#importExport button.setup").on("click", function(event) {
		createBackup("importExport");
		$("#importExportSetupGUI .highEndCars input").val(userInfo.importExport.highend_cars);
		displayPopup("importExportSetupGUI", true);
		redrawScreen();
	});
	
	// Wheel
	$("#wheel button.spin").on("click", function() {
		userInfo["wheel"]["timestamp"] = new Date().getTime();
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawScreen();
	});
	
	$("#wheel button.setup").on("click", function(event) {
		createBackup("wheel");
		
		displayPopup("wheelSetupGUI", true);
		redrawScreen();
	});
	
	// Toggle running
	$("#options button.toggle").click(function() {
		if (running == 0) {
			running = 1;
			$("#options button.toggle").removeClass("start");
			$("#options button.toggle").removeClass("green");
			$("#options button.toggle").addClass("pause");
			$("#options button.toggle").addClass("blue");
			$("#options button.toggle").html("Pause");
			lastTickTime = null;
			feesCooldown = 2880000;
			MiniNotifModule.hide();
			window.onbeforeunload = function() {
				return true;
			};
			flashIconState = false;
		}
		else {
			running = 0;
			$("#options button.toggle").removeClass("pause");
			$("#options button.toggle").removeClass("blue");
			$("#options button.toggle").addClass("start");
			$("#options button.toggle").addClass("green");
			$("#options button.toggle").html("Start");
			MiniNotifModule.show();
			displayPopup("pauseNotice");
			window.onbeforeunload = null;
		}
		redrawScreen();
	});
	// Audio
	$("#options button.audio").click(function() {
		userInfo.settings.audio.enabled = !userInfo.settings.audio.enabled;
		redrawScreen();
	});
	// Setup
	$("#options button.setup").click(function() {
		createBackup("settings");
		$("#mainSetup .audioFreq input").val(userInfo.settings.audio.interval);
		$("#mainSetup .audioVolume input").val(userInfo.settings.audio.volume * 100);
		displayPopup("mainSetup", true);
		redrawScreen();
	});
	
	window.dispatchEvent(new Event("resize"));
	
	redrawScreen();
	redrawBusinessTabs();
});

$(window).on('load', function() {
	// Fix transparent overlay not appearing because background image was not loaded in time
	window.dispatchEvent(new Event("resize"));
});

function displayPopup(divName, clearExisting) {
	$("#notification > *").hide();
	$("#"+divName).show();
	$("#notification").show();
	$("#overlay").show();
	$("body").addClass("popupOpen");
	
	if (clearExisting) {
		windowStack = [divName];
	}
	else if (windowStack[windowStack.length - 1] != divName) {
		windowStack.push(divName);
	}
}

function hidePopup(hideAll) {
	$("#notification").hide();
	$("#overlay").hide();
	$("body").removeClass("popupOpen");
	$(".invalid-value").removeClass("invalid-value");  // TODO: less hacky!
	if (hideAll) {
		windowStack = [];
	}
	else {
		windowStack.pop();
		if (windowStack.length > 0) {
			displayPopup(windowStack[windowStack.length - 1], false);
		}
	}
}

function createBackup(business) {
	backupInfo = jQuery.extend(true, {}, userInfo);  // Deep copy
	changeInfo = userInfo[business];
}

function loadBackup() {
	userInfo = backupInfo;
}

function msFormat(msTime) {
	// Returns the time in hours, minutes, seconds, (ms)
	let timeArray = [0, 0, 0, 0];
	timeArray[0] = Math.floor(msTime / (1000*60*60));
	timeArray[1] = Math.floor((msTime % (1000*60*60)) / (1000*60));
	timeArray[2] = Math.floor((msTime % (1000*60)) / 1000);
	timeArray[3] = msTime % 1000;
	return timeArray;
}

function timeFormat(timeArray, maxFigures) {
	// Converts to a string, only shows hours / minutes if necessary
	// Optionally will only show maxFigures significant parts
	// For example, maxFigures = 2 cuts off seconds if time is longer than 1 hour
	let hours = timeArray[0];
	let minutes = timeArray[1];
	let seconds = timeArray[2];

	let digits = 1;
	if (typeof maxFigures === 'undefined') {
		maxFigures = 3;
		digits = 2;
	}
	
	let s = "";

	if (hours > 0 && maxFigures > 0) {
		s += hours.toLocaleString(undefined, {minimumIntegerDigits: digits});
		s += "H ";
		maxFigures--;
		digits = 2;
	}
	if ((hours > 0 || minutes > 0) && maxFigures > 0) {
		s += minutes.toLocaleString(undefined, {minimumIntegerDigits: digits});
		s += "M ";
		maxFigures--;
		digits = 2;
	}
	if (maxFigures > 0) {
		s += seconds.toLocaleString(undefined, {minimumIntegerDigits: digits});
		s += "S ";
		maxFigures--;
		digits = 2;
	}

	// Remove last space
	s = s.slice(0, s.length - 1);
	
	return s;
}

function tick() {
	if (lastTickTime == null) {
		lastTickTime = new Date().getTime();
	}
	
	var currentTime = new Date().getTime();
	var deltaSec = (currentTime - lastTickTime) / 1000;
	lastTickTime = currentTime;
	var maxSeconds;
	var secondsRun;
	
	if (running) {
		// Bunker
		if (userInfo["bunker"]["owned"]) {
			var upgrades = (userInfo["bunker"].upgrades.equipment ? 1 : 0) + (userInfo["bunker"].upgrades.staff ? 1 : 0);
			// Manufacturing
			if (userInfo["bunker"]["mode"] == 0) {
				
				// Calculate maximum running time in seconds, then actual time
				maxSeconds = Math.min(userInfo["bunker"]["supplies"] - 0, staticInfo["bunker"]["maxProduct"][upgrades] - userInfo["bunker"]["product"]) * 60;
				secondsRun = Math.min(deltaSec, maxSeconds);
				if (secondsRun > 0) {
					userInfo["bunker"]["product"] += secondsRun/60;
					userInfo["bunker"]["supplies"] -= secondsRun/60;
				}
			}
			// Research
			else if (userInfo["bunker"]["mode"] == 2) {
				maxSeconds = Math.min(userInfo["bunker"]["supplies"] - 0, staticInfo["bunker"]["maxResearch"][upgrades] - userInfo["bunker"]["research"]) * 60;
				secondsRun = Math.min(deltaSec, maxSeconds);
				if (secondsRun > 0) {
					userInfo["bunker"]["research"] += secondsRun/60;
					userInfo["bunker"]["supplies"] -= secondsRun/60 * staticInfo["bunker"]["maxSupplies"][upgrades]/staticInfo["bunker"]["maxResearchSupplies"][upgrades];
				}
			}
			// Both
			else {
				// TODO: How does the both option even work?
				maxSeconds = Math.min(userInfo["bunker"]["supplies"] - 0, staticInfo["bunker"]["maxProduct"][upgrades] - userInfo["bunker"]["product"]) * 60;
				secondsRun = Math.min(deltaSec, maxSeconds);
				if (secondsRun > 0) {
					userInfo["bunker"]["product"] += secondsRun/120;
					userInfo["bunker"]["supplies"] -= secondsRun/120;
				}
				maxSeconds = Math.min(userInfo["bunker"]["supplies"] - 0, staticInfo["bunker"]["maxResearch"][upgrades] - userInfo["bunker"]["research"]) * 60;
				secondsRun = Math.min(deltaSec, maxSeconds);
				if (secondsRun > 0) {
					userInfo["bunker"]["research"] += secondsRun/120;
					userInfo["bunker"]["supplies"] -= secondsRun/120 * staticInfo["bunker"]["maxSupplies"][upgrades]/staticInfo["bunker"]["maxResearchSupplies"][upgrades];
				}
			}
		}
		
		// MC Businesses
		var mcbusinesses = staticInfo["mcbusinesses"];
		for (var i = 0; i < mcbusinesses.length; i++) {
			var business = mcbusinesses[i];
			var upgrades = (userInfo[business].upgrades.equipment ? 1 : 0) + (userInfo[business].upgrades.staff ? 1 : 0);
			if (userInfo[business]["owned"]) {
				maxSeconds = Math.min(userInfo[business]["supplies"] - 0, staticInfo[business]["maxProduct"][upgrades] - userInfo[business]["product"]) * 60;
				secondsRun = Math.min(deltaSec, maxSeconds);
				if (secondsRun > 0) {
					userInfo[business]["product"] += secondsRun/60;
					userInfo[business]["supplies"] -= secondsRun/60;
				}
			}
		}
		
		// Nightclub
		if (userInfo["nightclub"]["owned"]) {
			var products = staticInfo["nightclub"]["products"];
			var upgrades = userInfo["nightclub"].upgrades.equipment ? 1 : 0;
			var storage_index = userInfo["nightclub"].storage_floors - 1;
			for (var i = 0; i < products.length; i++) {
				var product = products[i];
				if (userInfo["nightclub"]["producing"][product]) {
					if (userInfo["nightclub"][product] < staticInfo["nightclub"]["max"+capitalize(product)][storage_index]) {
						userInfo["nightclub"][product] += deltaSec/60 * 1/staticInfo["nightclub"]["accrue"+capitalize(product)][upgrades];
						userInfo["nightclub"][product] = Math.min(userInfo["nightclub"][product], staticInfo["nightclub"]["max"+capitalize(product)][storage_index]);
					}
				}
			}
		}
		
		// Import / Export
		if (userInfo["importExport"]["cooldown"] > 0) {
			userInfo["importExport"]["cooldown"] = Math.max(userInfo["importExport"]["cooldown"] - deltaSec*1000, 0);
		}
		
		// Session Timer
		feesCooldown -= deltaSec*1000;
		feesCooldown = feesCooldown.mod(2880001);
	}
	
	// Save
	localStorage.setItem("userInfo", JSON.stringify(userInfo));
	
	// Draw call
	redrawScreen();
	
	// Notification call
	flashIconState = !flashIconState;
	checkNotify();
}

function redrawBusinessTabs() {
	// Separate to redrawScreen because constantly modifying divs makes it impossible to inspect element +  really inefficient
	var business_list = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub", "importExport", "wheel"];
	var some_unowned = false;
	for (var i = 0; i < business_list.length; i++) {
		var business = business_list[i];
		// Infotab
		if (userInfo[business].hasOwnProperty("owned")) {
			if (!userInfo[business].owned) {
				some_unowned = true;
				$("#"+business).appendTo("#inactiveBusinesses");
				$("#"+business).children().hide();
				$("#"+business+" .business_heading").css("margin-bottom", "0");
				$("#"+business+" .business_heading").show();
				$("#"+business+"_map").hide();
				continue;
			}
		}
		$("#"+business+" .content").show();
		$("#"+business).appendTo("#activeBusinesses");
		$("#"+business+" .business_heading").css("margin-bottom", "3px");
		
		// Map icons
		if (!userInfo[business].hasOwnProperty("map_position")) {
			continue;
		}
		var x = userInfo[business].map_position.x;
		var y = userInfo[business].map_position.y;
		$("#"+business+"_map").css("top", y+"%");
		$("#"+business+"_map").css("left", x+"%");
		$("#"+business+"_map").show();
		if (userInfo[business].hasOwnProperty("muted")) {
			if (userInfo[business].muted) {
				if ($("#"+business+"_mute").length == 0) {
					var img = $("<img id='"+business+"_mute' class='icons icons-map icons-mute'>");
					img.attr("src", "img/blank.png");
					img.insertAfter("#"+business+"_map");
					
				}
				else {
					var img = $("#"+business+"_mute");
				}
				img.css("top", "calc("+y+"% - 8px");
				img.css("left", "calc("+x+"% + 8px");
			}
			else {
				$("#"+business+"_mute").remove();
			}
		}
	}
	$("#fees").appendTo("#activeBusinesses");
	
	if (userInfo.settings.hide_unowned || !some_unowned) {
		$("#inactiveBusinesses").hide();
	}
	else {
		$("#inactiveBusinesses").show();
	}
	
	// Redo resize function in case business tab scrollbar appears / disappears
	window.dispatchEvent(new Event("resize"));
}

function redrawScreen() {	
	// Nightclub manager values
	var totalNightclubProduct = 0;
	var products = staticInfo["nightclub"]["products"];
	var storage_floors = userInfo["nightclub"].storage_floors;
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		var td = $("#nightclubGUI ."+product+" td").eq(1);
		var current = Math.round(userInfo["nightclub"][product]);
		var maxProduct = staticInfo["nightclub"]["max"+capitalize(product)][storage_floors - 1];
		td.html(current+"/"+maxProduct);
		totalNightclubProduct += current;
	}	
	var transport;
	if (totalNightclubProduct > 180) {
		transport = "Pounder";
	}
	else if (totalNightclubProduct > 90) {
		transport = "Mule";
	}
	else {
		transport = "Speedo";
	}
	
	var totalProduct = $("#nightclubGUI .total" +" td").eq(1);
	totalProduct.html(totalNightclubProduct+"</br>("+ transport+")");
	
	// setupGUI buttons
	// TODO: check active dialog box, only update if active
	// Generic
	var owned = changeInfo["owned"];
	$(".setupGUI .own button[data-value=1]").prop("disabled", owned);
	$(".setupGUI .own button[data-value=0]").prop("disabled", !owned);
	
	$(".setupGUI .position button").prop("disabled", !owned);

	if(changeInfo["upgrades"]) {
		var upgrades = changeInfo["upgrades"];
		for(var upgrade in upgrades) {
			if (upgrades[upgrade]) {
				$(".setupGUI .upgrades button[data-value=\"" + upgrade + "\"]").removeClass("off");
			} else {
				$(".setupGUI .upgrades button[data-value=\"" + upgrade + "\"]").addClass("off");
			}
		}
	}

	// Main Setup
	var hide_unowned = changeInfo["hide_unowned"];
	$("#mainSetup .hideUnowned button[data-value=1]").prop("disabled", hide_unowned);
	$("#mainSetup .hideUnowned button[data-value=0]").prop("disabled", !hide_unowned);
	
	var push_enabled = changeInfo["push_notifications"];
	if (push_enabled && notify.compatible()) {
		$("#mainSetup .notificationSettings button[data-value=push]").removeClass("off");
	}
	else {
		$("#mainSetup .notificationSettings button[data-value=push]").addClass("off");
	}
	
	var progress_bar_style = changeInfo["progress_bar_style"];
	$("#mainSetup .progressBarStyle button").eq(0).prop("disabled", progress_bar_style == 0);
	$("#mainSetup .progressBarStyle button").eq(1).prop("disabled", progress_bar_style == 1);
	$("#mainSetup .progressBarStyle button").eq(2).prop("disabled", progress_bar_style == 2);
	$("#mainSetup .progressBarStyle button").eq(3).prop("disabled", progress_bar_style == 3);

	var app_style = changeInfo["app_style"];
	$("#mainSetup .appStyle button").eq(0).prop("disabled", app_style == 0);
	$("#mainSetup .appStyle button").eq(1).prop("disabled", app_style == 1);
	
	// Bunker Setup
	var hide_research = changeInfo["hide_research"];
	$("#bunkerSetupGUI .hide_research button").eq(0).prop("disabled", hide_research);
	$("#bunkerSetupGUI .hide_research button").eq(1).prop("disabled", !hide_research);
	
	var mode = changeInfo["mode"];
	$("#bunkerSetupGUI .mode button").eq(0).prop("disabled", mode == 0);
	$("#bunkerSetupGUI .mode button").eq(1).prop("disabled", mode == 1);
	$("#bunkerSetupGUI .mode button").eq(2).prop("disabled", mode == 2);
	
	// Nightclub Setup
	var sidebar = changeInfo["sidebar"];
	$("#nightclubSetupGUI .sidebar button[data-value=1]").prop("disabled", !sidebar);
	$("#nightclubSetupGUI .sidebar button[data-value=0]").prop("disabled", sidebar);
	
	var products = staticInfo["nightclub"]["products"];
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		if (userInfo["nightclub"]["producing"][product]) {
			$("#nightclubSetupGUI .producing button[data-value=\""+product+"\"]").removeClass("off");
		}
		else {
			$("#nightclubSetupGUI .producing button[data-value=\""+product+"\"]").addClass("off");
		}
	}
	
	// Wheel setup
	var notify_while_paused = changeInfo["notify_while_paused"];
	$("#wheelSetupGUI .notifyWhilePaused button[data-value=1]").prop("disabled", notify_while_paused);
	$("#wheelSetupGUI .notifyWhilePaused button[data-value=0]").prop("disabled", !notify_while_paused);
	
	// Business sidebar progress bars
	var progressBars = $(".progress_bar");
	for (var i = 0; i < progressBars.length; i++) {
		var type = typeRegexp.exec($(progressBars[i]).parents("tr").attr("class"))[1];
		var business = $(progressBars[i]).parents("div.information").attr("id");
		var upgrades;
		if (business == "nightclub") {
			upgrades = userInfo["nightclub"].upgrades.equipment ? 1 : 0;
			
			// If downgrading upgrades, ensure current supplies don't exceed maximum for that upgrade
			userInfo["nightclub"][type] = Math.min(userInfo["nightclub"][type], staticInfo["nightclub"]["max"+capitalize(type)][storage_floors - 1])
		} else {
			upgrades = (userInfo[business].upgrades.equipment ? 1 : 0) + (userInfo[business].upgrades.staff ? 1 : 0);
		}
		//
		// Hide bunker research bar if option selected
		if (business == "bunker" && type == "research") {
			if (userInfo["bunker"]["hide_research"]) {
				$("#bunker tr.research").hide();
				continue;
			}
			$("#bunker tr.research").show();
		}
		// Hide nightclub bars if option selected and product not being produced
		else if (business == "nightclub") {
			if (userInfo.nightclub.sidebar) {
				if (!userInfo.nightclub.producing[type]) {
					$("#nightclub tr."+type).hide();
					continue;
				}
			}
			$("#nightclub tr."+type).show();
		}
		// Fill bar
		progress_bar_style = userInfo.settings["progress_bar_style"];
		if (business=="nightclub"){
			var percentage = 100.0*userInfo["nightclub"][type]/staticInfo["nightclub"]["max"+capitalize(type)][storage_floors - 1];
		} else {
			var percentage = 100.0*userInfo[business][type]/staticInfo[business]["max"+capitalize(type)][upgrades];
		}

		$("#"+business+" tr."+type+" .progress_bar .bar").css("width", percentage+"%");
		// Plain
		if (progress_bar_style == 0) {
			$("#"+business+" tr."+type).removeClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").hide();
			$("#"+business+" tr."+type+" .progress_bar span").hide();
		}
		// Five tick
		else if (progress_bar_style == 1) {
			$("#"+business+" tr."+type).removeClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").show();
			$("#"+business+" tr."+type+" .progress_bar span").hide();
		}
		// Percentage
		else if (progress_bar_style == 2) {
			$("#"+business+" tr."+type).addClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").hide();
			$("#"+business+" tr."+type+" .progress_bar span").html(Math.round(percentage)+"%");
			$("#"+business+" tr."+type+" .progress_bar span").show();
		}
		// Time remaining
		else if (progress_bar_style == 3) {
			$("#"+business+" tr."+type).addClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").hide();
			var remaining_ms;
			if (business == "nightclub") {
				remaining_ms = (1-percentage/100)*staticInfo["nightclub"]["max"+capitalize(type)][storage_floors - 1]*staticInfo["nightclub"]["accrue"+capitalize(type)][upgrades]*60*1000;
			}
			else if (type == "supplies") {
				remaining_ms = (percentage/100)*staticInfo[business]["max"+capitalize(type)][upgrades]*60*1000;
				if (business == "bunker" && userInfo.bunker.mode == 2) {
					// Fix for time remaining in research mode
					remaining_ms *= staticInfo["bunker"]["maxResearchSupplies"][upgrades]/staticInfo["bunker"]["maxSupplies"][upgrades];
				}
			}
			else {
				remaining_ms = (1-percentage/100)*staticInfo[business]["max"+capitalize(type)][upgrades]*60*1000;
			}
			var remaining_string;
			if (remaining_ms < 1000) {
				if (type == "supplies") {
					remaining_string = "None";
				}
				else {
					remaining_string = "Full";
				}
			}
			else {
				var timeArray = msFormat(remaining_ms);
				remaining_string = timeFormat(timeArray, 2);
			}
			$("#"+business+" tr."+type+" .progress_bar span").html(remaining_string);
			$("#"+business+" tr."+type+" .progress_bar span").show();
		}
	}

	// App style
	app_style = userInfo.settings["app_style"];
	if (app_style == 0) {
		$("body").removeClass("darkMode");
	} else if (app_style == 1) {
		$("body").addClass("darkMode");
	}

	// I/E cooldown
	if (userInfo["importExport"]["cooldown"] <= 0) {
		$("#importExport button.sell").attr("disabled", false);
		$("#importExport button.sell").html("Sell");
	}
	else {
		$("#importExport button.sell").attr("disabled", true);
		var t = msFormat(userInfo["importExport"]["cooldown"]);
		var s = timeFormat(t);
		$("#importExport button.sell").html(s);
	}
	var highend_cars = userInfo["importExport"]["highend_cars"];
	if (!isNaN(highend_cars)) {
		$("#importExport button.source").html("Source ("+highend_cars+")");
	}
	
	// Wheel cooldown
	if (new Date().getTime() - userInfo["wheel"]["timestamp"] > 86400000) {
		$("#wheel button.spin").attr("disabled", false);
		$("#wheel button.spin").html("Spin");
	}
	else {
		$("#wheel button.spin").attr("disabled", true);
		var t = msFormat(86400000 - (new Date().getTime() - userInfo["wheel"]["timestamp"]));
		var s = timeFormat(t);
		$("#wheel button.spin").html(s);
	}
	
	// Fees cooldown
	if (running == 0) {
		$("#fees button").html("Not in Session");
	}
	else {
		var t = msFormat(feesCooldown);
		var s = timeFormat(t);
		$("#fees button").html(s);
	}
	
	// Options
	if (userInfo.settings.audio.enabled) {
		$("#options button.audio").removeClass("off");
	}
	else {
		$("#options button.audio").addClass("off");
	}
}

// Check if user needs to be notified
function checkNotify() {
	// Wheel
	if (running || userInfo.wheel.notify_while_paused) {
		if (new Date().getTime() - userInfo["wheel"]["timestamp"] > 86400000) {
			flashIcon("wheel");
			playNotification("wheel", "GTA V Business Manager", "The Lucky Wheel is ready to be spun.");
		}
		else {
			flashIcon("wheel", false);
		}
	}
	
	// No flashing if not running
	if (!running) {
		for (item in userInfo) {
			if (userInfo[item].hasOwnProperty("map_position")) {
				// Workaround for wheel flashing while paused
				if (item == "wheel") {
					if (userInfo.wheel.notify_while_paused) {
						continue;
					}
				}
				flashIcon(item, false);
			}
		}
		return;
	}
	
	// Bunker
	if (userInfo.bunker.owned) {
		if (userInfo.bunker.product >= staticInfo.bunker.maxProduct && (userInfo.bunker.mode == 0 || userInfo.bunker.mode == 1)) {
			flashIcon("bunker");
			playNotification("bunker", "GTA V Business Manager", "Your Bunker has reached maximum product and is ready to sell.");
		}
		else if (userInfo.bunker.research >= staticInfo.bunker.maxResearch && (userInfo.bunker.mode == 2 || userInfo.bunker.mode == 1)) {
			flashIcon("bunker");
			playNotification("bunker", "GTA V Business Manager", "Your Bunker has finished researching an item.");
		}
		else if (userInfo.bunker.supplies <= 0) {
			flashIcon("bunker");
			playNotification("bunker", "GTA V Business Manager", "Your Bunker has run out of supplies.");
		}
		else {
			flashIcon("bunker", false);
		}
	}
	
	// MC Businesses
	for (idx in staticInfo.mcbusinesses) {
		business = staticInfo.mcbusinesses[idx];
		if (userInfo[business].owned) {
			if (userInfo[business].product >= staticInfo[business].maxProduct) {
				flashIcon(business);
				playNotification(business, "GTA V Business Manager", "Your "+staticInfo[business].fullName+" business has reached maximum product and is ready to sell.");
			}
			else if (userInfo[business].supplies <= 0) {
				flashIcon(business);
				playNotification(business, "GTA V Business Manager", "Your "+staticInfo[business].fullName+" business has run out of supplies.");
			}
			else {
				flashIcon(business, false);
			}
		}
	}
	
	// Nightclub
	var products = staticInfo.nightclub.products;
	var flashed = false;
	var storage_floors = userInfo["nightclub"].storage_floors;
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		if (userInfo["nightclub"]["producing"][product]) {
			if (userInfo.nightclub[product] >= staticInfo.nightclub["max"+capitalize(product)][storage_floors - 1]) {
				flashed = true;
				flashIcon("nightclub");
				playNotification("nightclub", "GTA V Business Manager", "Your Nightclub is at maximum capacity in one or more products.");
			}
		}
	}
	if (!flashed) {
		flashIcon("nightclub", false);
	}
}

// Handle flash state of map icon
function flashIcon(business, enable = true) {
	var icon = $("#"+business+"_map");
	if (!enable) {
		icon.removeClass("flash");
		return;
	}
	if (flashIconState) {
		icon.addClass("flash");
	}
	else {
		icon.removeClass("flash");
	}
}

// Handle deciding to play audio / push notifications
function playNotification(business, title, body) {
	if (business != null) {
		if (!userInfo.settings.audio.enabled || userInfo[business].muted) {
			return;
		}
	}
	var time = new Date().getTime();
	// Push notification
	if (notify.compatible() && userInfo.settings.push_notifications && title != null) {
		if (time - notifications.lastPlayedDict[business] > 60000*userInfo.settings.audio.interval) {
			notify.show(title, body, business);
			notifications.lastPlayedDict[business] = time;
		}
	}
	// Audio notification
	if (time - notifications.lastPlayed > 60000*userInfo.settings.audio.interval) {
		var audio = $("audio#notification_ding")[0]
		audio.pause();
		audio.currentTime = 0;
		audio.volume = userInfo.settings.audio.volume;
		audio.play();
		notifications.lastPlayed = time;
	}
}

// Handle sending push notifications
window.notify = {
	list: [],
	id: 0,
	registered: false,
	log: function(msg) {
		console.log(msg);
	},
	compatible: function() {
		if (typeof Notification === 'undefined') {
			return false;
		}
		return true;
	},
	authorize: function() {
		if (notify.compatible()) {
			Notification.requestPermission(function(permission) {
				notify.log("Permission to display: "+permission);
				if (permission === "granted") {
					notify.show("Testing Push Notifications", "If you can see this, you're good to go.", "forgery");
					$("#mainSetup .notificationSettings button[data-value=push]").removeClass("off");
					changeInfo.push_notifications = true;
				}
				if (permission === "denied" || permission === "default") {
					displayPopup("pushDeniedNotice");
				}
			});
		}
		else {
			alert("Unfortunately, push notifications are not available for your browser.");
		}
	},
	show: function(title, body, business) {
		if (notify.compatible()) {
			// TODO:
			if (!this.registered) {
				navigator.serviceWorker.register('./sw.js');
				registered = true;
			}
			navigator.serviceWorker.ready.then(function(registration) {
				notify.id++;
				var id = notify.id;
				notify.list[id] = registration.showNotification(title, {
					body: body,
					tag: business,
					icon: "img/"+business+".png",
					lang: "",
					dir: "auto",
				});
				notify.log("Notification #"+id+" queued for display");
				notify.list[id].onclick = function() { notify.logEvent(id, "clicked"); };
				notify.list[id].onshow  = function() { notify.logEvent(id, "showed");  };
				notify.list[id].onerror = function() { notify.logEvent(id, "errored"); };
				notify.list[id].onclose = function() { notify.logEvent(id, "closed");  };
				
				notify.log("Created a new notification...");
				notify.log(notify.list[id]);
				});
			
		}
		else {
			notify.log("Notifications not supported, ignoring.");
		}
	},
	logEvent: function(id, event) {
		notify.log("Notification #"+id+" "+event);
	}
};
