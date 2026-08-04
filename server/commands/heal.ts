import * as alt from 'alt-server';
import { PermissionManager } from '../utils/permissions.js';

export function healCommand(player: alt.Player, args: string[]): void {
  if (!PermissionManager.hasPermission(player, 'heal')) {
    PermissionManager.sendError(player, 'You do not have permission for this command!');
    return;
  }

  try {
    // Set health to maximum (200)
    player.health = 200;
    PermissionManager.sendSuccess(player, 'Your health has been restored!');
    PermissionManager.log(player, 'heal', args);
  } catch (err) {
    PermissionManager.sendError(player, 'Failed to restore health. Player may be in an invalid state.');
    alt.logError(`[Admin Commands] healCommand error: ${err}`);
  }
}
