CURR_DIR=$( cd "$(dirname "$0")" ; pwd -P )
cp "${CURR_DIR}/.gitconfig" ~/.gitconfig

echo "Applied Git configuration for $(whoami)"