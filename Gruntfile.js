module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'specs/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        clean:{
            	reports:'testresults',
            	logs:'e2e/logs'
            },
        protractor: {
            stag: {
                options: {
                    keepAlive: true,
                    configFile: "conf.js",
                    args: {
                        params: {
                            env: "stag"
                        }
                    }
                },
                singlerun: {},
                auto: {
                    keepAlive: true,
                    options: {
                        args: {
                            seleniumPort: 4444
                        }
                    }
                }
            },
			qa_ff: {
                options: {
                    keepAlive: true,
                    configFile: "conf_ff.js",
                    args: {
                        params: {
                            env: "qa"
                        }
                    }
                },
                singlerun: {},
                auto: {
                    keepAlive: true,
                    options: {
                        args: {
                            seleniumPort: 4444
                        }
                    }
                }
            },
			stag_ff: {
                options: {
                    keepAlive: true,
                    configFile: "conf_ff.js",
                    args: {
                        params: {
                            env: "stag"
                        }
                    }
                },
                singlerun: {},
                auto: {
                    keepAlive: true,
                    options: {
                        args: {
                            seleniumPort: 4444
                        }
                    }
                }
            },
            qa: {
                options: {
                    keepAlive: true,
                    configFile: "conf.js",
                    args: {
                        params: {
                            env: "qa"
                        }
                    }
                },
                singlerun: {},
                auto: {
                    keepAlive: true,
                    options: {
                        args: {
                            seleniumPort: 4444
                        }
                    }
                }
            },
			
			qasf: {
                options: {
                    keepAlive: true,
                    configFile: "conf_safari.js",
                    args: {
                        params: {
                            env: "qa"
                        }
                    }
                },
                singlerun: {},
                auto: {
                    keepAlive: true,
                    options: {
                        args: {
                            seleniumPort: 4444
                        }
                    }
                }
            },
			
			stagsf: {
                options: {
                    keepAlive: true,
                    configFile: "conf_safari.js",
                    args: {
                        params: {
                            env: "stag"
                        }
                    }
                },
                singlerun: {},
                auto: {
                    keepAlive: true,
                    options: {
                        args: {
                            seleniumPort: 4444
                        }
                    }
                }
            }
			
			
        },
        shell: {
            options: {
                stdout: true
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
            npm_install: {
                command: 'npm install'
            }
        }
    });

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.registerTask('install', ['shell:npm_install', 'shell:protractor_install']);
    grunt.registerTask('default', ['jshint', 'protractor:stag']);
    grunt.registerTask('stag', ['jshint', 'protractor:stag']);
    grunt.registerTask('qa', ['jshint', 'protractor:qa']);
	
	grunt.registerTask('stagff', ['jshint', 'protractor:stag_ff']);
    grunt.registerTask('qaff', ['jshint', 'protractor:qa_ff']);
	grunt.registerTask('qasf', ['jshint', 'protractor:qasf']);
	grunt.registerTask('stagsf', ['jshint', 'protractor:stagsf']);
	grunt.registerTask('qaall', ['clean','jshint','protractor:qa_ff','protractor:qa','protractor:qasf']);
	grunt.registerTask('stagall', ['clean','jshint','protractor:stagsf','protractor:stag','protractor:stag_ff']);
	
};