import { workspace } from "vscode";
import { join } from "path";
import Utils from "./utils";

export function activate() {
  let utils = new Utils();

  // regenerate theme files when user configuration changes
  workspace.onDidChangeConfiguration((event) => {
    utils.detectConfigChanges(event, () => {
      utils.generate(
        join(__dirname, "..", "themes", "gruvbox-material-dark.json"),
        join(__dirname, "..", "themes", "gruvbox-material-light.json"),
        utils.getThemeData(utils.getConfiguration())
      );
    });
  });

  // regenerate theme files if it's newly installed but the user settings are not default
  if (
    utils.isNewlyInstalled() &&
    !utils.isDefaultConfiguration(utils.getConfiguration())
  ) {
    utils.generate(
      join(__dirname, "..", "themes", "gruvbox-material-dark.json"),
      join(__dirname, "..", "themes", "gruvbox-material-light.json"),
      utils.getThemeData(utils.getConfiguration())
    );
  }
}

export function deactivate() {}
