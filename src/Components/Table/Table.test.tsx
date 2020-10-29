import React from "react";
import { Table, TableProps } from "./Table";
import { shallow } from "enzyme";
import { formatDate } from "../../common";

  const columns = [
    {
      name: "project",
      sortable: true
    },
    {
      name: "description",
      searchable: true
    },
    {
    name: "start date",
    formatValue: (val?: string | number) => formatDate(val)
    },
    {
      name: "category"
    },
    {
      name: "savings amount"
    },
    {
      name: "currency"
    },
    {
      name: "complexity"
    }
  ];
  const rows = [
    {
    "project": 2,
    "description": "Substitute Crème fraîche with evaporated milk in ice-cream products",
    "start date": "2013-12-28T00:00:00+00:00",
    "category": "Office supplies",
    "responsible": "Clark Kent",
    "savings amount": 3722.41684,
    "currency": "NULL",
    "complexity": "Moderate"
  }, {
    "project": 1,
    "description": "Decrease production related non-categorized side costs",
    "start date": "2013-06-14T00:00:00+00:00",
    "category": "Dairy",
    "responsible": "Daisy Milks",
    "savings amount": 5583.62526,
    "currency": "USD",
    "complexity": "Hazardous"
  }, {
    "project": 2,
    "description": "Stop using Kryptonite in production",
    "start date": "2014-04-09T00:00:00+00:00",
    "category": "Office supplies",
    "responsible": "Clark Kent",
    "savings amount": 7444.83368,
    "currency": "EUR",
    "complexity": "Simple"
  }, {
    "project": 1,
    "description": "Black and white logo paper",
    "start date": "2014-03-07T00:00:00+00:00",
    "category": "Dairy",
    "responsible": "Daisy Milks",
    "savings amount": 9306.0420999999988,
    "currency": "NULL",
    "complexity": "Moderate"
  }];

const getTableComponent = () => <Table {...{
  rows,
  columns
}}/>;

describe("Table", () => {
  it("renders Table component ok", () => {
    const tree = shallow(getTableComponent());
    expect(tree.find(".table--columns--sortable").length).toBe(1);
  });
  it("return two rows when searched for 'Kryptonite' text", () => {
    const table = shallow(getTableComponent());
    table.find(".search").simulate("change", { target: { value: "Kryptonite" } });
    // total span tag count is 7 (1 rows * 7 cols)
    expect(table.find("div.table--rows").find("span").length).toBe(7);
  });
  it("sort the rows by clicking on sortable column and arrow direction changes", () => {
    const table = shallow(getTableComponent());
    table.find("#project").simulate('click');
    expect(table.find("span.table--columns--sortable--asc").length).toBe(0);
    expect(table.find("span.table--columns--sortable--desc").length).toBe(1);
    
    // after sorting, verify the first text of the project column
    expect(table.find("span.project").first().text()).toBe('2');

  });

  it("Date format should be dd.mm.yyyy", () => {
    const table = shallow(getTableComponent());
    expect(table.find("span.start-date").first().text()).toMatch(/^(\d{1,2}).(\d{1,2}).(\d{4})$/);
  });
});
