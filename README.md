ES6 Vanilla.js navigation plugin to simple use on one-page websites.

## Basic Example
###Sample Markup:
<pre>
&lt;nav>
    &lt;a href="#section1>Link to section1&lt;/a>
    &lt;a href="#section2>Link to section2&lt;/a>
    &lt;a href="#section3>Link to section3&lt;/a>
    &lt;a href="#section4>Link to section4&lt;/a>
&lt;/nav>
&lt;div id="section1">
	&lt;h1 class="title">Section 1&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>

&lt;div id="section2">
	&lt;h1 class="title">Section 2&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>

&lt;div id="section3">
	&lt;h1 class="title">Section 3&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>

&lt;div id="section4">
	&lt;h1 class="title">Section 4&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>
</pre>

### Initialization:
<pre>
var nav = new SlideNav();
</pre>

## More complex example

###Sample Markup:
<pre>
&lt;div class="hamburger">
    &lt;div class="hamburger-line">&lt;/div>
    &lt;div class="hamburger-line">&lt;/div>
    &lt;div class="hamburger-line">&lt;/div>
&lt;/div>
&lt;div class="nav">
    &lt;nav>
        &lt;a href="#section1>Link to section1&lt;/a>
        &lt;a href="#section2>Link to section2&lt;/a>
        &lt;a href="#section3>Link to section3&lt;/a>
        &lt;a href="#section4>Link to section4&lt;/a>
    &lt;/nav>
&lt;/div>
&lt;div id="section1">
	&lt;h1 class="title">Section 1&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>

&lt;div id="section2">
	&lt;h1 class="title">Section 2&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>

&lt;div id="section3">
	&lt;h1 class="title">Section 3&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>

&lt;div id="section4">
	&lt;h1 class="title">Section 4&lt/h1>
	&lt;p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.&lt;/p>
&lt;/div>
</pre>

### Initialization:
<pre>
var nav = new SlideNav({
    activeClass: "active",
	toggleButtonSelector: '.hamburger',
	toggleBoxSelector: '.nav',
	hideAfterSelect: false,
	speed: 100  //default 250
});
</pre>

## License

**The credit comments in the JavaScript files should be kept intact**

(The MIT License)

Copyright (c) 2017 Piotr Kumorek &lt;contact.piotrkumorek@gmail.com&gt;
