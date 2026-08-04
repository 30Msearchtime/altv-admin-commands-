# ⚙️ alt:V Admin Commands 🚀

> ✨ **Lightweight, standalone, and fully TypeScript-powered!** Manage your server admins and commands effortlessly.

A modern, type-safe TypeScript script for alt:V multiplayer servers providing a robust admin command system with logging and permissions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![alt:V](https://img.shields.io/badge/alt:V-JS%20v2-blue)](https://altv.mp)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

---

## 🚀 Features

- 🔌 **Plug & Play** — Drop into any alt:V server, no core modifications needed  
- 🛡️ **Permission System** — Assign specific admin rights per command  
- 📝 **Logging** — Tracks all admin actions with timestamps  
- 💻 **TypeScript** — Full type safety and IntelliSense support  
- ⚙️ **Standalone** — No frameworks or external dependencies required  
- ✨ **Extensible** — Add custom commands with minimal effort  

---

## 🧩 Commands

| Command | Description | Usage |
|----------|--------------|-------|
| `/heal` | Restore player health to full | `/heal` |
| `/armor` | Give full armor to the player | `/armor` |
| `/car [model]` | Spawn a vehicle in front of the player and enter it | `/car adder` |
| `/tp [x] [y] [z]` | Teleport to coordinates | `/tp 0 0 72` |

---

## 🧰 Requirements

- **Latest alt:V Server**  
- **Node.js 16+** and **npm**  
- **alt:V Chat Resource** (included by default)  

---

## ⚙️ Installation

### 1. Clone the repository into your server's `resources` folder
```bash
cd resources
git clone https://github.com/30Msearchtime/altv-admin-commands.git
cd altv-admin-commands
```

### 2. Install dependencies
```bash
npm install
```

### 3. Build the resource
```bash
npm run build
```

### 4. Add resource to your `server.toml`
```toml
resources = [
  "chat",
  "altv-admin-commands"
]
```

> ⚠️ `chat` **must** be listed before `altv-admin-commands`, otherwise commands will not register.

### 5. Configure admins
Edit `shared/config.ts` and add your admin player names:
```typescript
export const config: AdminConfig = {
  admins: ["YourPlayerName", "AnotherAdmin"],
  // ... rest of config
};
```

> ⚠️ Admin names are **case-sensitive** and matched against `player.name`. For production use, consider switching to `player.hwidHash` or `player.socialID` for spoofing protection.

### 6. Restart your server 🎮  

---

## 🛠️ Configuration

Edit `shared/config.ts` to customize the admin system.  
You can define admin names, enable/disable logging, and set permissions for each command.

**Example:**
```typescript
export const config: AdminConfig = {
  admins: ["PlayerName1", "PlayerName2"],
  enableLogging: true,
  permissions: {
    heal: [],
    armor: [],
    car: ["PlayerName1"],  // Only PlayerName1 can spawn cars
    tp: []
  }
};
```

Empty arrays = accessible to **all** admins.

---

## 🧱 Project Structure

```
altv-admin-commands/
├── server/
│   ├── commands/
│   │   ├── heal.ts
│   │   ├── armor.ts
│   │   ├── car.ts
│   │   └── tp.ts
│   ├── utils/
│   │   └── permissions.ts
│   └── server.ts
├── shared/
│   └── config.ts
├── resource.toml
├── package.json
└── tsconfig.json
```

---

## ➕ Adding Custom Commands

### Step 1: Create your command file
`server/commands/yourcommand.ts`
```typescript
import * as alt from 'alt-server';
import { PermissionManager } from '../utils/permissions.js';

export function yourCommand(player: alt.Player, args: string[]): void {
  if (!PermissionManager.hasPermission(player, 'yourcommand')) {
    PermissionManager.sendError(player, 'No permission!');
    return;
  }

  try {
    // Your logic here
    PermissionManager.sendSuccess(player, 'Command executed!');
    PermissionManager.log(player, 'yourcommand', args);
  } catch (err) {
    PermissionManager.sendError(player, 'Something went wrong.');
    alt.logError(`[Admin Commands] yourcommand error: ${err}`);
  }
}
```

### Step 2: Register your command
In `server/server.ts`, inside the `setupCommands` function:
```typescript
import { yourCommand } from './commands/yourcommand.js';

// Inside setupCommands():
chat.registerCmd('yourcommand', (player: alt.Player, ...args: string[]) => {
  yourCommand(player, args);
});
```

### Step 3: Add permission config
Update `shared/config.ts`:
```typescript
permissions: {
  heal: [],
  armor: [],
  car: [],
  tp: [],
  yourcommand: []
}
```

---

## 🧑‍💻 Development

### Watch mode (auto-compile on change)
```bash
npm run watch
```

### Manual build
```bash
npm run build
```

---

## ❗ Troubleshooting

### Commands not working
- Ensure `chat` resource loads **before** `altv-admin-commands` in `server.toml`
- Verify admin player names are correct (case-sensitive)
- Check console logs for build errors
- Look for `[Admin Commands] Successfully loaded 4 admin commands` in the server log to confirm the resource started correctly

### No feedback messages in chat
- Feedback messages are sent via `player.emit('chat:message', ...)` — make sure your `chat` resource handles this event on the client side

### TypeScript errors
- Run `npm install` to ensure all types are installed
- Confirm Node.js 16+ is used

### Vehicle spawn issues
- Ensure the vehicle model name is valid (e.g. `adder`, `zentorno`)
- The admin is automatically placed into the driver's seat after spawning
- Review server console for error messages

---

## 🤝 Contributing

Contributions are always welcome!  
To contribute:

1. Fork the repository  
2. Create your branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push your branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## 📜 License

Licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

If you encounter any issues or need help:
- Open an issue on GitHub  
- Check existing issues  
- Join the official [alt:V Discord](https://discord.altv.mp) for help  

---

## 🗺️ Roadmap

- [ ] `/freeze` command  
- [ ] `/kick` and `/ban` commands  
- [ ] `/noclip` command  
- [ ] Web-based admin panel  
- [ ] Database integration for persistent permissions  
- [ ] Multi-language support  

---

## ❤️ Credits

Created with love for the **alt:V community**.  

⭐ **Star this repository** if you find it helpful!
