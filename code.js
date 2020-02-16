var userInfo;

var defaultUserInfo = {
	version: "1.6.0",
	recentFriday: 0,
	settings: {
		hide_unowned: false,
		audio: {
			enabled: true,
			volume: 1,
			interval: 3,
		},
		progress_bar_style: 1,
	},
	bunker: {
		name: "Bunker",
		owned: false,
		muted: false,
		product: 0,
		research: 0,
		supplies: 0,
		mode: 0,
		hide_research: 0,
		map_position: {
			x: 58.47,
			y: 49.49,
		},
	},
	coke: {
		name: "Cocaine",
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		map_position: {
			x: 48.94,
			y: 38.73,
		},
	},
	meth: {
		name: "Meth",
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		map_position: {
			x: 47.40,
			y: 47.62,
		},
	},
	cash: {
		name: "Counterfeit Cash",
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		map_position: {
			x: 50.92,
			y: 45.00,
		},
	},
	weed: {
		name: "Weed",
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		map_position: {
			x: 64.02,
			y: 51.74,
		},
	},
	forgery: {
		name: "Document Forgery",
		owned: false,
		muted: false,
		product: 0,
		supplies: 0,
		map_position: {
			x: 64.67,
			y: 38.59,
		},
	},
	nightclub: {
		name: "Nightclub",
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
		map_position: {
			x: 36.30,
			y: 76.79,
		},
	},
	importExport: {
		name: "Import / Export",
		owned: false,
		highend_cars: 0,
		cooldown: 0,
		map_position: {
			x: 53.86,
			y: 82.30,
		},
	},
	wheel: {
		name: "Lucky Wheel",
		owned: true,
		muted: false,
		notify_when_paused: true, 
		timestamp: 0,
		map_position: {
			x: 53.89,
			y: 66.46,
		},
	},
}

var newUser = false;

