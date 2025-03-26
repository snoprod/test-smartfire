-- REQUETE 1
SELECT
    *
FROM
    wp_posts AS posts
WHERE
    post_type = 'post'
    AND post_status = 'publish'
ORDER BY
    post_date DESC;

-- REQUETE 2
SELECT
    users.display_name AS 'authorName',
    COUNT(posts.ID) AS 'countPosts'
FROM
    wp_posts AS posts
    INNER JOIN wp_users AS users ON posts.post_author = users.ID
GROUP BY
    users.ID

-- REQUETE 3
SELECT
    posts.post_title AS 'postTitle',
    postmeta.meta_value AS 'metaValue'
FROM
    wp_posts AS posts
    INNER JOIN wp_postmeta AS postmeta ON postmeta.post_id = posts.ID
    AND postmeta.meta_key = '_thumbnail_id'
WHERE
    wp_posts.post_status = 'publish'