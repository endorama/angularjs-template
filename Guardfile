# AngularJS Guardfile
# Based on the angular-seed app (https://github.com/angular/angular-seed)
# The coffee, sass and slim file are under the current folder.
# The angularjs main layout file is index.slim

interactor :off
Guard.options[:clear] = true
Dir.chdir(Guard.options[:watchdir]) if Guard.options[:watchdir]

# Log to STDOUT
logger :level       => :info,
       :template    => '[:severity - :time - :progname] :message',
       # :time_format => 'at %I:%M%p',
       # :only        => [:rspec, :jasmine, 'coffeescript'],
       :except      => :jammit,
       :device      => STDOUT

# Compile coffeescript files
guard 'coffeescript', 
  :input => 'src/js',
  :output => 'app/js'

# Compile SASS files
guard 'sass',
  :input => 'src/css',
  :output => 'app/css',
  :smart_partials => true,
  :style => :compressed,
  :line_numbers => false

# Compile SLIM views
guard 'slim', 
  :input_root => 'src',
  :output_root => 'app/',
  :slim => { :pretty => true } do
  watch(%r'^.+\.slim')
end

# Look for modifications for languages yml
guard 'i18next',
  :output => 'app/locales' do
  watch(%r{src/locales/.+\.yml$})
end

# Enable LiveReload server
guard 'livereload' do
  watch('app/index.html')
  watch(%r{app/views/.+\.html$})
  watch(%r{app/locales/.+\.json$})
  watch(%r{app/js/.+\.js})
  watch(%r{app/css/.+\.css})
end
