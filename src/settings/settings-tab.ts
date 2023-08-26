import {
    App,
    PluginSettingTab,
    Setting
} from 'obsidian';
import type WritingGoals from '../main';
import { FileLabels } from '../goal/file-labels';
  
  export class WritingGoalsSettingsTab extends PluginSettingTab {
    plugin: WritingGoals;
    fileLabels: FileLabels;
    
    constructor(app: App, plugin: WritingGoals) {
      super(app, plugin);
      this.plugin = plugin;
      this.fileLabels = new FileLabels(this.app, this.plugin.settings);
    }

    display(): void {
      const { containerEl } = this;
  
      containerEl.empty();

      new Setting(containerEl)
        .setName('Show goal indicators in file explorer')
        .setDesc('The plugin will display folder and note writing goals in the file explorer')
        .addToggle(toggle => 
          toggle
            .setValue(this.plugin.settings.showInFileExplorer)
            .onChange(async (value:boolean) => {
              this.plugin.settings.showInFileExplorer = value;
              await this.plugin.saveData(this.plugin.settings);
              this.fileLabels.initFileLabels();
            }));
    }

  }