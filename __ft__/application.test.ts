import { Selector } from "testcafe";

async function getMatchingItemsValues(selector : Selector) {
    const matchingItemsCount = await selector.count;
    const itemValues : Array<string> = []
    for (let i = 0; i < matchingItemsCount; ++i) {
        const val = await selector.nth(i).innerText;
        itemValues.push(val);
    }
    return itemValues;
}

// converts dates string (dd/mm/yyyy) to date object in mm/dd/yyyy
const formatDate = (dates : Array<string>) => {
    return dates.map(arrItem => {
        const dateParts = arrItem.split('.');
        return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
    });
}

function isAscending(arr : Array<string>) {
    const updatedArray = formatDate(arr);
    return updatedArray.every(function (x, i) {
        return i === 0 || x >= updatedArray[i - 1];
    });
}
function isDecending(arr : Array<string>) {
    const updatedArray = formatDate(arr);
    return updatedArray.every(function (x, i) {
        return i === 0 || x <= updatedArray[i - 1];
    });
}
fixture(`Table with loaded data`).page(`http://localhost:3000/`);

test("Data is loaded initially into the table and can be sorted by date", async t => {
    await t
        .wait(2000) // wait for api to return the data
        .expect(Selector(".table--columns").exists)
        .ok()
        .expect(Selector(".table--rows").exists)
        .ok()
        .expect(Selector("#start-date").hasClass("column--not-sorted"))
        .ok()
        .click(Selector("#start-date"))
        .expect(Selector("#start-date").hasClass("column--not-sorted"))
        .notOk()
        .expect(Selector("#start-date").find(".table--columns--sortable--desc").exists)
        .ok();

    await t
        .expect(isDecending(await getMatchingItemsValues(Selector(".table--rows").find(".start-date"))))
        .eql(true)
        .click(Selector("#start-date"))
        .expect(Selector("#start-date").find(".table--columns--sortable--asc").exists)
        .ok();
    await t
        .expect(isAscending(await getMatchingItemsValues(Selector(".table--rows").find(".start-date"))))
        .eql(true)
  });