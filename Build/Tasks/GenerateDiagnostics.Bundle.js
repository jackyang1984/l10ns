/// <reference path='../Source/Service/Types.ts'/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var L10ns;
(function (L10ns) {
    var Tasks;
    (function (Tasks) {
        function generateDiagnostics(grunt) {
            const path = require('path');
            if (!/Bundle/.test(__filename)) {
                return;
            }
            grunt.registerTask('generate-diagnostics', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const done = this.async();
                    let result = '// <auto-generated />\r\n' +
                        '/// <reference path="Types.ts" />\r\n' +
                        '/* @internal */\r\n' +
                        'namespace L10ns {\r\n' +
                        '    export const Diagnostics = {\r\n';
                    const diagnosticMessages = require(path.join(__dirname, '../../Source/Service/DiagnosticMessages.json'));
                    const names = Object.keys(diagnosticMessages);
                    const nameMap = buildUniqueNameMap(names);
                    for (const key in diagnosticMessages) {
                        var diagnosticDetails = diagnosticMessages[key];
                        var propName = convertPropertyName(nameMap[key]);
                        result +=
                            '        ' + propName +
                                ': { code: ' + diagnosticDetails.code +
                                ', category: DiagnosticCategory.' + diagnosticDetails.category +
                                ', key: "' + createKey(propName, diagnosticDetails.code) + '"' +
                                ', message: "' + key.replace(/[\"]/g, '\\"') + '"' +
                                ' },\r\n';
                    }
                    result += '    }\r\n}';
                    const generatedFile = L10ns.joinPath(__dirname, '../../Source/Service/DiagnosticMessages.Generated.ts');
                    yield L10ns.writeFile(generatedFile, result);
                    done();
                });
            });
        }
        Tasks.generateDiagnostics = generateDiagnostics;
        function buildUniqueNameMap(names) {
            let nameMap = {};
            let uniqueNames = NameGenerator.ensureUniqueness(names, /* isCaseSensitive */ false, /* isFixed */ undefined);
            for (var i = 0; i < names.length; i++) {
                nameMap[names[i]] = uniqueNames[i];
            }
            return nameMap;
        }
        function createKey(name, code) {
            return name.slice(0, 100) + '_' + code;
        }
        function convertPropertyName(origName) {
            var result = origName.split("").map(char => {
                if (char === '*') {
                    return "_Asterisk";
                }
                if (char === '/') {
                    return "_Slash";
                }
                if (char === ':') {
                    return "_Colon";
                }
                return /\w/.test(char) ? char : "_";
            }).join("");
            // Get rid of all multi-underscores
            result = result.replace(/_+/g, "_");
            // Remove any leading underscore, unless it is followed by a number.
            result = result.replace(/^_([^\d])/, "$1");
            // Get rid of all trailing underscores.
            result = result.replace(/_$/, "");
            return result;
        }
    })(Tasks = L10ns.Tasks || (L10ns.Tasks = {}));
})(L10ns || (L10ns = {}));
var NameGenerator;
(function (NameGenerator) {
    function ensureUniqueness(names, isCaseSensitive, isFixed) {
        if (!isFixed) {
            isFixed = names.map(() => false);
        }
        var names = names.slice();
        ensureUniquenessInPlace(names, isCaseSensitive, isFixed);
        return names;
    }
    NameGenerator.ensureUniqueness = ensureUniqueness;
    function ensureUniquenessInPlace(names, isCaseSensitive, isFixed) {
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var collisionIndices = Utilities.collectMatchingIndices(name, names, isCaseSensitive);
            // We will always have one "collision" because getCollisionIndices returns the index of name itself as well;
            // so if we only have one collision, then there are no issues.
            if (collisionIndices.length < 2) {
                continue;
            }
            handleCollisions(name, names, isFixed, collisionIndices, isCaseSensitive);
        }
    }
    function handleCollisions(name, proposedNames, isFixed, collisionIndices, isCaseSensitive) {
        var suffix = 1;
        for (var i = 0; i < collisionIndices.length; i++) {
            var collisionIndex = collisionIndices[i];
            if (isFixed[collisionIndex]) {
                // can't do anything about this name.
                continue;
            }
            while (true) {
                var newName = name + suffix;
                suffix++;
                // Check if we've synthesized a unique name, and if so
                // replace the conflicting name with the new one.
                if (!proposedNames.some(name => Utilities.stringEquals(name, newName, isCaseSensitive))) {
                    proposedNames[collisionIndex] = newName;
                    break;
                }
            }
        }
    }
})(NameGenerator || (NameGenerator = {}));
var Utilities;
(function (Utilities) {
    /// Return a list of all indices where a string occurs.
    function collectMatchingIndices(name, proposedNames, isCaseSensitive) {
        var matchingIndices = [];
        for (var i = 0; i < proposedNames.length; i++) {
            if (stringEquals(name, proposedNames[i], isCaseSensitive)) {
                matchingIndices.push(i);
            }
        }
        return matchingIndices;
    }
    Utilities.collectMatchingIndices = collectMatchingIndices;
    function stringEquals(s1, s2, caseSensitive) {
        if (caseSensitive) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();
        }
        return s1 == s2;
    }
    Utilities.stringEquals = stringEquals;
})(Utilities || (Utilities = {}));
module.exports = L10ns.Tasks.generateDiagnostics;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path='Types.ts'/>
var L10ns;
(function (L10ns) {
    function createCompilerDiagnostic(message) {
        let text = getLocaleSpecificMessage(message);
        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }
        return {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: text,
            category: message.category,
            code: message.code
        };
    }
    L10ns.createCompilerDiagnostic = createCompilerDiagnostic;
    function formatStringFromArgs(text, args, baseIndex) {
        baseIndex = baseIndex || 0;
        return text.replace(/{(\d+)}/g, (_, index) => args[+index + baseIndex]);
    }
    L10ns.localizedDiagnosticMessages = undefined;
    function getLocaleSpecificMessage(message) {
        return L10ns.localizedDiagnosticMessages && L10ns.localizedDiagnosticMessages[message.key]
            ? L10ns.localizedDiagnosticMessages[message.key]
            : message.message;
    }
    L10ns.getLocaleSpecificMessage = getLocaleSpecificMessage;
    var Debug;
    (function (Debug) {
        const currentAssertionLevel = 0 /* None */;
        function shouldAssert(level) {
            return currentAssertionLevel >= level;
        }
        Debug.shouldAssert = shouldAssert;
        function assert(expression, message, verboseDebugInfo) {
            if (!expression) {
                let verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }
                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }
        Debug.assert = assert;
        function fail(message) {
            Debug.assert(/*expression*/ false, message);
            throw new Error('Should not reach here');
        }
        Debug.fail = fail;
        Debug.log = console.log;
    })(Debug = L10ns.Debug || (L10ns.Debug = {}));
})(L10ns || (L10ns = {}));
// <auto-generated />
/// <reference path="Types.ts" />
/* @internal */
var L10ns;
(function (L10ns) {
    L10ns.Diagnostics = {
        The_action_0_must_be_the_second_command_line_argument: { code: 1000, category: 1 /* Error */, key: "The_action_0_must_be_the_second_command_line_argument_1000", message: "The action '{0}' must be the second command line argument." },
        The_action_0_does_not_have_the_command_line_option_1: { code: 1001, category: 1 /* Error */, key: "The_action_0_does_not_have_the_command_line_option_1_1001", message: "The action '{0}' does not have the command line option '{1}'." },
        The_option_0_is_not_a_default_option: { code: 1002, category: 1 /* Error */, key: "The_option_0_is_not_a_default_option_1002", message: "The option '{0}' is not a default option." },
    };
})(L10ns || (L10ns = {}));
/// <reference path='Types.ts'/>
/// <reference path='DiagnosticMessages.Generated.ts'/>
var L10ns;
(function (L10ns) {
    const helpOption = {
        name: '--help',
        alias: '-h',
        description: 'Show help section. More details with `l10ns [action] --help`.',
    };
    const defaultCommandLineOptions = [
        helpOption,
        {
            name: '--version',
            description: 'Show current l10ns version.',
        }
    ];
    const commandLineActions = [
        {
            action: 'update',
            description: 'Sync localization keys with storage.',
            options: [
                helpOption,
                {
                    name: '--key',
                    alias: '-k',
                    hasValue: true,
                },
                {
                    name: '--value',
                    alias: '-v',
                    hasValue: true,
                },
                {
                    name: '--index',
                    alias: '-i',
                    hasValue: true,
                },
                {
                    name: '--search-index',
                    alias: '-si',
                    hasValue: true,
                }
            ],
        },
        {
            action: 'compile',
            description: 'Compile localizations.',
            options: [
                helpOption,
            ],
        },
        {
            action: 'log',
            description: 'See the latest added localizations.',
            options: [
                helpOption,
            ],
        }
    ];
    function isValidAction(action) {
        for (let a of commandLineActions) {
            if (a.action === action) {
                return true;
            }
        }
        return false;
    }
    function getOption(option, action) {
        if (action) {
            for (const a of commandLineActions) {
                if (action && a.action === action) {
                    if (!a.options) {
                        continue;
                    }
                    for (const o of a.options) {
                        if (o.name === option) {
                            return o;
                        }
                    }
                }
            }
        }
        else {
            for (const o of defaultCommandLineOptions) {
                if (o.name === option) {
                    return o;
                }
            }
        }
        return null;
    }
    function parseCommandLine(args) {
        const errors = [];
        const options = [];
        let lastOptionHasValue = false; // Flag to check if it the current loop is to capture an option value.
        let lastOption;
        let action = null;
        for (let i = 2; i < args.length; i++) {
            const arg = args[i];
            let option = null;
            if (arg.startsWith('-')) {
                option = getOption(arg, action);
                if (action) {
                    if (!option) {
                        errors.push(L10ns.createCompilerDiagnostic(L10ns.Diagnostics.The_action_0_does_not_have_the_command_line_option_1, action, arg));
                        break;
                    }
                }
                else if (!option) {
                    errors.push(L10ns.createCompilerDiagnostic(L10ns.Diagnostics.The_option_0_is_not_a_default_option, arg));
                    break;
                }
                const parsedOption = { name: option.name };
                options.push(parsedOption);
                if (option.hasValue) {
                    lastOption = parsedOption;
                    lastOptionHasValue = true;
                    continue;
                }
            }
            else {
                if (lastOptionHasValue) {
                    if (lastOption) {
                        lastOption.value = arg;
                    }
                    continue;
                }
                if (isValidAction(arg)) {
                    if (i !== 2) {
                        errors.push(L10ns.createCompilerDiagnostic(L10ns.Diagnostics.The_action_0_must_be_the_second_command_line_argument, arg));
                        break;
                    }
                    action = arg;
                    continue;
                }
            }
            lastOption = undefined;
            lastOptionHasValue = false;
        }
        if (errors) {
            errors.forEach(error => {
                console.log(`Error L${error.code}: ${error.messageText}`);
            });
        }
        return {
            action,
            options,
            errors,
        };
    }
    L10ns.parseCommandLine = parseCommandLine;
})(L10ns || (L10ns = {}));
if (require.main === module) {
    const session = L10ns.parseCommandLine(process.argv);
    if (session.errors.length > 0) {
        session.errors.forEach(error => {
            console.log(`Error L${error.code}: ${error.messageText}`);
        });
        process.exit(1);
    }
}
/// <reference path='Types.ts'/>
var L10ns;
(function (L10ns) {
    const _fs = require('fs');
    const _path = require('path');
    const _exec = require('child_process').exec;
    const _glob = require('glob');
    const _mkdirp = require('mkdirp');
    const _mv = require('mv');
    const _cpr = require('cpr');
    const _rimraf = require('rimraf');
    L10ns.rootDir = joinPath(__dirname, '../../');
    function readFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _fs.readFile(file, { encoding: 'utf8' }, (err, content) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(content);
                });
            });
        });
    }
    L10ns.readFile = readFile;
    function writeFile(file, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _fs.writeFile(file, content, { encoding: 'utf8' }, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    L10ns.writeFile = writeFile;
    function joinPath(path, ...paths) {
        return _path.join(path, ...paths);
    }
    L10ns.joinPath = joinPath;
    function createFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _mkdirp(folder, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    L10ns.createFolder = createFolder;
    function copyFolder(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _cpr(from, to, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    L10ns.copyFolder = copyFolder;
    function remove(path) {
        _rimraf.sync(path);
    }
    L10ns.remove = remove;
    function exists(path) {
        try {
            // Query the entry
            _fs.lstatSync(path);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    L10ns.exists = exists;
    function moveFolder(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _mv(from, to, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
        });
    }
    L10ns.moveFolder = moveFolder;
    function runCommand(cmd, quiet = false) {
        return new Promise((resolve, reject) => {
            if (!quiet) {
                write(cmd);
            }
            _exec(cmd, (err, stdout, stderr) => {
                if (err || stderr) {
                    return reject(stderr || stdout);
                }
                if (!quiet) {
                    write(stdout);
                }
                resolve(stdout);
            });
        });
    }
    L10ns.runCommand = runCommand;
    function findFiles(query, fromDir) {
        return _glob.sync(query, fromDir ? { cwd: fromDir, mark: true } : undefined);
    }
    L10ns.findFiles = findFiles;
    function write(msg) {
        console.log(msg);
    }
    L10ns.write = write;
})(L10ns || (L10ns = {}));
module.exports.L10ns = L10ns;
