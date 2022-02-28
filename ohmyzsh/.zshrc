export ZSH="/Users/$(whoami)/.oh-my-zsh"
source $ZSH/oh-my-zsh.sh

export HISTSIZE=25000

plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)

eval "$(starship init zsh)"
