export interface IUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  upgradeCost: number;
  EPS: number; // Ember per second value added on purchase
  quantity: number; // Number of times upgrade is purchased
  description: string;
}

export interface IClickUpgrade {
  classname?: string;
  unlocked: boolean;
  upgradeName: string;
  upgradeCost: number;
  EPC: number; // Tracks click power
  quantity: number; // Number of times upgrade is purchased
  description?: string;
}

export interface IEvent {
  classname?: string;
  unlocked: boolean;
  eventName: string;
  isActive: boolean;
}
