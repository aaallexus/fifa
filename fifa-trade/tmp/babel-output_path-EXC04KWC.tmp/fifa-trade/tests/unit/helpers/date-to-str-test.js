define('fifa-trade/tests/unit/helpers/date-to-str-test', ['exports', 'fifa-trade/helpers/date-to-str', 'qunit'], function (exports, _fifaTradeHelpersDateToStr, _qunit) {

  (0, _qunit.module)('Unit | Helper | date to str');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _fifaTradeHelpersDateToStr.dateToStr)([42]);
    assert.ok(result);
  });
});