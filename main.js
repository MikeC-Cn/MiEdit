const electron = require('electron');
const fs = require('fs');
const {
    app,
    BrowserWindow,
    Menu,
    dialog,
    ipcMain
} = electron;
process.env.NODE_ENV = 'production';
let mainWindow, mainMenu, path;
//创建窗口
app.on("ready", function() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        },
    });
    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
        app.quit();
    })
    mainMenu = Menu.buildFromTemplate(MenuTemplate);
    mainWindow.setMenu(mainMenu);

})



//打开文件
function openFile() {
    path = dialog.showOpenDialog({
        properties: ['openFile', 'openFile', 'multiSelections']
    });
    if (path) {
        fs.readFile(path[0], 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                mainWindow.webContents.send('open-file', data, path);
            }
        })
    }
}
//保存文件
function saveFile() {
    mainWindow.webContents.send('save-data');
    ipcMain.on('save-data-back', function(event, data, path) {
        if (!path) {
            path = dialog.showOpenDialog({
                properties: ['openFile', 'openFile', 'multiSelections']
            });
            if(!path)return;
        }
        fs.writeFile(path, data, function(err) {
            if (err) {
                console.log(err);
            }
        })
    })
}
//拖放文件
ipcMain.on("drag-file", function(event, path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            mainWindow.webContents.send('open-file', data, path);
        }
    })
})

const Store = require('electron-store');

const store = new Store();
if (!store.get('theme')) {
    store.set('theme', 'github');
}
if (!store.get('mode')) {
    store.set('mode', 'text');
}


ipcMain.on('data', function(event) {
    mainWindow.webContents.send('data-back', store.get('theme'), store.get('mode'));
})
//设置主题
function changeTheme(data) {
    store.set('theme', data);
    mainWindow.webContents.send('change-theme', data);
}
//设置语言
function changeMode(data) {
    store.set('mode', data);
    mainWindow.webContents.send('change-mode', data);
}


