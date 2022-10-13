import { World } from '~scene/world';
import { Enemy } from '~scene/world/entities/enemy';
import { EnemyVariantData, EnemyTexture } from '~type/world/entities/enemy';

export class EnemyUndead extends Enemy {
  constructor(scene: World, data: EnemyVariantData) {
    super(scene, {
      ...data,
      texture: EnemyTexture.UNDEAD,
      health: 160,
      damage: 20,
      speed: 35,
      scale: 1.8,
    });
  }
}
