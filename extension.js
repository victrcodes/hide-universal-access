/*
 * GNOME Shell extension to hide Universal Access icon from the status bar
 *
 * Copyright (C) 2019 Akatsuki Rui
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import GLib from "gi://GLib";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

export default class HideUniversalAccess extends Extension {

  enable() {
    this._syncSourceId = 0;
    this._monitorsChangedId = Main.layoutManager.connect(
      "monitors-changed",
      this._queueSync.bind(this),
    );
    this._extensionChangedId = Main.extensionManager.connect(
      "extension-state-changed",
      this._queueSync.bind(this),
    );

    this._setHidden(true);
  }

  disable() {
    this._clearQueuedSync();

    if (this._monitorsChangedId) {
      Main.layoutManager.disconnect(this._monitorsChangedId);
      this._monitorsChangedId = 0;
    }

    if (this._extensionChangedId) {
      Main.extensionManager.disconnect(this._extensionChangedId);
      this._extensionChangedId = 0;
    }

    this._setHidden(false);
  }

  _queueSync() {
    if (this._syncSourceId) {
      return;
    }

    this._syncSourceId = GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
      this._syncSourceId = 0;
      this._setHidden(true);
      return GLib.SOURCE_REMOVE;
    });
  }

  _clearQueuedSync() {
    if (this._syncSourceId) {
      GLib.source_remove(this._syncSourceId);
      this._syncSourceId = 0;
    }
  }

  _setHidden(hidden) {
    for (let indicator of this._getA11yIndicators()) {
      if (hidden) {
        indicator.container.hide();
      } else {
        indicator.container.show();
      }
    }
  }

  _getA11yIndicators() {
    let indicators = [];
    let seen = new Set();
    let actors = [Main.panel, Main.uiGroup];

    while (actors.length > 0) {
      let actor = actors.pop();
      let indicator = actor?.statusArea?.["a11y"];
      let container = indicator?.container;

      if (container != null && !seen.has(container)) {
        seen.add(container);
        indicators.push(indicator);
      }

      let children = actor?.get_children?.() ?? [];
      for (let child of children) {
        actors.push(child);
      }
    }

    return indicators;

  }

}