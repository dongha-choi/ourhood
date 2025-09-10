/**
 * 객체에서 값이 falsy한 (null, undefined, '') 속성을 제거한 새 객체를 반환합니다.
 * 0이나 false는 유효한 값으로 간주하여 유지합니다.
 * @param obj 원본 객체
 */
export const cleanObject = <T extends object>(obj: T): Partial<T> => {
  const newObj: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      // null, undefined, 빈 문자열을 제외
      if (value !== null && value !== undefined && value !== '') {
        newObj[key] = value;
      }
    }
  }
  return newObj;
};
