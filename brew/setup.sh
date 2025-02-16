set -e

if ! which brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew install --quiet --cask android-studio copilot font-ubuntu-mono-nerd-font notion postman raycast rectangle readdle-spark slack spotify visual-studio-code warp || true
brew install --quiet git git-delta jenv jq lsd nodenv python rbenv starship vim yarn || true

echo "Installed Homebrew dependencies."