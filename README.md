# json2svg
A converter of graphic instructions in JSON format into Scalable Vector Graphic [(SVG)](https://developer.mozilla.org/en-US/docs/Web/SVG) format.

## Inspiration
This project was inspired by a project developed by/for [Brilliant](https://brilliant.org/) called Diagrammar. There is a YouTube video ["Diagrammar: Simply Make Interactive Diagrams" by Pontus Granström (Strange Loop 2022)](https://youtu.be/gT9Xu-ctNqI) that describes the project.

> Diagrammar is a tool for creating interactive diagrams, that aims to be much simpler, while retaining the power of a full programming language (Elm).

Personally, I would prefer to get my hands on the project source code s this would:
1. Equip me with a tool I could use to create diagrams for my own purposes.
1. Provide me with an excellent reason for becoming more familiar with the programming language Elm.

Unfortuntely the project is not available to the public, not even (at this point in time) on Brilliant's [GitHub repo](https://github.com/brilliantorg).

I am less interested in the interactive capability of Diagrammar than its simple syntax for generating SVG diagrams. I could just write SVG by hand but:
1. The SVG syntax is quite verbose; this project provides the opportunity to be selective of the SVG to implement and reduce the syntax required.
1. SVG diagram can involve some mathematics that is better provided by JavaScript.

## Implementation
The json2svg project comprises of a ES Module (json2svg-lib) intended to be used by the Node.JS application (json2svg-app) but could be used inside a web browser.

Like the original project, json2svg will support:

* The creation of
- ~~circle/elipse~~
- ~~rectangle/square~~
- ~~regularPolygon~~
- ~~polygon (irregular)~~
- image
- ~~text~~
- ~~line/polyline~~

* Transformation such as
- translate
- scale
- ~~rotate~~

* Utilities such as
- align
- pad

* Layout (Combinators)
- ~~stack~~
- row
- column

* Curated Style
- 12 set colours including transparent
- 4 line thicknesses
- 4 line styles
- ? Fonts

* Data tpes
- Int
- Float
- String
- List (array)
