mkdir -p ~/.config
touch ~/.config/starship.toml
starship preset plain-text-symbols -o ~/.config/starship.toml
echo "command_timeout = 1000\n\n$(cat ~/.config/starship.toml)" > ~/.config/starship.toml

echo "Configured Starship."