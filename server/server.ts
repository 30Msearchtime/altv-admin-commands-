import * as alt from 'alt-server';
import { healCommand } from './commands/heal.js';
import { armorCommand } from './commands/armor.js';
import { carCommand } from './commands/car.js';
import { tpCommand } from './commands/tp.js';

// Export for chat resource integration
export function setupCommands(chat: any): void {
  chat.registerCmd('heal', (player: alt.Player, ...args: string[]) => {
    healCommand(player, args);
  });

  chat.registerCmd('armor', (player: alt.Player, ...args: string[]) => {
    armorCommand(player, args);
  });

  chat.registerCmd('car', (player: alt.Player, ...args: string[]) => {
    carCommand(player, args);
  });

  chat.registerCmd('tp', (player: alt.Player, ...args: string[]) => {
    tpCommand(player, args);
  });

  alt.log('[Admin Commands] Successfully loaded 4 admin commands');
}

// Auto-register when chat is available
alt.on('resourceStart', () => {
  const chat = alt.getResourceExports('chat');
  if (chat) {
    setupCommands(chat);
    alt.log('~g~Admin Commands Resource loaded!');
  } else {
    alt.logError('[Admin Commands] Chat resource not found! Make sure chat is loaded before this resource.');
  }
});
