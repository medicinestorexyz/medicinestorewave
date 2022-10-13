import Phaser from 'phaser';

import { EXPERIENCE_TO_NEXT_LEVEL, EXPERIENCE_TO_NEXT_LEVEL_GROWTH } from '~const/difficulty';
import { INTERFACE_PADDING } from '~const/interface';
import { registerAssets } from '~lib/assets';
import { adaptiveSize } from '~lib/ui';
import { calcGrowth } from '~lib/utils';
import { ComponentBar } from '~scene/screen/components/bar';
import { ComponentBuilder } from '~scene/screen/components/builder';
import { ComponentFPS } from '~scene/screen/components/fps';
import { ComponentGameOver } from '~scene/screen/components/gameover';
import { ComponentNotices } from '~scene/screen/components/notices';
import { ComponentResources } from '~scene/screen/components/resources';
import { ComponentWave } from '~scene/screen/components/wave';
import { World } from '~scene/world';
import { SceneKey } from '~type/scene';
import { ScreenTexture } from '~type/screen';
import { Notice, NoticeType } from '~type/screen/notice';
import { WorldEvents } from '~type/world';
import { LiveEvents } from '~type/world/entities/live';
import { PlayerEvents, PlayerStat } from '~type/world/entities/player';

export class Screen extends Phaser.Scene {
  readonly notices: Notice[] = [];

  constructor() {
    super(SceneKey.SCREEN);
  }

  create() {
    const world = <World> this.scene.get(SceneKey.WORLD);
    const components = this.add.group();

    const shift = { x: INTERFACE_PADDING, y: INTERFACE_PADDING };

    // Component wave
    const wave = ComponentWave.call(this, shift, {
      wave: world.wave,
    });
    shift.y += wave.height + INTERFACE_PADDING;
    components.add(wave);

    // Component health bar
    const health = ComponentBar.call(this, shift, {
      display: () => `${world.player.live.health}  HP`,
      value: () => world.player.live.health,
      maxValue: () => world.player.live.maxHealth,
      event: (callback: (amount: number) => void) => world.player.live.on(LiveEvents.HEAL, callback),
      color: 0xe4372c,
    });
    shift.y += health.height + 8;
    components.add(health);

    // Component experience bar
    const experience = ComponentBar.call(this, shift, {
      display: () => `${world.player.level}  LVL`,
      value: () => world.player.experience,
      maxValue: () => calcGrowth(EXPERIENCE_TO_NEXT_LEVEL, EXPERIENCE_TO_NEXT_LEVEL_GROWTH, world.player.level + 1),
      event: (callback: (amount: number) => void) => world.player.on(PlayerEvents.EXPERIENCE, callback),
      color: 0x1975c5,
    });
    shift.y += experience.height + INTERFACE_PADDING / 2;
    components.add(experience);

    // Component resources
    const resources = ComponentResources.call(this, shift, {
      player: world.player,
    });
    components.add(resources);

    // Component notices
    const notices = ComponentNotices.call(this, { y: INTERFACE_PADDING });
    components.add(notices);

    // Component builder
    const builder = ComponentBuilder.call(this, { y: INTERFACE_PADDING }, {
      builder: world.builder,
      wave: world.wave,
      player: world.player,
    });
    components.add(builder);

    // Component fps
    const fps = ComponentFPS.call(this, { x: INTERFACE_PADDING });
    components.add(fps);

    const adaptive = adaptiveSize((width, height) => {
      notices.setX(width / 2);
      builder.setX(width - INTERFACE_PADDING);
      fps.setY(height - INTERFACE_PADDING);
    });

    world.events.on(WorldEvents.GAMEOVER, (stat: PlayerStat, record: PlayerStat) => {
      adaptive.cancel();
      components.destroy(true);

      ComponentGameOver.call(this, { x: 0, y: 0 }, { stat, record });
    });
  }

  public message(type: NoticeType, message: string) {
    this.events.emit('notice', { type, message });
  }
}

registerAssets([{
  key: ScreenTexture.ICON,
  type: 'spritesheet',
  url: `assets/sprites/${ScreenTexture.ICON}.png`,
  // @ts-ignore
  frameConfig: {
    frameWidth: 10,
    frameHeight: 10,
  },
}, {
  key: ScreenTexture.ALERT,
  type: 'image',
  url: `assets/sprites/${ScreenTexture.ALERT}.png`,
}]);
