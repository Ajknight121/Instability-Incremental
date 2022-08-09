import { IClickUpgrade, IUpgrade } from "../model/Upgrade";
import { IGlobalAppState } from "../model/GlobalAppState";

export enum UpgradeNames {
  clickPower = "Click Power",
  clickMultiplier = "Click Multiplier",
  grassPlucker = "Grass Plucker",
  stickThrower = "Stick Thrower",
  lighterThrower = "Lighter Thrower",
  logChucker = "Log Chucker",
  gasolineThrower = "Gasoline thrower",
  tireDumper = "Tire dumper",
  coalShucker = "Coal shucker",
}

const descriptions: string[] = [
    "Get a friend to sit by the fire and pull some grass.",
    "Hire someone to find nearby sticks for the fire.",
    "Someone found a collection of lighters, and some still have fuel!",
    "A dedicated woodsman to provide lumber",
    "Gasoline and fire go BOOM!",
    "It's bad for the environment, but its in great supply!",
    "Black, shiny, lightweight, you know the stuff"
]


/** Example of the factory design pattern from GoF book
 * https://en.wikipedia.org/wiki/Factory_method_pattern
 */
export class GameUpgradesFactory {
  constructor() {}
  static getInitialUpgrades(
    appState: IGlobalAppState = {} as IGlobalAppState
  ): IUpgrade[] {
    return [
      {
        unlocked: true,
        upgradeName: UpgradeNames.grassPlucker,
        upgradeCost: 20,
        EPS: 1,
        quantity: 0,
          description: descriptions[0],
      },
      {
        unlocked: true,
        upgradeName: UpgradeNames.stickThrower,
        upgradeCost: 125,
        EPS: 5,
        quantity: 0,
          description: descriptions[1],
      },
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: UpgradeNames.lighterThrower,
          upgradeCost: 1500,
          EPS: 10,
          quantity: 0,
            description: descriptions[2],
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: UpgradeNames.logChucker,
          upgradeCost: 25000,
          EPS: 25,
          quantity: 0,
            description: descriptions[3],
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: UpgradeNames.gasolineThrower,
          upgradeCost: 300000,
          EPS: 100,
          quantity: 0,
            description: descriptions[4],
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: UpgradeNames.tireDumper,
          upgradeCost: 500000,
          EPS: 250,
          quantity: 0,
            description: descriptions[5],
        },
        appState.totalEmbers ?? 0
      ),
      GameUpgradesFactory.getEmberBasedUpgrade(
        {
          upgradeName: UpgradeNames.coalShucker,
          upgradeCost: 1000000,
          EPS: 400,
          quantity: 0,
            description: descriptions[6],
        },
        appState.totalEmbers ?? 0
      ),
    ];
  }

  // static buyUpgrades(cost, lvl, quantity) {
  //     upgradeCost = upgradeCost * lvl * buyQuantity
  // }

  static canAfford(
    u: IUpgrade | IClickUpgrade,
    appState: IGlobalAppState
  ): boolean {
    return u.upgradeCost * appState.buyQuantity <= appState.embers;
  }

  static isUnlocked(u: IUpgrade | Partial<IUpgrade>, e: number): boolean {
    return (u.upgradeCost ?? 999) * 0.2 <= e || u.unlocked === true;
  }

  static getEmberBasedUpgrade(
    customProps: IUpgrade | Partial<IUpgrade>,
    totalEmbers: number
  ): IUpgrade {
    return {
      ...customProps,
      unlocked: GameUpgradesFactory.isUnlocked(customProps, totalEmbers),
    } as IUpgrade;
  }

  static getInitialClickUpgrades(): IClickUpgrade[] {
    return [
      {
        unlocked: true,
        upgradeName: UpgradeNames.clickPower,
        upgradeCost: 50,
        EPC: 1,
        quantity: 0,
      },
      {
        unlocked: true,
        upgradeName: UpgradeNames.clickMultiplier,
        upgradeCost: 5000,
        EPC: 1.0,
        quantity: 0,
      },
    ];
  }
}
