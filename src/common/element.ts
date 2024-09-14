/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName element.ts
 * @CreateDate  周六  09/14/2024
 * @Description 元素的自定义
 ****************************************************************************/

export function setStyle(
  node: HTMLElement | HTMLInputElement,
  style: { [x: string]: string },
) {
  for (const cssRule in style) {
    if (Object.prototype.hasOwnProperty.call(style, cssRule)) {
      /**  @ts-expect-error: 油盐不进  */
      node.style[cssRule] = style[cssRule];
    }
  }
}