if (localStorage.getItem("userInfo") == null) {
	userInfo = defaultUserInfo;
	newUser = true;
}
else {
	userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

var backupInfo = {};
var changeInfo = {};

var feesCooldown = 0;

var notifications = {
	lastPlayed: 0,
}
var flashIconState = true;

var staticInfo = {
	mcbusinesses: ["coke", "meth", "cash", "weed", "forgery"],
	bunker: {
		maxProduct: 750,
		maxResearch: 210,
		maxSupplies: 150,
	},
	coke: {
		maxProduct: 300,
		maxSupplies: 120,
	},
	meth: {
		maxProduct: 360,
		maxSupplies: 144,
	},
	cash: {
		maxProduct: 320,
		maxSupplies: 160,
	},
	weed: {
		maxProduct: 320,
		maxSupplies: 144,
	},
	forgery: {
		maxProduct: 180,
		maxSupplies: 150,
	},
	nightclub: {
		products: ["cargo", "sporting", "imports", "pharma", "creation", "organic", "copying"],
		maxCargo: 50,
		maxSporting: 100,
		maxImports: 10,
		maxPharma: 20,
		maxCreation: 40,
		maxOrganic: 80,
		maxCopying: 60,
		accrueCargo: 70,
		accrueSporting: 40,
		accrueImports: 120,
		accruePharma: 60,
		accrueCreation: 30,
		accrueOrganic: 20,
		accrueCopying: 15,
	},
}

var typeRegexp = /^.*(product|research|supplies|sell|cargo|sporting|imports|pharma|creation|organic|copying).*$/;
var businessRegexp = /^.*(bunker|coke|meth|cash|weed|forgery|nightclub|importExport|wheel).*$/;

var intervalID = setInterval(tick, 1000);
var running = 0;

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

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
	// TODO:
	//if (userInfo.version == "1.5.3") {
	//	userInfo.recentFriday = 0;
	//  userInfo.wheel.notify_when_paused = true;
	//	userInfo.version = "1.6.0";
	//}
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
	
	// Display notice
	if (newUser) {
		displayPopup("newUserNotice");
	}
	else if (userInfo.version != defaultUserInfo.version) {
		update();
		displayPopup("updateNotice");
	}
	else {
		displayPopup("pauseNotice");
	}
	
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
			$("#mapscreen #bg").css("max-width", scr_w - 220);
			$("#mapscreen #bg").css("max-height", scr_h);
			// Make transparent overlay same size as map
			map_w = $("#mapscreen #bg").width();
			map_h = $("#mapscreen #bg").height();
			$("#overlay").css("width", map_w);
			$("#overlay").css("height", map_h);
			// Remain static
			$("#notification").css("position", "absolute");
			$("#overlay").css("position", "absolute");
		} else {
			$("body").removeClass("desktop");
			$("body").addClass("mobile");
			$("#wrapper").append($("#overlay"));
			$("#wrapper").append($("#notification"));
			$("#mapscreen #bg").css("max-width", scr_w);
			$("#mapscreen #bg").css("max-height", "unset");
			// Make transparent overlay cover screen
			$("#overlay").css("width", scr_w);
			$("#overlay").css("height", scr_h);
			// Move with screen
			$("#notification").css("position", "fixed");
			$("#overlay").css("position", "fixed");
		}
	});
	
	function muteBusiness(event) {
		var business = businessRegexp.exec($(event.target).attr("id"))[1];
		if (userInfo[business].hasOwnProperty("muted")) {
			userInfo[business].muted = !userInfo[business].muted;
		}
		redrawBusinessTabs();
	}
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
		var inputField = $(event.target).siblings("input");
		inputField.val(function(i, oldval) {
			var minVal = parseInt($(this).attr("min"), 10);
			return Math.max(parseInt(oldval, 10) - 1, minVal);
		});
		inputField.trigger("keyup");
	});
	
	$(".incDecButtons button.plus").on("click", function(event) {
		var inputField = $(event.target).siblings("input");
		inputField.val(function(i, oldval) {
			var maxVal = parseInt($(this).attr("max"), 10);
			return Math.min(parseInt(oldval, 10) + 1, maxVal);
		});
		inputField.trigger("keyup");
	});
	
	$(".integer_only").on("keyup", function(event) {
		var current = Math.round(parseInt($(this).val(), 10));
		if (isNaN(current)) {
			return;
		}
		$(this).val(current);
	});
	
	$(".range_enforced").on("keyup", function(event) {
		var minVal = parseInt($(this).attr("min"), 10);
		var maxVal = parseInt($(this).attr("max"), 10);
		var current = parseInt($(this).val(), 10);
		if (isNaN(current)) {
			return;
		}
		if (current > maxVal) { $(this).val(maxVal); var changed = true; }
		if (current < minVal) { $(this).val(minVal); var changed = true; }
	});
	
	// Nightclub Manager buttons
	$("#nightclubGUI button.sellsome").on("click", function(event) {
		var products = staticInfo["nightclub"]["products"];
		for (var i = 0; i < products.length; i++) {
			var product = products[i];
			var toSell = $("#nightclubGUI ."+product+" input").val();
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
		
		displayPopup("bunkerSetupGUI");
		if (changeInfo["hide_research"]) {
			$("#bunkerSetupGUI .mode").hide();
		}
		redrawScreen();
	});
	
	$(".mcbusiness button.setup").on("click", function(event) {
		var business = $(event.target).parents(".mcbusiness").attr("id");
		$("#mcbusinessSetupGUI .heading h1").html(userInfo[business].name+" Setup");
		$("#mcbusinessSetupGUI").prop("class", "setupGUI "+business);
		createBackup(business);
		
		displayPopup("mcbusinessSetupGUI");
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
		var business = businessRegexp.exec($(event.target).parents(".setupGUI").attr("class"))[1];
		var toMove = $("#"+business+"_map");
		var toMoveMute = $("#"+business+"_mute");
		var outerDiv = $("#map");
		var outDim = outerDiv.offset();
		outDim.right = (outDim.left + outerDiv.width() - 15);
		outDim.bottom = (outDim.top + outerDiv.height() - 15);
		outDim.left += 15;
		outDim.top += 15;
		
		$("#notification").hide();
		$("#overlay").hide();
		$("#mapscreen .icons-map").off("click");
		$("#mini_notif p").html("Click to select the location.");
		$('html, body').animate({
			scrollTop: $("#mapscreen").offset().top
		}, 300);
		
		$(document).on("mousemove", function(e) {
			var x = (e.clientX);
			var y = (e.clientY);
			var x_allowed = (x >= outDim.left && x <= outDim.right);
			var y_allowed = (y >= outDim.top && y <= outDim.bottom);
			if (x_allowed && y_allowed) {
				toMove.css({
				   left: e.pageX,
				   top:  e.pageY,
				});
				toMoveMute.css({
				   left: e.pageX + 8,
				   top:  e.pageY - 8,
				});
			}
		});
		
		var clicks = 0;
		$("#mapscreen").on("click", function(e) {
			var final_x = 100.0 * parseInt(toMove.css("left"), 10) / outerDiv.width();
			var final_y = 100.0 * parseInt(toMove.css("top"), 10) / outerDiv.width();
			changeInfo["map_position"].x = final_x;
			changeInfo["map_position"].y = final_y;
		});
		
		$("body").on("click", function(e) {
			if (clicks == 0) {
				clicks++;
				return;
			}
			toMove.css("top", changeInfo["map_position"].y+"%");
			toMove.css("left", changeInfo["map_position"].x+"%");
			$("#mapscreen").off("click");
			$("body").off("click");
			$(document).off("mousemove");
			$("#notification").show();
			$("#overlay").show();
			$("#mini_notif p").html("The business manager is paused.");  // TODO: make resetting this less hacky
			$("#mapscreen .icons-map").on("click", muteBusiness);
		});
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
	
	$(".setupGUI button.apply").on("click", function(event) {
		var gui = $(event.target).parents(".setupGUI").prop("id");
		var business = businessRegexp.exec($("#"+gui).prop("class"))[1];
		userInfo[business] = changeInfo;
		$("#notification").hide();
		$("#overlay").hide();
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
	
	// Main setup buttons
	$("#mainSetup .buttons button.cancel").off("click");
	$("#mainSetup .buttons button.apply").off("click");
	
	$("#mainSetup .buttons button.reset").on("click", function(event) {
		displayPopup("resetWarning");
		redrawScreen();
	});
	
	$("#mainSetup .buttons button.cancel").on("click", function(event) {
		loadBackup();
		redrawBusinessTabs();
		redrawScreen();
		$("#notification").hide();
		$("#overlay").hide();
	});
	
	$("#mainSetup .buttons button.apply").on("click", function(event) {
		userInfo.settings = changeInfo;
		notifications.lastPlayed = 0;
		redrawBusinessTabs();
		redrawScreen();
		$("#notification").hide();
		$("#overlay").hide();
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
	
	$("#mainSetup .dataDownload button[data-value=0]").on("click", function(event) {
		var data_href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userInfo));
		var dlAnchorElem = document.getElementById("dataDownloadLink");
		dlAnchorElem.setAttribute("href", data_href);
		dlAnchorElem.setAttribute("download", "manager_data.json");
		dlAnchorElem.click();
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
		}
		reader.readAsText(file);
	});
	
	$("#mainSetup .about button").on("click", function(event) {
		displayPopup("updateNotice");
		redrawScreen();
	});
	
	// Reset
	$("#resetWarning button.cancel").on("click", function(event) {
		$("#notification").hide();
		$("#overlay").hide();
	});
	
	$("#resetWarning button.reset").on("click", function(event) {
		userInfo = jQuery.extend(true, {}, defaultUserInfo);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawBusinessTabs();
		redrawScreen();
		$("#notification").hide();
		$("#overlay").hide();
	});
	
	// General sliders
	$(".slider").on("input", function(event) {
		var value = $(event.target).val();
		var type = typeRegexp.exec($(event.target).parents("tr").attr("class"))[1];
		var business = $(event.target).parents("div.information").attr("id");
		userInfo[business][type] = (value/100)*staticInfo[business]["max"+capitalize(type)];
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
		if (type == "supplies") {
			userInfo[business]["supplies"] = staticInfo[business]["maxSupplies"];
		}
		else {
			userInfo[business]["product"] = 0;
		}
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		redrawScreen();
	});
	
	// Nightclub
	$("#nightclub button.modify").on("click", function() {
		displayPopup("nightclubGUI");
		redrawScreen();
	});
	
	$("#nightclub button.setup").on("click", function(event) {
		createBackup("nightclub");
		
		displayPopup("nightclubSetupGUI");
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
		displayPopup("importExportSetupGUI");
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
		
		displayPopup("wheelSetupGUI");
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
			feesCooldown = 2880000;
			$("#mini_notif").hide();
			$("#notification").hide();
			$("#overlay").hide();
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
			$("#mini_notif").show();
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
		displayPopup("mainSetup");
		redrawScreen();
	});
	
	window.dispatchEvent(new Event("resize"));
	
	redrawScreen();
	redrawBusinessTabs();
});

$(window).on("load", function() {
	window.dispatchEvent(new Event("resize"));
});

function displayPopup(divName) {
	$("#notification > *").hide();
	$("#"+divName).show();
	$("#notification").show();
	$("#overlay").show();
}

function hidePopup(divName = null) {
	$("#notification").hide();
	$("#overlay").hide();
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
	var timeArray = [0, 0, 0, 0];
	timeArray[0] = Math.floor(msTime / (1000*60*60));
	timeArray[1] = Math.floor((msTime % (1000*60*60)) / (1000*60));
	timeArray[2] = Math.floor((msTime % (1000*60)) / 1000);
	timeArray[3] = msTime % 1000;
	return timeArray;
}

function timeFormat(timeArray) {
	var hours = (timeArray[0]).toLocaleString(undefined, {minimumIntegerDigits: 2});
	var minutes = (timeArray[1]).toLocaleString(undefined, {minimumIntegerDigits: 2});
	var seconds = (timeArray[2]).toLocaleString(undefined, {minimumIntegerDigits: 2});
	var s = "";
	if (hours > 0) {
		s += hours + "H ";
	}
	if (hours > 0 || minutes > 0) {
		s += minutes + "M ";
	}
	s += seconds + "S";
	return s;
}

function tick() {
	if (running) {
		// Bunker
		if (userInfo["bunker"]["owned"] && userInfo["bunker"]["supplies"] > 0) {
			// Manufacturing
			if (userInfo["bunker"]["mode"] == 0) {
				if (userInfo["bunker"]["product"] < staticInfo["bunker"]["maxProduct"]) {
					userInfo["bunker"]["product"] += 1/60;
					userInfo["bunker"]["supplies"] -= 1/60;
				}
			}
			// Research
			else if (userInfo["bunker"]["mode"] == 2) {
				if (userInfo["bunker"]["research"] < staticInfo["bunker"]["maxResearch"]) {
					userInfo["bunker"]["research"] += 1/60;
					userInfo["bunker"]["supplies"] -= 1/60 * 150/350;
				}
			}
			// Both
			else {
				if (userInfo["bunker"]["product"] < staticInfo["bunker"]["maxProduct"]) {
					userInfo["bunker"]["product"] += 1/120;
					userInfo["bunker"]["supplies"] -= 1/120;
				}
				if (userInfo["bunker"]["research"] < staticInfo["bunker"]["maxResearch"]) {
					userInfo["bunker"]["research"] += 1/120;
					userInfo["bunker"]["supplies"] -= 1/120 * 150/350;
				}
				
			}
		}
		
		// MC Businesses
		var mcbusinesses = staticInfo["mcbusinesses"];
		for (var i = 0; i < mcbusinesses.length; i++) {
			var business = mcbusinesses[i];
			if (userInfo[business]["owned"] && userInfo[business]["product"] < staticInfo[business]["maxProduct"]) {
				if (userInfo[business]["supplies"] > 0) {
					userInfo[business]["product"] += 1/60;
					userInfo[business]["supplies"] -= 1/60;
				}
			}
		}
		
		// Nightclub
		if (userInfo["nightclub"]["owned"]) {
			var products = staticInfo["nightclub"]["products"];
			for (var i = 0; i < products.length; i++) {
				var product = products[i];
				if (userInfo["nightclub"]["producing"][product]) {
					if (userInfo["nightclub"][product] < staticInfo["nightclub"]["max"+capitalize(product)]) {
						userInfo["nightclub"][product] += 1/60*1/staticInfo["nightclub"]["accrue"+capitalize(product)];
						userInfo["nightclub"][product] = Math.min(userInfo["nightclub"][product], staticInfo["nightclub"]["max"+capitalize(product)]);
					}
				}
			}
		}
		
		// Import / Export
		if (userInfo["importExport"]["cooldown"] > 0) {
			userInfo["importExport"]["cooldown"] = Math.max(userInfo["importExport"]["cooldown"] - 1000, 0);
		}
	}
	
	// Save
	localStorage.setItem("userInfo", JSON.stringify(userInfo));
	
	// Draw call
	redrawScreen();
	
	// Notification call
	flashIconState = !flashIconState;
	notify();
}

function redrawBusinessTabs() {
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
					img.css("top", "calc("+y+"% - 8px");
					img.css("left", "calc("+x+"% + 8px");
				}
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
}

function redrawScreen() {
	// Nightclub manager values
	var products = staticInfo["nightclub"]["products"];
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		var td = $("#nightclubGUI ."+product+" td").eq(1);
		var current = Math.round(userInfo["nightclub"][product]);
		var maxProduct = staticInfo["nightclub"]["max"+capitalize(product)];
		td.html(current+"/"+maxProduct);
	}
	
	// setupGUI buttons
	var owned = changeInfo["owned"];
	$(".setupGUI .own button[data-value=1]").prop("disabled", owned);
	$(".setupGUI .own button[data-value=0]").prop("disabled", !owned);
	
	$(".setupGUI .position button").prop("disabled", !owned);
	
	var hide_unowned = changeInfo["hide_unowned"];
	$("#mainSetup .hideUnowned button[data-value=1]").prop("disabled", hide_unowned);
	$("#mainSetup .hideUnowned button[data-value=0]").prop("disabled", !hide_unowned);
	
	var hide_research = changeInfo["hide_research"];
	$("#bunkerSetupGUI .hide_research button").eq(0).prop("disabled", hide_research);
	$("#bunkerSetupGUI .hide_research button").eq(1).prop("disabled", !hide_research);
	
	var mode = changeInfo["mode"];
	$("#bunkerSetupGUI .mode button").eq(0).prop("disabled", mode == 0);
	$("#bunkerSetupGUI .mode button").eq(1).prop("disabled", mode == 1);
	$("#bunkerSetupGUI .mode button").eq(2).prop("disabled", mode == 2);
	
	var sidebar = changeInfo["sidebar"];
	$("#nightclubSetupGUI .sidebar button[data-value=1]").prop("disabled", !sidebar);
	$("#nightclubSetupGUI .sidebar button[data-value=0]").prop("disabled", sidebar);
	
	var progress_bar_style = changeInfo["progress_bar_style"];
	$("#mainSetup .progressBarStyle button").eq(0).prop("disabled", progress_bar_style == 0);
	$("#mainSetup .progressBarStyle button").eq(1).prop("disabled", progress_bar_style == 1);
	$("#mainSetup .progressBarStyle button").eq(2).prop("disabled", progress_bar_style == 2);
	$("#mainSetup .progressBarStyle button").eq(3).prop("disabled", progress_bar_style == 3);
	
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
	
	// Business sidebar progress bars
	var progressBars = $(".progress_bar");
	for (var i = 0; i < progressBars.length; i++) {
		var type = typeRegexp.exec($(progressBars[i]).parents("tr").attr("class"))[1];
		var business = $(progressBars[i]).parents("div.information").attr("id");
		if (business == "bunker" && type == "research") {
			if (userInfo["bunker"]["hide_research"]) {
				$("#bunker tr.research").hide();
				continue;
			}
			$("#bunker tr.research").show();
		}
		else if (business == "nightclub") {
			if (userInfo.nightclub.sidebar) {
				if (!userInfo.nightclub.producing[type]) {
					$("#nightclub tr."+type).hide();
					continue;
				}
			}
			$("#nightclub tr."+type).show();
		}
		progress_bar_style = userInfo.settings["progress_bar_style"];
		var percentage = 100.0*userInfo[business][type]/staticInfo[business]["max"+capitalize(type)];
		$("#"+business+" tr."+type+" .progress_bar .bar").css("width", percentage+"%");
		if (progress_bar_style == 0) {
			$("#"+business+" tr."+type).removeClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").hide();
			$("#"+business+" tr."+type+" .progress_bar span").hide();
		}
		else if (progress_bar_style == 1) {
			$("#"+business+" tr."+type).removeClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").show();
			$("#"+business+" tr."+type+" .progress_bar span").hide();
		}
		else if (progress_bar_style == 2) {
			$("#"+business+" tr."+type).addClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").hide();
			$("#"+business+" tr."+type+" .progress_bar span").html(Math.round(percentage)+"%");
			$("#"+business+" tr."+type+" .progress_bar span").show();
		}
		else if (progress_bar_style == 3) {
			$("#"+business+" tr."+type).addClass("big");
			$("#"+business+" tr."+type+" .progress_bar .fivetick").hide();
			var remaining_ms;
			if (business == "nightclub") {
				remaining_ms = (1-percentage/100)*staticInfo["nightclub"]["max"+capitalize(type)]*staticInfo["nightclub"]["accrue"+capitalize(type)]*60*1000;
			}
			else if (type == "supplies") {
				remaining_ms = (percentage/100)*staticInfo[business]["max"+capitalize(type)]*60*1000;
				if (business == "bunker" && userInfo.bunker.mode == 2) {
					remaining_ms *= 350/150;
				}
			}
			else {
				remaining_ms = (1-percentage/100)*staticInfo[business]["max"+capitalize(type)]*60*1000;
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
				if (timeArray[0] > 0) {
					remaining_string = timeArray[0] + "+ H";
				}
				else if (timeArray[1] > 0) {
					remaining_string = timeArray[1] + " M";
				}
				else {
					remaining_string = timeArray[2] + " S";
				}
			}
			$("#"+business+" tr."+type+" .progress_bar span").html(remaining_string);
			$("#"+business+" tr."+type+" .progress_bar span").show();
		}
	}
	
	// I/E cooldown
	if (userInfo["importExport"]["cooldown"] <= 0) {
		$("#importExport button.sell").attr("disabled", false);
	}
	else {
		$("#importExport button.sell").attr("disabled", true);
		var t = msFormat(userInfo["importExport"]["cooldown"]);
		var s = timeFormat(t);
		$("#importExport button.sell").html(s);
	}
	var highend_cars = userInfo["importExport"]["highend_cars"];
	$("#importExport button.source").html("Source ("+highend_cars+")");
	
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
		if (feesCooldown <= 0) {
			feesCooldown = 2880000;
		}
		var t = msFormat(feesCooldown);
		var s = timeFormat(t);
		$("#fees button").html(s);
		feesCooldown -= 1000;
	}
	
	// Options
	if (userInfo.settings.audio.enabled) {
		$("#options button.audio").removeClass("off");
	}
	else {
		$("#options button.audio").addClass("off");
	}
	
	//window.dispatchEvent(new Event("resize"));
}

