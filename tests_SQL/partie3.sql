WITH
    ProductMonthlySales AS (
    SELECT
        DATE_FORMAT(orders.post_date, '%Y-%m') AS 'orderDate',
        meta_productId.meta_value AS 'productId',
        productMeta.post_title AS 'productName',
        SUM(meta_productQty.meta_value) AS 'totalProductQty'
    FROM wp_posts AS orders
    INNER JOIN wp_wc_order_items AS orderItems
    ON orderItems.order_id = orders.ID AND orderItems.order_item_type = 'line_item'
    INNER JOIN wp_wc_order_itemmeta AS meta_productId
    ON meta_productId.order_item_id = orderItems.order_item_id AND meta_productId.meta_key = '_product_id'
    INNER JOIN wp_wc_order_itemmeta AS meta_productQty
    ON meta_productQty.order_item_id = orderItems.order_item_id AND meta_productQty.meta_key = '_qty'
    INNER JOIN wp_posts AS productMeta
    ON productMeta.ID = meta_productId.meta_value
    WHERE orders.post_type = 'shop_order' AND orders.post_status IN('wc-completed', 'wc-processing')
    GROUP BY orderDate, productId, productName
    ),
    RankProduct AS (
        SELECT
            orderDate,
            productId,
            productName,
            totalProductQty,
            RANK() OVER(PARTITION BY orderDate ORDER BY totalProductQty DESC) AS soldRank
        FROM ProductMonthlySales
    ),
    BestProducts AS (
        SELECT
            orderDate,
            productId,
            productName,
            totalProductQty
            FROM RankProduct
            WHERE soldRank = 1
        )
SELECT
    DATE_FORMAT(orders.post_date, '%Y-%m') AS 'orderDate',
    COUNT(orders.ID) AS 'orderCount',
    ROUND(SUM(orderTotal.meta_value),
    2) AS 'orderTotalAmount',
    ROUND(AVG(orderTotal.meta_value),
    2) AS 'orderAverageAmount',
    bestProduct.productName
FROM
    wp_posts AS orders
INNER JOIN wp_postmeta AS orderTotal
ON
    orderTotal.post_id = orders.ID AND orderTotal.meta_key = '_order_total'
INNER JOIN BestProducts AS bestProduct ON bestProduct.orderDate = DATE_FORMAT(orders.post_date, '%Y-%m')
WHERE
    orders.post_date BETWEEN "2023-01-01" AND "2023-12-31" AND orders.post_type = "shop_order"
GROUP BY
    DATE_FORMAT(orders.post_date, '%Y-%m'),
    bestProduct.productName
ORDER BY
    `orderDate` ASC