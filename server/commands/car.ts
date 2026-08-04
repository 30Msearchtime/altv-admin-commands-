import * as alt from 'alt-server';
import { PermissionManager } from '../utils/permissions.js';

export function carCommand(player: alt.Player, args: string[]): void {
  if (!PermissionManager.hasPermission(player, 'car')) {
    PermissionManager.sendError(player, 'You do not have permission for this command!');
    return;
  }

  const modelName = args[0];

  if (!modelName) {
    PermissionManager.sendError(player, 'Usage: /car [model]');
    return;
  }

  try {
    // Calculate position in front of player
    const forwardVector = alt.getForwardVector(player.rot);
    const spawnPos = {
      x: player.pos.x + forwardVector.x * 5,
      y: player.pos.y + forwardVector.y * 5,
      z: player.pos.z
    };

    // Spawn vehicle
    const vehicle = new alt.Vehicle(
      modelName,
      spawnPos.x,
      spawnPos.y,
      spawnPos.z,
      0, 0, 0
    );

    // Place the admin into the driver's seat
    player.setIntoVehicle(vehicle, 1);

    PermissionManager.sendSuccess(player, `Vehicle '${modelName}' has been spawned!`);
    PermissionManager.log(player, 'car', args);
  } catch (err) {
    PermissionManager.sendError(player, `Invalid vehicle model: '${modelName}'`);
  }
}
