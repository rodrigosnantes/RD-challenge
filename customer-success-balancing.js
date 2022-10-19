/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

/* UITLS */
function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt) {
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  function getCssAvailableList() {
    return customerSuccess.filter((item) => {
      return !customerSuccessAway.some((csAway) => csAway === item.id);
    });
  }

  function hasMinCssQuantityAvailable(csAwayParam, allCss) {
    return csAwayParam.length <= allCss.length / 2;
  }

  function getCssListConfig(cssAvailableProps, customersProps) {
    let customerLastHighestScore = null;
    const cssConfigList = sortListbyProperty(cssAvailableProps, 'score').map((css) => {

      const customerList = filterCustomerListByScore(customersProps, 'score', css.score);

      let newCustomerList;
      if (!customerLastHighestScore) {
        newCustomerList = customerList;
      } else {
        newCustomerList = customerList.filter((item) => item.score > customerLastHighestScore);
      }

      const scoreNumberList = getCustomerScoreListValues(customerList);
      customerLastHighestScore = Math.max(...scoreNumberList);

      return { cssId: css.id, customerCount: newCustomerList.length };
    })

    return cssConfigList;
  }

  function getCssWithMoreCustomers(arrayList) {
    const sortList = sortListbyProperty(arrayList, 'customerCount');
    const tie = checkTieAttendance(JSON.parse(JSON.stringify(sortList)));
    if (tie) {
      return { cssId: 0, customerCount: 0 };
    }
    return sortList.pop();
  }

  function checkTieAttendance(arrayList) {
    const customerCountNumberList = arrayList.map((item) => (item.customerCount));
    const cutItem = customerCountNumberList.slice(-2);
    const [css01, css02] = cutItem;
    return css01 === css02
  }

  function sortListbyProperty(arrayList, property) {
    return arrayList.sort((a, b) => {
      return a[property] - b[property];
    })
  }

  function filterCustomerListByScore(array, property, value) {
    return array.filter((item) => item[property] <= value);
  }

  function getCustomerScoreListValues(arrayList) {
    return arrayList.map((css) => css.score);
  }

  const cssAvailableList = getCssAvailableList();
  const minCssAvailable = hasMinCssQuantityAvailable(customerSuccessAway, customerSuccess);

  let result = null;
  if (!minCssAvailable) {
    throw new TypeError('no minimum quantity available');
  } else {
    const cssConfig = getCssListConfig(cssAvailableList, customers);
    result = getCssWithMoreCustomers(cssConfig);
    return result.cssId;
  }
}

/* ----- */

test("Scenario 1", () => {
  // irá retornar um (1), pois esse css pode atender a maior quantidade de clientes.
  const css = mapEntities([60, 20, 95, 75]);
  const customers = mapEntities([90, 20, 70, 40, 60, 10]);
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 2", () => {
  // irá retornar zero(0) pois os css ids (1,2 e 3) atendem 3 cada um (empate).
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);
  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  // irá retornar zero(0) pois nenhum css tem score para atender nenhum cliente.
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  // irá retornar '1' pois apenas o css de ID 1 tem score para atender os cientes.
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  // irá retornar zero(0), pois há um empate entre os css id () que não possuem suficientes para atender nenhum clientes.
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  // irá retornar 'no minimum quantity available (throw)' para quando a quantidade de css away for maior que a metade do total de css.
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6, 1];

  expect(() => customerSuccessBalancing(css, customers, csAway)).toThrow('no minimum quantity available');
});
