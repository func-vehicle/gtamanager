import React from 'react';

export let defaultUserInfo = {
	version: "1.10.2",
	recentFriday: 0,
	settings: {
		hide_unowned: false,
		push_notifications: false,
		audio: {
			enabled: true,
			volume: 1,
			interval: 3,
		},
		progress_bar_style: 2,
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
		muted: true,
		product: 50,
		supplies: 20,
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
};

export const InfoContext = React.createContext({
	userInfo: defaultUserInfo,
});

export const staticInfo = {
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
		maxCreation: [8, 16, 24, 32, 40],
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

export function shouldUpdate(userInfo) {
	return userInfo.version !== defaultUserInfo.version;
}

export function updateUserInfo(userInfo) {
	if (userInfo.version === "1.0.0") {
		userInfo.audio = {enabled: true};
		userInfo.bunker.name = "Bunker";
		userInfo.coke.name = "Cocaine";
		userInfo.meth.name = "Meth";
		userInfo.cash.name = "Counterfeit Cash";
		userInfo.weed = Object.assign({}, defaultUserInfo.weed);  // This is bad, as defaultUserInfo has changed with updates
		userInfo.forgery = Object.assign({}, defaultUserInfo.forgery);  // Nobody should be on this version though
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
	if (userInfo.version === "1.1.0") {
		userInfo.settings = Object.assign({}, defaultUserInfo.settings);
		userInfo.settings.audio.enabled = userInfo.audio.enabled;
		delete userInfo.audio;
		userInfo.nightclub.sidebar = true;
		userInfo.nightclub.organic = 0;
		userInfo.nightclub.copying = 0;
		userInfo.nightclub.producing.organic = false;
		userInfo.nightclub.producing.copying = false;
		userInfo.version = "1.2.0";
	}
	if (userInfo.version === "1.2.0") {
		userInfo.settings.progress_bar_style = 0;
		userInfo.version = "1.3.0";
	}
	if (userInfo.version === "1.3.0") {
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
	if (userInfo.version === "1.4.0") {
		userInfo.version = "1.5.0";
	}
	if (userInfo.version === "1.5.0") {
		if (userInfo.settings.progress_bar_style === 0) {
			userInfo.settings.progress_bar_style = 1;
		}
		userInfo.version = "1.5.3";
	}
	if (userInfo.version === "1.5.3") {
		userInfo.recentFriday = 0;
		userInfo.settings.push_notifications = false;
		userInfo.wheel.notify_while_paused = false;
		userInfo.version = "1.6.0";
	}
	if (userInfo.version === "1.6.0") {
		userInfo.app_style = 0;  // This is incorrect. Remedied in 2.0.0
		userInfo.version = "1.7.0";
	}
	if (userInfo.version === "1.7.0") {
		userInfo.version = "1.7.1";
	}
	if (userInfo.version === "1.7.1") {
		userInfo.version = "1.7.2";
	}
	if (userInfo.version === "1.7.2") {
		userInfo.version = "1.7.3";
	}
	if (userInfo.version === "1.7.3") {
		userInfo.version = "1.8.0";
	}
	if (userInfo.version === "1.8.0") {
		let toUpdate = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub", "importExport", "wheel"];
		for (let i = 0; i < toUpdate.length; i++) {
			let business = toUpdate[i];
			delete userInfo[business].name;
		}
		userInfo.version = "1.9.0";
	}
	if (userInfo.version === "1.9.0") {
		let toUpdate = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub"];
		for (let i = 0; i < toUpdate.length; i++) {
			let business = toUpdate[i];
			userInfo[business].upgrades = {
				equipment: true,
				staff: true,
				security: true
			};
		}
		userInfo.nightclub.storage_floors = 5;
		userInfo.bunker.product = Math.min(userInfo.bunker.product, staticInfo.bunker.maxProduct[2]);
		userInfo.bunker.supplies = Math.min(userInfo.bunker.supplies, staticInfo.bunker.maxSupplies[2]);
		userInfo.version = "1.10.0";
	}
	if (userInfo.version === "1.10.0") {
		userInfo.version = "1.10.1";
	}
	if (userInfo.version === "1.10.1") {
		userInfo.version = "1.10.2";
  }
  if (userInfo.version === "1.10.2") {
    if (typeof userInfo.app_style !== undefined) {
      userInfo.settings.app_style = 0;
      delete userInfo.app_style;
    }
    userInfo.version = "2.0.0";
  }
  return userInfo;
}