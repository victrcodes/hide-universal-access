# Hide Universal Access on All Monitors

A GNOME Shell extension to hide the **Universal Access** icon from the status bar on all monitors.

## Installation

### Option 1: Install from this repository

```bash
git clone https://github.com/victrcodes/hide-universal-access.git
cd hide-universal-access
make install
```

If the change does not appear immediately, log out and back in, or reload the
extension with:

```bash
gnome-extensions disable hide-universal-access-all-monitors@victrcodes.github.io
gnome-extensions enable hide-universal-access-all-monitors@victrcodes.github.io
```

### Option 2: Manual install

```bash
git clone https://github.com/victrcodes/hide-universal-access.git
cd hide-universal-access
mkdir -p ~/.local/share/gnome-shell/extensions/hide-universal-access-all-monitors@victrcodes.github.io
cp extension.js metadata.json LICENSE ~/.local/share/gnome-shell/extensions/hide-universal-access-all-monitors@victrcodes.github.io/
gnome-extensions enable hide-universal-access-all-monitors@victrcodes.github.io
```

You can also use the GNOME Extensions app to enable the extension after copying
the files.
