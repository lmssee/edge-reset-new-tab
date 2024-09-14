/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName commandData.ts
 * @CreateDate  周五  09/13/2024
 * @Description 弹出窗口的公共数据区
 ****************************************************************************/

/**
 *
 * 公共数据类型
 */
type CommonDataT = {
  /** 页面的 id ，在恢复数据时会用到 */
  id: number;
  /**  当前页面的 url */
  url: string;
  /** 储存被选中新标签页的值  */
  newTabValue: string;
  /** 储存被选择的值，用于在同一页面的再次展示 */
  refreshSelected: number;
  /** 监控树列表 */
  watchList: { [x: string]: (() => void)[] };
  /** 监控方法 */
  watch(
    property: string,
    callback: (property?: string, newValue?: unknown) => void,
  ): void;
  /** 按钮组默认被选中
   *
   * @param {string} value  当前选择的单选按钮的 value 值
   */
  checked(value: string): void;
  /** 出现错误方法 */
  error(): void;
};

/** # 公共数据原始数据
 * - id
 */
const commonDataOrigin: CommonDataT = {
  /** 页面的 id ，在恢复数据时会用到 */
  id: 0,
  /**  当前页面的 url */
  url: '',
  /** 储存被选择的值，用于在同一页面的再次展示 */
  refreshSelected: 0,
  newTabValue: '',
  checked(value: string) {
    document
      .querySelector(`input[value='${value}']`)!
      .setAttribute('checked', 'true');
  },
  /** 出现错误 */
  error() {
    alert('出现错误，请稍后重试');
    window.close();
  },

  /** 可控制的列表 */
  watchList: {},
  /** 可执行监控 */
  watch(
    property: string,
    callback: (property?: string, newValue?: unknown) => void,
  ) {
    const watchList = this.watchList as { [x: string]: (() => void)[] };
    const _p = watchList[property] || [];
    _p.push(callback);
    watchList[property] = _p;
  },
};

/** # 公用数据
 * - id                     页面的 id，用于发送给消息或比对数据
 * - url                    当前页面的 url
 * - newTabValue            新标签页被储存的值
 * - refreshSelected        刷新页面被储存的值
 * - checked(value)         切换默认选择，用户初始化和候选
 * - error()                弹出一个 error 的弹窗
 */
export const commonData: CommonDataT = new Proxy(commonDataOrigin, {
  get(obj, property, receive) {
    return Reflect.get(obj, property, receive);
  },
  set(obj, property, newValue, receive) {
    const template = obj.watchList[property as string] as (() => void)[];
    if (template) {
      for (const callback of template) {
        Reflect.apply(callback, obj, [property, newValue]);
      }
    }

    Reflect.set(obj, property, newValue, receive);
    return true;
  },
});
