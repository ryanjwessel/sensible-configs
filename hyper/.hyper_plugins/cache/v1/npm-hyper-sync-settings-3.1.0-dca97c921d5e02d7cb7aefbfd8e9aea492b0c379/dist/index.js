'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = require('electron');
var fsExtra = require('fs-extra');
var os = require('os');
var path = require('path');
var dugite = require('dugite');
var moment = _interopDefault(require('moment'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

// eslint-disable-next-line import/no-extraneous-dependencies
const getHyperApp = () => {
  if (!electron.app) {
    throw new Error('electron app is undefined');
  }

  (async () => {
    await electron.app.whenReady();
  })();

  return electron.app;
};
const GIST_URL = (gistId, token) => `https://${token ? `${token}@` : ''}gist.github.com/${gistId}.git`;
const TITLE = 'hyper-sync-settings';
const ERROR_TITLE = `${TITLE} error 🔥`;
const SETUP_URL = 'https://github.com/dfrankland/hyper-sync-settings#setup'; // If the user defines XDG_CONFIG_HOME they definitely want their config there,
// otherwise use the home directory in linux/mac and userdata in windows

const DIR_HOME = () => {
  if (typeof process.env.XDG_CONFIG_HOME !== 'undefined') {
    return path.resolve(process.env.XDG_CONFIG_HOME, 'hyper');
  }

  return process.platform === 'win32' ? getHyperApp().getPath('userData') : os.homedir();
};
const DIR_REPO = () => path.resolve(DIR_HOME(), '.hyper_plugins', '.hyper-sync-settings');
const FILE_CONFIG = () => path.resolve(DIR_HOME(), '.hyper_plugins', '.hyper-sync-settings.json');
const FILE_CONFIG_TEMPLATE = path.resolve(__dirname, 'config.default.json');
const FILE_BACKUP = () => path.resolve(DIR_REPO(), '.hyper.js');
const FILE_RESTORE = () => path.resolve(DIR_HOME(), '.hyper.js');
const POSSIBLE_ACCELERATORS = ['checkForUpdates', 'backupSettings', 'restoreSettings', 'openGist', 'openRepo', 'openConfiguration'];

// eslint-disable-next-line import/no-extraneous-dependencies
var notify = (({
  title,
  body,
  url,
  level = 'debug'
}) => {
  // eslint-disable-next-line no-console
  console[level]([title, body, url].filter(Boolean).join('\n'));

  if (!getHyperApp() || !getHyperApp().isReady()) {
    // eslint-disable-next-line no-console
    console.error('App is undefined or net yet ready');
    return;
  }

  const notification = new electron.Notification({
    title,
    body: body || ''
  });

  if (url) {
    notification.on('click', () => {
      electron.shell.openExternal(url);
    });
  }

  notification.show();
});

const getIdAndToken = async () => {
  let config = {
    personalAccessToken: '',
    gistId: ''
  };
  const {
    HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN,
    HYPER_SYNC_SETTINGS_GIST_ID
  } = process.env;

  if (!HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN || !HYPER_SYNC_SETTINGS_GIST_ID) {
    try {
      if (!(await fsExtra.pathExists(FILE_CONFIG()))) {
        notify({
          title: ERROR_TITLE,
          body: `no config file found in \`${FILE_CONFIG()}\`, creating one`,
          level: 'error'
        });
        await fsExtra.copyFile(FILE_CONFIG_TEMPLATE, FILE_CONFIG());
      } else {
        try {
          config = await fsExtra.readJson(FILE_CONFIG());
        } catch (err) {
          notify({
            title: ERROR_TITLE,
            body: `could not read \`${FILE_CONFIG()}\`, maybe the JSON is not valid?`,
            level: 'error'
          });
        }
      }
    } catch (err) {
      notify({
        title: ERROR_TITLE,
        body: `could not check in \`${FILE_CONFIG()}\` for config file`,
        level: 'error'
      });
    }
  }

  if (HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN) {
    config.personalAccessToken = HYPER_SYNC_SETTINGS_PERSONAL_ACCESS_TOKEN;
  }

  if (HYPER_SYNC_SETTINGS_GIST_ID) {
    config.gistId = HYPER_SYNC_SETTINGS_GIST_ID;
  }

  return config;
};

var getGitConfig = (async () => {
  const config = _objectSpread2({}, (await getIdAndToken()), {
    url: '',
    remoteUrl: '',
    repoPromise: Promise.resolve()
  });

  const {
    personalAccessToken,
    gistId
  } = config;
  if (!personalAccessToken || !gistId) return config;
  const remoteUrl = GIST_URL(gistId, personalAccessToken);

  const repoPromise = (async () => {
    await fsExtra.ensureDir(DIR_REPO());

    try {
      await dugite.GitProcess.exec(['clone', remoteUrl, '.'], DIR_REPO());
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`${ERROR_TITLE} ${err.message}`);
    }
  })();

  return _objectSpread2({}, config, {
    url: GIST_URL(gistId),
    remoteUrl,
    repoPromise
  });
});

const getLastCommit = async () => {
  const {
    stdout
  } = await dugite.GitProcess.exec(['log', '-n', '1', '--date=iso', '--pretty=format:{ "hash": "%H", "date": "%ad" }'], DIR_REPO());
  const {
    hash,
    date
  } = JSON.parse(stdout);
  return {
    hash,
    date: moment(date, 'YYYY-MM-DD HH:mm:ss Z')
  };
};

var updates = (async ({
  repoPromise
}) => {
  await repoPromise;
  await dugite.GitProcess.exec(['fetch'], DIR_REPO());
  await dugite.GitProcess.exec(['checkout', 'origin/master'], DIR_REPO());
  const remote = await getLastCommit();
  await dugite.GitProcess.exec(['checkout', 'master'], DIR_REPO());
  const local = await getLastCommit();
  return moment(remote.date).isAfter(local.date) && local.hash !== remote.hash;
});

var restore = (async ({
  repoPromise
}) => {
  await repoPromise;
  await dugite.GitProcess.exec(['fetch'], DIR_REPO());
  await dugite.GitProcess.exec(['merge', 'origin/master', 'master'], DIR_REPO());
  await fsExtra.ensureFile(FILE_RESTORE());
  await fsExtra.copyFile(FILE_BACKUP(), FILE_RESTORE());
});

var backup = (async ({
  repoPromise,
  remoteUrl
}) => {
  await fsExtra.copy(FILE_RESTORE(), FILE_BACKUP(), {
    overwrite: true
  });
  await repoPromise;
  await dugite.GitProcess.exec(['add', 'remote', remoteUrl], DIR_REPO());
  await dugite.GitProcess.exec(['fetch'], DIR_REPO());
  await dugite.GitProcess.exec(['add', '.'], DIR_REPO());
  await dugite.GitProcess.exec(['commit', '-m', `${new Date()}`], DIR_REPO());
  await dugite.GitProcess.exec(['push', 'origin', 'master'], DIR_REPO());
});

var getCommands = ((config, {
  quiet
}) => {
  const catchError = err => {
    notify({
      title: ERROR_TITLE,
      body: err.message,
      level: 'error'
    });
    throw err;
  };

  const notifyMsg = (emoji, message) => notify({
    title: `${TITLE} ${emoji}`,
    body: message,
    url: config.url,
    level: 'info'
  });

  return {
    checkForUpdates: async () => {
      const isUpdated = await updates(config).catch(catchError);

      if (isUpdated) {
        notifyMsg('❗️', 'Your settings need to be updated.');
      } else if (!quiet) {
        notifyMsg('👍', 'Your settings are up to date.');
      }
    },
    tryToBackup: async () => {
      await backup(config).catch(catchError);
      notifyMsg('🔜', 'Your settings have been saved.');
    },
    tryToRestore: async () => {
      await restore(config).catch(catchError);
      notifyMsg('🔙', 'Your settings have been restored.');
    }
  };
});

var checkForMissingSettings = (async () => {
  const notifyErr = message => notify({
    title: ERROR_TITLE,
    body: message,
    url: SETUP_URL,
    level: 'error'
  });

  if (!getHyperApp().config || typeof getHyperApp().config.getConfig !== 'function') {
    throw new Error('`app` from `electron` does not have the `config` object from Hyper!');
  }

  const config = await getGitConfig();
  const {
    personalAccessToken,
    gistId
  } = config;
  const hyperConfig = getHyperApp().config.getConfig().syncSettings || {
    quiet: false
  };

  if (personalAccessToken && gistId) {
    const commands = getCommands(config, hyperConfig);
    return {
      config,
      commands
    };
  }

  if (!personalAccessToken && !gistId) {
    notifyErr('Settings not found! Click for more info.');
    return null;
  }

  if (!personalAccessToken) {
    notifyErr('`personalAccessToken` not set! Click for more info.');
  }

  if (!gistId) {
    notifyErr('`gistId` not set! Click for more info.');
  }

  return null;
});

const defaultAccelerators = {};
var decorateMenu = ((menu = []) => {
  // Proactively notify about missing settings
  (async () => {
    await getHyperApp().whenReady();
    checkForMissingSettings();
  })();

  const checkAndCallback = callback => async () => {
    const commandsAndConfig = await checkForMissingSettings();
    if (commandsAndConfig === null) return;
    callback(commandsAndConfig);
  };
  const {
    syncSettings: {
      accelerators: syncSettingsAccelerators = defaultAccelerators
    } = {}
  } = getHyperApp().config.getConfig();
  const accelerators = POSSIBLE_ACCELERATORS.reduce((allAccelerators, nextKey) => {
    const accelerator = syncSettingsAccelerators[nextKey];
    return _objectSpread2({}, allAccelerators, {
      [nextKey]: accelerator ? {
        accelerator
      } : {}
    });
  }, {});
  const newMenu = menu.map(item => {
    if (item.label !== 'Plugins') return item;
    return _objectSpread2({}, item, {
      submenu: [...(Array.isArray(item.submenu) ? item.submenu : []), {
        label: 'Sync Settings',
        type: 'submenu',
        submenu: [_objectSpread2({
          label: 'Check for Updates',
          click: checkAndCallback(({
            commands
          }) => {
            commands.checkForUpdates();
          })
        }, accelerators.checkForUpdates), _objectSpread2({
          label: 'Backup Settings',
          click: checkAndCallback(({
            commands
          }) => {
            commands.tryToBackup();
          })
        }, accelerators.backupSettings), _objectSpread2({
          label: 'Restore Settings',
          click: checkAndCallback(({
            commands
          }) => {
            commands.tryToRestore();
          })
        }, accelerators.restoreSettings), {
          label: 'Open',
          type: 'submenu',
          submenu: [_objectSpread2({
            label: 'Gist',
            click: (...args) => {
              checkAndCallback(({
                config
              }) => {
                if (config.url) {
                  electron.shell.openExternal(config.url);
                  return;
                }

                if (config.gistId) {
                  electron.shell.openExternal(GIST_URL(config.gistId));
                  return;
                }

                electron.shell.openExternal('https://gist.github.com');
              })(...args);
            }
          }, accelerators.openGist), _objectSpread2({
            label: 'Repo',
            click: async () => {
              await fsExtra.ensureDir(DIR_REPO());
              electron.shell.openItem(DIR_REPO());
            }
          }, accelerators.openRepo), _objectSpread2({
            label: 'Configuration',
            click: () => {
              electron.shell.openItem(FILE_CONFIG());
            }
          }, accelerators.openConfiguration)]
        }]
      }]
    });
  });
  return newMenu;
});

exports.decorateMenu = decorateMenu;
//# sourceMappingURL=index.js.map