function notify() {
	// No flashing if not running
	if (!running) {
		for (item in userInfo) {
			if (userInfo[item].hasOwnProperty("map_position")) {
				flashIcon(item, false);
			}
		}
		return;
	}
	
	// Bunker
	if (userInfo.bunker.owned) {
		if (userInfo.bunker.product >= staticInfo.bunker.maxProduct && (userInfo.bunker.mode == 0 || userInfo.bunker.mode == 1)) {
			flashIcon("bunker");
			playNotification("bunker");
		}
		else if (userInfo.bunker.research >= staticInfo.bunker.maxResearch && (userInfo.bunker.mode == 2 || userInfo.bunker.mode == 1)) {
			flashIcon("bunker");
			playNotification("bunker");
		}
		else if (userInfo.bunker.supplies <= 0) {
			flashIcon("bunker");
			playNotification("bunker");
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
				playNotification(business);
			}
			else if (userInfo[business].supplies <= 0) {
				flashIcon(business);
				playNotification(business);
			}
			else {
				flashIcon(business, false);
			}
		}
	}
	
	// Nightclub
	var products = staticInfo.nightclub.products;
	var flashed = false;
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		if (userInfo["nightclub"]["producing"][product]) {
			if (userInfo.nightclub[product] >= staticInfo.nightclub["max"+capitalize(product)]) {
				flashed = true;
				flashIcon("nightclub");
				playNotification("nightclub");
			}
		}
	}
	if (!flashed) {
		flashIcon("nightclub", false);
	}
	
	// Wheel
	if (new Date().getTime() - userInfo["wheel"]["timestamp"] > 86400000) {
		flashIcon("wheel");
		playNotification("wheel");
	}
	else {
		flashIcon("wheel", false);
	}
}

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

function playNotification(business) {
	if (business != null) {
		if (!userInfo.settings.audio.enabled || userInfo[business].muted) {
			return;
		}
	}
	if (new Date().getTime() - notifications.lastPlayed > 60000*userInfo.settings.audio.interval) {
		var audio = $("audio#notification_ding")[0]
		audio.pause();
		audio.currentTime = 0;
		audio.volume = userInfo.settings.audio.volume;
		audio.play();
		notifications.lastPlayed = new Date().getTime();
	}
}