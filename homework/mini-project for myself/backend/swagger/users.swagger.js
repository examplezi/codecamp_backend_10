/**
 * @swagger
 * /users:
 *   post:
 *     summary: 게시글 가져오기
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "아라111"
 *               email:
 *                 type: string
 *                 example: "ala@gamil.com"
 *               personal:
 *                 type: string
 *                 example: "220101-1111111"
 *               prefer:
 *                 type: string
 *                 example: "https://naver.com"
 *               pwd:
 *                 type: string
 *                 example: "1234"
 *               phone:
 *                 type: string
 *                 example: "01045079735"
 *
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "637328abb8678bad47405b01"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 게시글 등록하기
 *     tags: [User]
 *
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "아라111"
 *                 email:
 *                   type: string
 *                   example: "ala@gamil.com"
 *                 personal:
 *                   type: string
 *                   example: "220101-1111111"
 *                 prefer:
 *                   type: string
 *                   example: "https://naver.com"
 *                 pwd:
 *                   type: string
 *                   example: "1234"
 *                 phone:
 *                   type: string
 *                   example: "01045079735"
 *                 og:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "네이버"
 *                     description:
 *                       type: string
 *                       example: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                     image:
 *                       type: string
 *                       example: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_21285241…"
 *
 */
