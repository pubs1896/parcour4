<?php
foreach ($listeNews as $news)
{
?>
	<div id="article">
		<h2>
			<a href="news-<?= $news['id'] ?>.html">
				<?= $news['titre'] ?>
			</a>
		</h2>

		<p>
			<img src="<?= $news['image'] ?>" alt="<?= $news['titre'] ?>">
			<?= nl2br($news['contenu']) ?>
		</p>
	</div>
	<?php
}