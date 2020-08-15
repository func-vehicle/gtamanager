import { staticInfo } from './InfoContext';
import { capitalize } from './Utility';

let lastTickTime = null;

function tick(userInfo) {
  if (lastTickTime == null) {
    lastTickTime = new Date().getTime();
    return userInfo;
  }
  let currentTime = new Date().getTime();
  let deltaSec = (currentTime - lastTickTime) / 10;
  lastTickTime = currentTime;
  
  // Common strategy: calculate maximum running time in seconds, then actual time
  let maxSeconds;
  let secondsRun;
  
  // Bunker
  if (userInfo["bunker"]["owned"]) {
    let upgrades = (userInfo["bunker"].upgrades.equipment ? 1 : 0) + (userInfo["bunker"].upgrades.staff ? 1 : 0);
    // Manufacturing
    if (userInfo["bunker"]["mode"] === 0) {
      maxSeconds = Math.min(userInfo["bunker"]["supplies"] - 0, staticInfo["bunker"]["maxProduct"][upgrades] - userInfo["bunker"]["product"]) * 60;
      secondsRun = Math.min(deltaSec, maxSeconds);
      if (secondsRun > 0) {
        userInfo["bunker"]["product"] += secondsRun/60;
        userInfo["bunker"]["supplies"] -= secondsRun/60;
      }
    }
    // Research
    else if (userInfo["bunker"]["mode"] === 2) {
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
  let mcbusinesses = staticInfo["mcbusinesses"];
  for (let i = 0; i < mcbusinesses.length; i++) {
      let business = mcbusinesses[i];
      let upgrades = (userInfo[business].upgrades.equipment ? 1 : 0) + (userInfo[business].upgrades.staff ? 1 : 0);
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
      let products = staticInfo["nightclub"]["products"];
      let upgrades = userInfo["nightclub"].upgrades.equipment ? 1 : 0;
      let storage_index = userInfo["nightclub"].storage_floors - 1;
      for (let i = 0; i < products.length; i++) {
          let product = products[i];
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
  //feesCooldown -= deltaSec*1000;
  //feesCooldown = (feesCooldown + 288000) % 2880001;

  return userInfo;
}

export default tick;