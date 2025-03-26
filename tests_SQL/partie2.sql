-- REQUETE 1
SELECT
    posts.ID AS 'postId',
    users.display_name AS 'author',
    COUNT(postmeta.meta_id) AS 'countMeta'
FROM
    wp_posts AS posts
INNER JOIN wp_users AS users ON users.ID = posts.post_author
INNER JOIN wp_postmeta AS postmeta ON postmeta.post_id = posts.ID
WHERE
    posts.post_type = 'post'
    AND posts.post_status = 'publish'
GROUP BY
    posts.ID
ORDER BY
    post_date DESC
LIMIT
    5

-- REQUETE 2
SELECT
    ID AS 'postId',
    post_title AS 'postTitle',
    post_date AS 'postDate'
FROM
    wp_posts
WHERE
    post_type = 'post'
    AND (
        post_title LIKE '%WordPress%'
        OR post_content LIKE '%WordPress%'
    )

-- REQUETE 3
SELECT
    users.*
FROM
    wp_users AS users
WHERE
    NOT EXISTS (
        SELECT
            *
        FROM
            wp_posts AS posts
        WHERE
            posts.post_author = users.ID
    )