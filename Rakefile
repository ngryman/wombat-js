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
  TEST_DIR      = ROOT_DIR.join('test')
  TEST_RUN_DIR  = BUILD_DIR.join('test')
  VENDOR_DIR    = ROOT_DIR.join('vendor')
  
  VERSION       = '0.1' #: load from file (YAML.load(IO.read(SOURCE_DIR.join('constants.yml')))['PROTOTYPE_VERSION'])
  
  # add needed tools to load path
  %w[sprockets closure-compiler unittest_js].each do |name|
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
  
  
  def self.require_unittest_js
    require_submodule('UnittestJS', 'unittest_js')
  end
  
  
  def self.require_qunit
    unless File.exist?(Wombat::VENDOR_DIR.join('qunit', 'qunit'))
      puts 'file not exist'
       unless get_submodule('QUnit', 'qunit')
         puts 'submodule git failed'
         exit
       end
    end
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
      puts.e
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


task :test => ['test:run']

namespace :test do
  task :run => [:build] do
    browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
    runner           = UnittestJS::WEBrickRunner::Runner.new(:test_dir => Wombat::TEST_RUN_DIR)
    
    Dir[Wombat::TEST_RUN_DIR.join('*_test.html')].each do |file|
      file = File.basename(file)
      test = file.sub('_test.html', '')
      runner.add_test(file)
    end
    
    UnittestJS::Browser::SUPPORTED.each do |browser|
      unless browsers_to_test && !browsers_to_test.include?(browser)
        runner.add_browser(browser.to_sym)
      end
    end
    
    trap('INT') { runner.teardown; exit }
    runner.run
  end
  
  
  task :build => [:clean, 'wombat:build_debug'] do
    # we don't use the shiped client-side framework of unittest_js because of conflicts with prototype.js
    # instead we use qunit. so we also need to move qunit files to the assets folder manually
    require 'tmpdir'
    
    Dir.mktmpdir do |tmpdir|
      FileUtils.cp(Dir[Wombat::BUILD_DIR.join('*.js')], tmpdir)
      FileUtils.cp(Dir[Wombat::VENDOR_DIR.join('qunit', 'qunit', '*')], tmpdir)
      
      builder = UnittestJS::Builder::SuiteBuilder.new({
        :input_dir  => Wombat::TEST_DIR,
        :assets_dir => tmpdir,
        :output_dir => Wombat::TEST_RUN_DIR,
      })
      
      builder.collect
      builder.render
    end
  end
  
  
  task :clean => [:require] do
    UnittestJS::Builder.empty_dir!(Wombat::TEST_RUN_DIR)
  end
  
  
  desc "shows a list of supported browsers, with an asterix for those which are installed"
  task :list_browsers => [:require] do
    UnittestJS::Browser::SUPPORTED.each do |browser|
      # TODO: clean this
      browser_name = browser != 'ie' ? browser != 'webkit' ? browser.capitalize : 'WebKit' : 'IE'
      browser_inst = UnittestJS::Browser.const_get(browser_name).new
      
      puts (browser_inst.supported? ? '*' : ' ') + ' ' + browser_inst.name
    end
  end
  
  
  task :require do
    Wombat.require_unittest_js
    Wombat.require_qunit
  end
end