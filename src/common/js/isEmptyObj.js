/**
 * Created by sks on 2017/9/18.
 */
export function isEmptyObj(Obj) {
  for (var i in Obj)
    return false
  return true
}
