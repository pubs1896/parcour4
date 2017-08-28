<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="utf-8">
	<title>
		<?= isset($title) ? $title : 'Blog' ?>
	</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta property="og:description" content="" />
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css?family=Philosopher" rel="stylesheet">
	<link rel="stylesheet" href="http://localhost/Sources_TP_App/tp-app-poo/Web/css/plume.css" type="text/css" />
</head>

<body>
	<div id="menu-header">
		<h1>
			<a href="http://localhost/Sources_TP_App/tp-app-poo/Web/">
				<?= isset($title) ? $title : 'Blog' ?>
			</a>
		</h1>
		<nav>
			<ul> <!-- Penser a ajouter des images pour que l'écrivain puisse ajouter des images -->
				<li><a href="http://localhost/Sources_TP_App/tp-app-poo/Web/"> Accueil </a></li>
				<?php if ($user->isAuthenticated()) { ?>
				<li><a href="http://localhost/Sources_TP_App/tp-app-poo/Web/admin/"> Admin </a></li>
				<li><a href="http://localhost/Sources_TP_App/tp-app-poo/Web/admin/news-insert.html"> Ajouter un article </a></li>
				<?php } ?>
			</ul>
		</nav>
	</div>
	<div id="menu-header-scrollBas">
		<nav>
			<ul>
				<li><a href="http://localhost/Sources_TP_App/tp-app-poo/Web/"> Accueil </a></li>
				<?php if ($user->isAuthenticated()) { ?>
				<li><a href="http://localhost/Sources_TP_App/tp-app-poo/Web/admin/"> Admin </a></li>
				<li><a href="http://localhost/Sources_TP_App/tp-app-poo/Web/admin/news-insert.html"> Ajouter un article </a></li>
				<?php } ?>
			</ul>
		</nav>
	</div>
	<div id="content-wrap">
		<section id="main">
			<?php if ($user->hasFlash()) echo '<p style="text-align: center;">', $user->getFlash(), '</p>'; ?>

			<?= $content ?>

		</section>
		<section id="footer">
			<a href=""><i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a>
			<a href=""><i class="fa fa-twitter-square fa-2x" aria-hidden="true"></i></a>
			<a href=""><i class="fa fa-youtube-square fa-2x" aria-hidden="true"></i></a>
			<a href=""><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
			<a href=""><i class="fa fa-pinterest-square fa-2x" aria-hidden="true"></i></a> <br />
			<div class="colorfooter">
				<p class="footer-size">

					<br />
					<i title="Appelez-nous" class="footer-color-contact"> <i class="fa fa-phone-square" aria-hidden="true"></i> +33 00 00 00 00</i> <br /><br />
					<a class="footer-color-contact" title="" href="" data-cached-title="Contactez-nous"><i class="fa fa-envelope" aria-hidden="true"></i>  mail@monsite.fr</a>

			</div>


		</section>
	</div>
	<script src="http://localhost/Sources_TP_App/tp-app-poo/Web/js/javascript.js"></script>
</body>

</html>