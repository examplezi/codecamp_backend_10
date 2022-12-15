/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 게시글 가져오기
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01045079735"
 *
 *
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "핸드폰으로 인증 문자가 전송되었습니다!"
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 게시글 등록하기
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01045079735"
 *               token:
 *                 type: string
 *                 example: "123456"
 *
 *
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 */