//菜单模板
const MenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Open File',
        accelerator: process.platform == 'darwin' ? 'Command + O' : 'Ctrl + O',
        click() {
            openFile();
        }
    }, {
        label: 'Save File',
        accelerator: process.platform == 'darwin' ? 'Command + S' : 'Ctrl + S',
        click() {
            saveFile();
        }
    }, {
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'Command + Q' : 'Ctrl + Q',
        click() {
            app.quit();
        }
    }, ]
}, {
    label: 'Setting',
    submenu: [{
        label: 'Themes',
        submenu: [{
                label: 'Ambiance',
                click() {
                    changeTheme('ambiance');
                }
            },
            {
                label: 'Chaos',
                click() {
                    changeTheme('chaos');
                }
            },
            {
                label: 'Chrome',
                click() {
                    changeTheme('chrome');
                }
            }, {
                label: 'Clouds',
                click() {
                    changeTheme('clouds');
                }
            }, {
                label: 'Cobalt',
                click() {
                    changeTheme('cobalt');
                }
            }, {
                label: 'Dawn',
                click() {
                    changeTheme('dawn');
                }
            }, {
                label: 'Dracula',
                click() {
                    changeTheme('dracula');
                }
            }, {
                label: 'Dreamweaver',
                click() {
                    changeTheme('dreamweaver');
                }
            }, {
                label: 'Eclipse',
                click() {
                    changeTheme('eclipse');
                }
            }, {
                label: 'Github',
                click() {
                    changeTheme('github');
                }
            }, {
                label: 'Gob',
                click() {
                    changeTheme('gob');
                }
            }, {
                label: 'Gruvbox',
                click() {
                    changeTheme('gruvbox');
                }
            }, {
                label: 'Iplastic',
                click() {
                    changeTheme('iplastic');
                }
            }, {
                label: 'Katzenmilch',
                click() {
                    changeTheme('katzenmilch');
                }
            }, {
                label: 'Kuroir',
                click() {
                    changeTheme('kuroir');
                }
            }, {
                label: 'Merbivore',
                click() {
                    changeTheme('merbivore');
                }
            }, {
                label: 'Monokai',
                click() {
                    changeTheme('monokai');
                }
            }, {
                label: 'Sqlserver',
                click() {
                    changeTheme('sqlserver');
                }
            }, {
                label: 'Terminal',
                click() {
                    changeTheme('terminal');
                }
            }, {
                label: 'Textmate',
                click() {
                    changeTheme('textmate');
                }
            }, {
                label: 'Tomorrow',
                click() {
                    changeTheme('tomorrow');
                }
            }, {
                label: 'Twiligh',
                click() {
                    changeTheme('twiligh');
                }
            },
        ]
    }, {
        label: 'Language',
        submenu: [{
            label: 'Abap',
            click() {
                changeMode('abap');
            }
        }, {
            label: 'Abc',
            click() {
                changeMode('abc');
            }
        }, {
            label: 'Actionscript',
            click() {
                changeMode('actionscript');
            }
        }, {
            label: 'Ada',
            click() {
                changeMode('ada');
            }
        }, {
            label: 'Apache_conf',
            click() {
                changeMode('apache_conf');
            }
        }, {
            label: 'Apex',
            click() {
                changeMode('apex');
            }
        }, {
            label: 'Applescript',
            click() {
                changeMode('applescript');
            }
        }, {
            label: 'Aql',
            click() {
                changeMode('aql');
            }
        }, {
            label: 'Asciidoc',
            click() {
                changeMode('asciidoc');
            }
        }, {
            label: 'Asl',
            click() {
                changeMode('asl');
            }
        }, {
            label: 'Assembly_x86',
            click() {
                changeMode('assembly_x86');
            }
        }, {
            label: 'Autohotkey',
            click() {
                changeMode('autohotkey');
            }
        }, {
            label: 'Batchfile',
            click() {
                changeMode('batchfile');
            }
        }, {
            label: 'Bro',
            click() {
                changeMode('bro');
            }
        }, {
            label: 'C_cpp',
            click() {
                changeMode('c_cpp');
            }
        }, {
            label: 'C9search',
            click() {
                changeMode('c9search');
            }
        }, {
            label: 'Cirru',
            click() {
                changeMode('cirru');
            }
        }, {
            label: 'Clojure',
            click() {
                changeMode('clojure');
            }
        }, {
            label: 'Cobol',
            click() {
                changeMode('cobol');
            }
        }, {
            label: 'Coffee',
            click() {
                changeMode('coffee');
            }
        }, {
            label: 'Coldfusion',
            click() {
                changeMode('coldfusion');
            }
        }, {
            label: 'Crystal',
            click() {
                changeMode('crystal');
            }
        }, {
            label: 'Csharp',
            click() {
                changeMode('csharp');
            }
        }, {
            label: 'Csound_document',
            click() {
                changeMode('csound_document');
            }
        }, {
            label: 'Csound_orchestra',
            click() {
                changeMode('csound_orchestra');
            }
        }, {
            label: 'Csound_score',
            click() {
                changeMode('csound_score');
            }
        }, {
            label: 'Csp',
            click() {
                changeMode('csp');
            }
        }, {
            label: 'Css',
            click() {
                changeMode('css');
            }
        }, {
            label: 'Curly',
            click() {
                changeMode('curly');
            }
        }, {
            label: 'D',
            click() {
                changeMode('d');
            }
        }, {
            label: 'Dart',
            click() {
                changeMode('dart');
            }
        }, {
            label: 'Diff',
            click() {
                changeMode('diff');
            }
        }, {
            label: 'Django',
            click() {
                changeMode('django');
            }
        }, {
            label: 'Dockerfile',
            click() {
                changeMode('dockerfile');
            }
        }, {
            label: 'Dot',
            click() {
                changeMode('dot');
            }
        }, {
            label: 'Drools',
            click() {
                changeMode('drools');
            }
        }, {
            label: 'Edifact',
            click() {
                changeMode('edifact');
            }
        }, {
            label: 'Eiffel',
            click() {
                changeMode('eiffel');
            }
        }, {
            label: 'Ejs',
            click() {
                changeMode('ejs');
            }
        }, {
            label: 'Elixir',
            click() {
                changeMode('elixir');
            }
        }, {
            label: 'Elm',
            click() {
                changeMode('elm');
            }
        }, {
            label: 'Erlang',
            click() {
                changeMode('erlang');
            }
        }, {
            label: 'Forth',
            click() {
                changeMode('forth');
            }
        }, {
            label: 'Fortran',
            click() {
                changeMode('fortran');
            }
        }, {
            label: 'Fsharp',
            click() {
                changeMode('fsharp');
            }
        }, {
            label: 'Fsl',
            click() {
                changeMode('fsl');
            }
        }, {
            label: 'Ftl',
            click() {
                changeMode('ftl');
            }
        }, {
            label: 'Gcode',
            click() {
                changeMode('gcode');
            }
        }, {
            label: 'Gherkin',
            click() {
                changeMode('gherkin');
            }
        }, {
            label: 'Gitignore',
            click() {
                changeMode('gitignore');
            }
        }, {
            label: 'Glsl',
            click() {
                changeMode('glsl');
            }
        }, {
            label: 'Gobstones',
            click() {
                changeMode('gobstones');
            }
        }, {
            label: 'Golang',
            click() {
                changeMode('golang');
            }
        }, {
            label: 'Graphqlschema',
            click() {
                changeMode('graphqlschema');
            }
        }, {
            label: 'Groovy',
            click() {
                changeMode('groovy');
            }
        }, {
            label: 'Haml',
            click() {
                changeMode('haml');
            }
        }, {
            label: 'Handlebars',
            click() {
                changeMode('handlebars');
            }
        }, {
            label: 'Haskell',
            click() {
                changeMode('haskell');
            }
        }, {
            label: 'Haskell_cabal',
            click() {
                changeMode('haskell_cabal');
            }
        }, {
            label: 'Haxe',
            click() {
                changeMode('haxe');
            }
        }, {
            label: 'Hjson',
            click() {
                changeMode('hjson');
            }
        }, {
            label: 'Html',
            click() {
                changeMode('html');
            }
        }, {
            label: 'Html_elixir',
            click() {
                changeMode('html_elixir');
            }
        }, {
            label: 'Html_ruby',
            click() {
                changeMode('html_ruby');
            }
        }, {
            label: 'Ini',
            click() {
                changeMode('ini');
            }
        }, {
            label: 'Io',
            click() {
                changeMode('io');
            }
        }, {
            label: 'Jack',
            click() {
                changeMode('jack');
            }
        }, {
            label: 'Jade',
            click() {
                changeMode('jade');
            }
        }, {
            label: 'Java',
            click() {
                changeMode('java');
            }
        }, {
            label: 'Javascript',
            click() {
                changeMode('javascript');
            }
        }, {
            label: 'Json',
            click() {
                changeMode('json');
            }
        }, {
            label: 'Json5',
            click() {
                changeMode('json5');
            }
        }, {
            label: 'Jsoniq',
            click() {
                changeMode('jsoniq');
            }
        }, {
            label: 'Jsp',
            click() {
                changeMode('jsp');
            }
        }, {
            label: 'Jssm',
            click() {
                changeMode('jssm');
            }
        }, {
            label: 'Jsx',
            click() {
                changeMode('jsx');
            }
        }, {
            label: 'Julia',
            click() {
                changeMode('julia');
            }
        }, {
            label: 'Kotlin',
            click() {
                changeMode('kotlin');
            }
        }, {
            label: 'Latex',
            click() {
                changeMode('latex');
            }
        }, {
            label: 'Less',
            click() {
                changeMode('less');
            }
        }, {
            label: 'Liquid',
            click() {
                changeMode('liquid');
            }
        }, {
            label: 'Lisp',
            click() {
                changeMode('lisp');
            }
        }, {
            label: 'Livescript',
            click() {
                changeMode('livescript');
            }
        }, {
            label: 'Logiql',
            click() {
                changeMode('logiql');
            }
        }, {
            label: 'Logtalk',
            click() {
                changeMode('logtalk');
            }
        }, {
            label: 'Lsl',
            click() {
                changeMode('lsl');
            }
        }, {
            label: 'Lua',
            click() {
                changeMode('lua');
            }
        }, {
            label: 'Luapage',
            click() {
                changeMode('luapage');
            }
        }, {
            label: 'Lucene',
            click() {
                changeMode('lucene');
            }
        }, {
            label: 'Makefile',
            click() {
                changeMode('makefile');
            }
        }, {
            label: 'Markdown',
            click() {
                changeMode('markdown');
            }
        }, {
            label: 'Mask',
            click() {
                changeMode('mask');
            }
        }, {
            label: 'Matlab',
            click() {
                changeMode('matlab');
            }
        }, {
            label: 'Maze',
            click() {
                changeMode('maze');
            }
        }, {
            label: 'Mel',
            click() {
                changeMode('mel');
            }
        }, {
            label: 'Mixal',
            click() {
                changeMode('mixal');
            }
        }, {
            label: 'Mushcode',
            click() {
                changeMode('mushcode');
            }
        }, {
            label: 'Mysql',
            click() {
                changeMode('mysql');
            }
        }, {
            label: 'Nginx',
            click() {
                changeMode('nginx');
            }
        }, {
            label: 'Nim',
            click() {
                changeMode('nim');
            }
        }, {
            label: 'Nix',
            click() {
                changeMode('nix');
            }
        }, {
            label: 'Nsis',
            click() {
                changeMode('nsis');
            }
        }, {
            label: 'Nunjucks',
            click() {
                changeMode('nunjucks');
            }
        }, {
            label: 'Objectivec',
            click() {
                changeMode('objectivec');
            }
        }, {
            label: 'Ocaml',
            click() {
                changeMode('ocaml');
            }
        }, {
            label: 'Pascal',
            click() {
                changeMode('pascal');
            }
        }, {
            label: 'Perl',
            click() {
                changeMode('perl');
            }
        }, {
            label: 'Perl6',
            click() {
                changeMode('perl6');
            }
        }, {
            label: 'Pgsql',
            click() {
                changeMode('pgsql');
            }
        }, {
            label: 'Php',
            click() {
                changeMode('php');
            }
        }, {
            label: 'Php_laravel_blade',
            click() {
                changeMode('php_laravel_blade');
            }
        }, {
            label: 'Pig',
            click() {
                changeMode('pig');
            }
        }, {
            label: 'Plain_text',
            click() {
                changeMode('plain_text');
            }
        }, {
            label: 'Powershell',
            click() {
                changeMode('powershell');
            }
        }, {
            label: 'Praat',
            click() {
                changeMode('praat');
            }
        }, {
            label: 'Prolog',
            click() {
                changeMode('prolog');
            }
        }, {
            label: 'Properties',
            click() {
                changeMode('properties');
            }
        }, {
            label: 'Protobuf',
            click() {
                changeMode('protobuf');
            }
        }, {
            label: 'Puppet',
            click() {
                changeMode('puppet');
            }
        }, {
            label: 'Python',
            click() {
                changeMode('python');
            }
        }, {
            label: 'R',
            click() {
                changeMode('r');
            }
        }, {
            label: 'Razor',
            click() {
                changeMode('razor');
            }
        }, {
            label: 'Rdoc',
            click() {
                changeMode('rdoc');
            }
        }, {
            label: 'Red',
            click() {
                changeMode('red');
            }
        }, {
            label: 'Redshift',
            click() {
                changeMode('redshift');
            }
        }, {
            label: 'Rhtml',
            click() {
                changeMode('rhtml');
            }
        }, {
            label: 'Rst',
            click() {
                changeMode('rst');
            }
        }, {
            label: 'Ruby',
            click() {
                changeMode('ruby');
            }
        }, {
            label: 'Rust',
            click() {
                changeMode('rust');
            }
        }, {
            label: 'Sass',
            click() {
                changeMode('sass');
            }
        }, {
            label: 'Scad',
            click() {
                changeMode('scad');
            }
        }, {
            label: 'Scala',
            click() {
                changeMode('scala');
            }
        }, {
            label: 'Scheme',
            click() {
                changeMode('scheme');
            }
        }, {
            label: 'Scss',
            click() {
                changeMode('scss');
            }
        }, {
            label: 'Sh',
            click() {
                changeMode('sh');
            }
        }, {
            label: 'Sjs',
            click() {
                changeMode('sjs');
            }
        }, {
            label: 'Slim',
            click() {
                changeMode('slim');
            }
        }, {
            label: 'Smarty',
            click() {
                changeMode('smarty');
            }
        }, {
            label: 'Snippets',
            click() {
                changeMode('snippets');
            }
        }, {
            label: 'Soy_template',
            click() {
                changeMode('soy_template');
            }
        }, {
            label: 'Space',
            click() {
                changeMode('space');
            }
        }, {
            label: 'Sparql',
            click() {
                changeMode('sparql');
            }
        }, {
            label: 'Sql',
            click() {
                changeMode('sql');
            }
        }, {
            label: 'Sqlserver',
            click() {
                changeMode('sqlserver');
            }
        }, {
            label: 'Stylus',
            click() {
                changeMode('stylus');
            }
        }, {
            label: 'Svg',
            click() {
                changeMode('svg');
            }
        }, {
            label: 'Swift',
            click() {
                changeMode('swift');
            }
        }, {
            label: 'Tcl',
            click() {
                changeMode('tcl');
            }
        }, {
            label: 'Terraform',
            click() {
                changeMode('terraform');
            }
        }, {
            label: 'Tex',
            click() {
                changeMode('tex');
            }
        }, {
            label: 'Text',
            click() {
                changeMode('text');
            }
        }, {
            label: 'Textile',
            click() {
                changeMode('textile');
            }
        }, {
            label: 'Toml',
            click() {
                changeMode('toml');
            }
        }, {
            label: 'Tsx',
            click() {
                changeMode('tsx');
            }
        }, {
            label: 'Turtle',
            click() {
                changeMode('turtle');
            }
        }, {
            label: 'Twig',
            click() {
                changeMode('twig');
            }
        }, {
            label: 'Typescript',
            click() {
                changeMode('typescript');
            }
        }, {
            label: 'Vala',
            click() {
                changeMode('vala');
            }
        }, {
            label: 'Vbscript',
            click() {
                changeMode('vbscript');
            }
        }, {
            label: 'Velocity',
            click() {
                changeMode('velocity');
            }
        }, {
            label: 'Velocity',
            click() {
                changeMode('velocity');
            }
        }, {
            label: 'Vhdl',
            click() {
                changeMode('vhdl');
            }
        }, {
            label: 'Visualforce',
            click() {
                changeMode('visualforce');
            }
        }, {
            label: 'Wollok',
            click() {
                changeMode('wollok');
            }
        }, {
            label: 'Xml',
            click() {
                changeMode('xml');
            }
        }, {
            label: 'Xquery',
            click() {
                changeMode('xquery');
            }
        }, {
            label: 'Yaml',
            click() {
                changeMode('yaml');
            }
        }, {
            label: 'Zeek',
            click() {
                changeMode('zeek');
            }
        }, ]
    }]
}]
//开发者选项
if (process.env.NODE_ENV !== 'production') {
    MenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
                label: 'Toggle DevTolls',
                accelerator: process.platform == 'darwin' ? 'Command + I' : 'Ctrl + I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}