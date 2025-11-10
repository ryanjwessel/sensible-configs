set -e

if ! which brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

cask_dependencies=(
  copilot
  font-ubuntu-mono-nerd-font
  ghostty
  notion
  postman
  raycast
  rectangle
  slack
  spotify
  visual-studio-code
)

dependencies=(
  git
  git-delta
  jenv
  jq
  lsd
  nodenv
  python
  rbenv
  starship
  vim
  yarn
)

{
  brew install --quiet --cask "${cask_dependencies[@]}" && \
  brew install --quiet "${dependencies[@]}" && \
  echo "Installed Homebrew dependencies."
} || {
  echo "Error: Failed to install some Homebrew dependencies"
  exit 1
}
