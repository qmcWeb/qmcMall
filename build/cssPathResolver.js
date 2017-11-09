/**
 * Created by sks on 2017/10/23.
 */
module.exports = function (source) {
  if (process.env.NODE_ENV === 'production') {
    return source.replace('__webpack_public_path__ + "static', '"..')
  } else {
    return source
  }
}
