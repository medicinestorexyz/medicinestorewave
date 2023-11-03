import { WORLD_DEPTH_EFFECT } from '~const/world';
import { Assets } from '~lib/assets';
import { IWorld } from '~type/world';
import {
  ParticlesTexture,
  ParticlesData,
  IParticlesParent,
  IParticles,
} from '~type/world/effects';

Assets.RegisterImages(ParticlesTexture);

export class Particles implements IParticles {
  readonly scene: IWorld;

  readonly emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  private key: string;

  private parent: IParticlesParent;

  constructor(
    parent: IParticlesParent,
    {
      key, position, texture, params, dynamic,
    }: ParticlesData,
  ) {
    this.scene = parent.scene;
    this.parent = parent;
    this.key = key;

    if (!this.parent.effects) {
      this.parent.effects = {};
    } else if (this.parent.effects[this.key]) {
      this.parent.effects[this.key].destroy();
    }

    this.parent.effects[this.key] = this;

    this.emitter = this.scene.add.particles(
      position?.x ?? 0,
      position?.y ?? 0,
      texture,
      {
        ...params,
        follow: dynamic ? parent : undefined,
      },
    );
    this.emitter.setDepth(
      position?.y ?? parent?.y ?? WORLD_DEPTH_EFFECT,
    );

    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);

    this.parent.once(Phaser.GameObjects.Events.DESTROY, this.destroy);

    if (dynamic) {
      this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update);
    }

    if (params.duration) {
      this.emitter.once(Phaser.GameObjects.Particles.Events.COMPLETE, this.destroy);
    }
  }

  public destroy() {
    delete this.parent.effects?.[this.key];
    this.emitter.destroy();

    this.parent.off(Phaser.GameObjects.Events.DESTROY, this.destroy);
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update);
  }

  private update() {
    this.emitter.setDepth(this.parent.depth);
  }
}
