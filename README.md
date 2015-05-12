## Synopsis

Combing visual artwork with modern technology, Anotare implements an annotating feature next to the art that helps users make sense of it.

homepage: http://sufeizhang.me/anotare/#
main page: http://sufeizhang.me/anotare/#/main/annotation

## Breakdown of the code

annotation-directive.js: makes display-annotation element. initialize the canvas and the shapes on the main page
drawing-diretive.js: makes drop-tool element. for editing the shapes
gallery-directive.js: makes photo-slider element. to display pictures like an album
horizontal-infinity-scroll.js: makes horizontal-infinity-scroll element. for displaying pictures
parallax-directive.js: makes parallax element. makes pleasing visual effect for the logo on the homepage

## Motivation

Helps art students and enthusiast collaborate on annotating artworks.

## Installation

Ruby, Compass, npm, bower, and grunt must be installed beforehand. The website is built using AngularJS and is using Yeoman scaffolding tool. After fork/cloning the repository, inside the project folder, run:
	npm install
	bower install
to install all the dependencies of this project. To see live changes, run:
	grunt serve
