Version 2.10, Summer, 2015

-- SUMMARY --

Gratis 2 is a responsive Drupal 7 HTML5 theme designed and developed by
Danny Englander (Twitter: @Danny_Englander). Gratis 2.0 has been
re-architected from the ground up using LibSass, Susy, Boubon, and Grunt.

Gratis is aimed at users who want to get a nice looking theme up and
running in short order, but may not want to take the time to create a sub-theme
and fiddle with regions, settings, media queries, and other highly technical
things. It's also aimed at a casual Drupal user who has some familiarity
with building sites. This theme also does not require any base theme.

-- CONFIGURATION --

- Configure theme settings in Administration > Appearance > Settings >
  gratis or admin/appearance/settings/gratis and choose various options
  available.

-- THEME SETTINGS UI --

- Choice of 14 color palettes

- Boxed or Default layout

- 14 Color Tints and backgrounds (works only with Boxed mode)

- Toggle Breadcrumbs on or off

- Font selections (via Google fonts)

- Local CSS - Choose to enable local.css file within the theme folder.

- Custom Path CSS -  Define a custom path for your own css file to use with
   the theme.

- Customizable layout width in the theme settings UI, go as wide as you
  want! It's all percentage based within the parent container. That's one of
  the drawbacks of Bamboo and there were a lot of feature requests for this.

- Main Menu block region Use this region if you turn off "Main Menu" in the
  theme settings and use your own third party menu system such as Menu Block
  or Superfish Module. You are responsible for any styling and CSS for this.
  (Use local.css as mentioned above.)

- Pinch and Zoom for Touch friendly devices - Option to choose whether to
  pinch and zoom on a touch sensitive device or not. Default is off. Note,
  there is no support for layouts breaking or otherwise if you choose to
  enable this option.

- Tertiary Menus -  (Currently not supported)

- Note for drop down / sub-menus to work, you need to set a main menu item
  to "Show as expanded" in the Drupal menu settings UI. This setting is
  located at /admin/structure/menu/item/xxx/edit where "xxx" is the id of
  your menu item. Or simply go to: Administration > Structure > Menus > Main
  menu and then click a menu item and edit. If you need help with this,
  please consult Drupal core documentation.

- Full Width Highlight block region
   This region is meant to be used for full width images and slideshows. This
will
   require addtional theming on the user's end. There is no inner div element
out
   of the box so if you would like to use this for something other than an
image,
   you will need to theme it yourself.

-- REQUIREMENTS --

No base theme needed, simply use this theme on its own.

-- INSTALLATION --

Install as usual, see http://drupal.org/node/176045 for further
information.

-- CUSTOMIZATION --

* As with any other Drupal theme you are able to customize just about every
  aspect of this theme but some nice defaults are provided out of the box
  with gratis.

- drupal.org theme guide is here : http://drupal.org/documentation/theme

-- UPGRADING -- Nothing too tricky here other than if you have a local.css
or custom path CSS file as per the documentation. When upgrading, you must
preserve local.css somewhere, otherwise it could get overwritten with the
upgrade. After you upgrade, you can then drop local.css back in to the
theme. Of course if you have modified other files, they will all get
overwritten.

- In many cases, a subtheme is probably recommended then as opposed to
using local.css. You can create a sub-theme of your own to put all your
overrides in: "Creating a sub-theme" - http://drupal.org/node/225125 A
future version of this theme may allow for a custom path for local.css to
avoid upgrade snags.

-- Gratis with LibSass and Grunt
The following is optional and only necessary if you really want to
learn about and leverage Grunt and LibSass, ideally in a sub-theme.

To get up and running, follow the steps below:

1. First check to see if you have node.js installed: node -v - If so you may
    need to update it to the version needed here. (Steps for other versions
    removal if needed below, see Reinstalling Node.js)

2. Install Node.js (this is needed for grunt) from http://nodejs.org/ +
    Ideally at the moment, install node.js version v0.10.35 though in some
    cases the newest line of Node, .12.x may work. If grunt freezes and
    you can't compile, best to go down to the .10.x series.

    -- https://nodejs.org/download/
    -- http://nodejs.org/dist/v0.10.35/ (node-v0.10.35.pkg is ideal for OS X)

3. Once you install node, then install grunt CLI globally: npm install -g
    grunt-cli

4. In terminal, cd to the gratis folder (or your subtheme which would be
   prefered) Note, see the Starterkit readme for setting up a sub-theme
   /gratis/STARTERKIT/README.txt

5. Run npm install. If you have errors, try prefacing with sudo but this might
    indicate a directory ownership issue that needs fixing.

6. You should see a node_modules folder in the root of the theme folder. This
    contains all the modules needed for grunt to run. e.g. grunt-sass, susy,
    etc...

7. Enable LiveReload in the theme's UI settings page.

8. Download / enable the Link CSS module either via drush or the module admin
   UI.

9. Start grunt: type grunt in terminal (no quotes)

10. Add or change some Sass. You will see terminal print out a time bar with
      the render times.

Reinstalling Node.js

If you ever need to reinstall node try this:
rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}

See this for more info:
How do I uninstall nodejs installed from pkg (Mac OS X)?
http://stackoverflow.com/a/17203692/819276

If you remove node and then reinstall, you'll need to also reinstall the grunt
CLI.

-- NOTES --

Include Media is now implemeted in the Node build. This is a great
media query mixin library.
See this for more info:
https://github.com/eduardoboucas/include-media

This theme supports CSS3 / HTML5 and media queries. There is no support for
IE9 or below so please do not file any issues in regard to this.

If you require specific customizations that you are not able to do on your
own, you may need to hire a developer. Please email me through my website's
contact form. http://dannyenglander.com/contact-us

Buy me a Latte - Help support gratis but it's not a requirement.
http://dannyenglander.com/buy-me-latte

-- Danny Englander Drupal Themer and Photographer --
San Diego, California
Blog: http://dannyenglander.com
Photos: http://highrockphoto.com
