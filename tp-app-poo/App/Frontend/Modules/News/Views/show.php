<link rel="stylesheet" href="./css/show.css" type="text/css"/>
<!-- page unique -->

<div id="page">
    <p>Par <em><?= $news['auteur'] ?></em>, le
        <?= $news['dateAjout']->format('d/m/Y à H\hi') ?>
    </p>
    <h2>
        <?= $news['titre'] ?>
    </h2>
    <p>
        <?php if ($news['image'] != '') { ?>
            <img src="/parcour4/Sources_TP_App/tp-app-poo/Web/images/<?= $news['image'] ?>" alt="<?= $news['titre'] ?>">
        <?php } ?>
        <?= htmlspecialchars_decode($news['contenu']) ?><br/>
        <?php if ($user->isAuthenticated()) { ?>
            <a href="admin/news-update-<?= $news['id'] ?>.html"> <strong>Modifier</strong> </a>
        <?php } ?>
    </p>
</div>

<?php
if (empty($comments)) {
    ?>
    <p>Aucun commentaire n'a encore été posté. Soyez le premier à en laisser un !</p>
    <?php
}

foreach ($comments

as $comment)
{
?>
<div>
    <fieldset>
        <legend>
            Posté par <strong><?= $comment['auteur'] ?></strong> le
            <?= $comment['date']->format('d/m/Y à H\hi') ?>
            <?php if ($user->isAuthenticated()) { ?> -
                <a href="admin/comment-update-<?= $comment['id'] ?>.html">Modifier</a> |
                <a href="admin/comment-delete-<?= $comment['id'] ?>.html">Supprimer</a> |
            <?php } ?>

            <a href="comment-signal-<?= $comment['id'] ?>.html">Signaler</a>
        </legend>
        <p>
            <?= $comment['contenu'] ?>
        </p>
    </fieldset>
    <?php
    }
    time();
    ?>
    <button class="bouton" onclick="manageComment.openComment()"> Commenter</button>

    <div id="manageCommentaire">
        <h2>Ajouter un commentaire</h2>
        <form action="commenter-<?= $news['id'] ?>.html" method="post">
            <p>
                <label>Auteur</label><input name="auteur" maxlength="50"
                                            type="text"><br><br><label>Contenu</label><br><textarea
                        class="commentaireShow" name="contenu" cols="50" rows="7"></textarea><br>
                <input class="bouton" value=" Poster " type="submit">
            </p>
        </form>
    </div>
</div>