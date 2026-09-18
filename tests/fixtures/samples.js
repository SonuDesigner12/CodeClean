export const messyHtml = `<div class="container"
Style=" "
>
<h1
class="fw-bold"
>
Fixed Container
</h1>
<p>
This layout centers content and adapts
its max-width at responsive breakpoints.
</p>
</div>`;

export const messyHtmlWithUrl = `<a href="https://example.com/path?q=1"
class="link"
>
Visit
</a>`;

export const protectedPre = `<pre>
  keep   these

    spaces
</pre>`;

export const htmlWithScript = `<div>
<script>
const x = 1;
</script>
</div>`;

export const messyCss = `.card{
color:red;


background:  url("https://cdn.example.com/bg.png");
}`;

export const messyJs = `function greet(name){
return "Hello " + name + " https://example.com";
}`;

export const messyJson = `{
"name":
"CodeClean", "safe": true
}`;

export const wordpressTemplate = `<?php get_header(); ?>
<div class="wrap"
>
<h1><?php the_title(); ?></h1>
<?php echo do_shortcode('[gallery id="42"]'); ?>
</div>
<?php get_footer(); ?>`;

export const liquidTemplate = `<h1>{{ product.title }}</h1>
<div class="price"
>
{% if product.available %}
{{ product.price | money }}
{% endif %}
</div>`;

export const htmlWithCss = `<style>
body{color:red;}
</style>
<div class="box"
>
Hello
</div>`;

export const htmlWithJs = `<div>
<button>Go</button>
<script>
console.log("keep");
</script>
</div>`;

export const malformedHtml = `<div class="open"
<h1>Broken`;

export const incompleteInput = `<div>`;

export const aiMessyHtml = `<section id="hero"
  class="banner"


>
    <img src="https://cdn.example.com/hero.png" alt="Hero"
    />
      <p>
        Welcome
        to
        CodeClean
      </p>
</section>`;
