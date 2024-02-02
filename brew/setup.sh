set -e

if ! which brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew tap homebrew/cask-fonts || true
brew install --quiet --cask android-studio authy font-ubuntu-mono-nerd-font notion postman rectangle slack spotify visual-studio-code || true
brew install --quiet bat fd ffmpeg git git-delta hyperfine imagemagick jenv jq lsd nodenv rbenv react-native-debugger starship vim yarn || true

echo "Installed Homebrew dependencies."