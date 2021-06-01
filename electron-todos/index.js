const { ipcMain } = require("electron");
const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		webPreferences: { nodeIntegration: true, contextIsolation: false },
	});
	mainWindow.loadURL(`file://${__dirname}/main.html`);
	mainWindow.on("closed", () => app.quit());

	const mainMenu = Menu.buildFromTemplate(menuTemplate);

	Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: "Add New Todo",
		webPreferences: { nodeIntegration: true, contextIsolation: false },
	});

	addWindow.loadURL(`file://${__dirname}/add.html`);
	addWindow.on("closed", () => (addWindow = null));
}

ipcMain.on("todo:add", (event, todo) => {
	mainWindow.webContents.send("todo:add", todo);
	addWindow.close();
});

const menuTemplate = [
	{
		label: "File",
		submenu: [
			{
				label: "New Todo",
				accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
				click() {
					createAddWindow();
				},
			},
			{
				label: "Quit",
				accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
				click() {
					app.quit();
				},
			},
		],
	},
];

if (process.platform === "darwin") {
	menuTemplate.unshift({});
}

// NODE_ENV can either be 'production' 'development' 'staging' 'test'
if (process.env.NODE_ENV !== "production") {
	menuTemplate.push({
		label: "Developer",
		submenu: [
            {role:'reload'},
			{
				label: "Toggle Developer Tools",
				accelerator:
					process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
			},
            
		],
	});

    
}
