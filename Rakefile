# https://gist.github.com/412058
# https://github.com/sstephenson/prototype/blob/master/Rakefile
# http://www.simonecarletti.com/blog/2011/09/using-sprockets-without-a-railsrack-project/

# TODO: find a way to shut up require tests (git, java) for windows (i.e. /dev/null)

require 'rake'
require 'rake/packagetask'
require 'pathname'

module Wombat
  ROOT_DIR      = Pathname(File.dirname(__FILE__))
  SOURCE_DIR    = ROOT_DIR.join('src')
  BUILD_DIR     = ROOT_DIR.join('build')
  DOC_DIR       = ROOT_DIR.join('doc')
  PKG_DIR       = ROOT_DIR.join('pkg')
  SPEC_DIR      = ROOT_DIR.join('spec')
  VENDOR_DIR    = ROOT_DIR.join('vendor')
  
  VERSION       = '0.1' #: load from file (YAML.load(IO.read(SOURCE_DIR.join('constants.yml')))['PROTOTYPE_VERSION'])
  
  # add needed tools to load path
  %w[sprockets closure-compiler].each do |name|
    $:.unshift(Wombat::VENDOR_DIR.join(name, 'lib'))
  end
  
  
  def self.has_git?
    begin
      `git --version`
      return true
    rescue
      return false
    end
  end
  
  
  def self.require_git
    return if has_git?
    puts "\nWombat requires Git in order to load its dependencies."
    puts "Check if Git is installed and configured properly in your path."
    puts "For more informations, visit:\n\n"
    puts "  http://book.git-scm.com/2_installing_git.html"
    exit
  end
  
  
  def self.has_java?
    begin
      `java -version`
    rescue
      return false
    end
  end
  
  
  def self.require_java
    return if has_java?
    puts "\nWombat requires Java in order to use Closure Compiler."
    puts "Check if Java is installed and configured properly in your path."
    puts "To download it, visit:\n\n"
    puts "  http://java.com/download"
    exit
  end
  
  
  def self.require_sprockets
    require_submodule('Sprockets', 'sprockets')
  end
  
  
  def self.require_closure_compiler
    require_submodule('Closure Compiler', 'closure-compiler')
  end
  
  
  def self.require_submodule(name, path)
    begin
      require path
    rescue LoadError => e
      missing_file = e.message.sub('no such file to load -- ', '')
      if missing_file == path
        # missing git submodule
        retry if get_submodule(name, path)
      else
        # missing gem
        puts "\n#{name} is missing the '#{missing_file}' gem. Please run:"
        puts "\n  $ gem install #{missing_file}"
      end
      exit
    end
  end
  
  
  def self.get_submodule(name, path)
    require_git
    puts "\n#{name} is missing. Obtaining it via git...\n\n"
    
    system "git submodule init"
    return true if system "git submodule update vendor/#{path}"
    
    puts "\nLooks like it didn't work. Try it manually:\n"
    puts "  $ git submodule init"
    puts "  $ git submodule update vendor/#{path}"
    false
  end
end


task :default => 'wombat:build'


namespace :wombat do
  task :package => [:build, :clean] do
    
  end

  
  desc "build a production release of Wombat!"
  task :build => [:compile]

  
  desc "build a development release of Wombat!"
  task :build_debug => [:compile_debug]

  
  task :compile => [:merge] do
    begin
      closure = Closure::Compiler.new(
        :compilation_level => 'SIMPLE_OPTIMIZATIONS',
        :js_output_file    => Wombat::BUILD_DIR.join('wombat.js')
      )
      closure.compile(File.open(Wombat::BUILD_DIR.join('wombat-debug.js')))
    rescue Closure::Error => e
      puts e
    end
  end

  
  task :compile_debug => [:merge]

  
  task :merge => [:require] do
    sprockets = Sprockets::Environment.new(Wombat::ROOT_DIR)
    sprockets.append_path(Wombat::SOURCE_DIR)
    
    assets = sprockets.find_asset('wombat.js')
    assets.write_to(Wombat::BUILD_DIR.join('wombat-debug.js'))
  end

  
  task :require do
    Wombat.require_sprockets
    Wombat.require_java
    Wombat.require_closure_compiler
  end
end


# inspired from http://7enn.com/2011/03/13/running-rake-automatically-when-rb-file-changes/
task :watch do
  require 'watchr'

  all_js = Dir[Wombat::SOURCE_DIR.join('**/*.js')].join('|')
  script = Watchr::Script.new
  script.watch(all_js) { system("rake") }
  controller = Watchr::Controller.new(script, Watchr.handler.new)

  trap('INT') { exit }
  controller.run
end


desc "runs BDD tests"
task :test => ['test:run']


namespace :test do
  task :run => [:require, :jasmine]


  task :require do
    begin
      require 'jasmine'
      load 'jasmine/tasks/jasmine.rake'
    rescue LoadError
      abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
    end
  end
end
