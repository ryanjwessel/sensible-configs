set -e

if ! which brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew tap homebrew/cask-fonts || true
brew install --quiet --cask authy rectangle visual-studio-code spotify android-studio notion slack font-ubuntu-mono-nerd-font || true
brew install --quiet vim git nodenv rbenv jenv react-native-debugger starship jq bat lsd fd hyperfine git-delta yarn ffmpeg imagemagick || true
