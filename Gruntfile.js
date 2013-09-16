module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: 'dist'
        },

        copy: {
            main: {
                expand: true,
                src: '**',
                dest: 'dist/',
                flatten: true,
                cwd: 'src/',
                filter: 'isFile'
            }
        },

        uglify: {
            options: {
                banner: '/*\n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> \n(C) 2013 - <%= pkg.author %> \nLicense: <%= pkg.license %> \nSource: <%= pkg.url %> \nDate Compiled: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean')

    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'uglify']);
};