import { expect, test } from "@playwright/test";

test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

// ABOVE: COPIED FROM GEARUP

test("can't view/search without loading first", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // expect error in history after viewing
  await page.getByLabel("Command input").fill("view test.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(output1).toEqual("Please load the file test.csv before viewing!");

  // expect error in history after searching
  await page.getByLabel("Command input").fill("search test.csv test");
  await page.getByRole("button", { name: "Submit" }).click();

  const output2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent; // TODO: check that this (and next ones) all get correct value of history
  });
  expect(output2).toEqual("Please load the file test.csv before searching!");

  // now load a csv, then search+test
  await page.getByLabel("Command input").fill("load test.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output3 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(output3).toEqual("Loaded file test.csv");

  // can view correctly
  await page.getByLabel("Command input").fill("view test.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output4 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(output4).toEqual(
    "123abcdef" // these are the contents of test.csv
  );

  // can search correctly
  await page.getByLabel("Command input").fill("search test.csv a");
  await page.getByRole("button", { name: "Submit" }).click();

  const output5 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[4]?.textContent;
  });
  expect(output5).toEqual("abc");
});

test("command doesn't exist", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("blah");
  await page.getByRole("button", { name: "Submit" }).click();

  const output1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(output1).toEqual("Error: command does not exist");

  await page.getByLabel("Command input").fill("blah blah blah");
  await page.getByRole("button", { name: "Submit" }).click();

  const output2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(output2).toEqual("Error: command does not exist");
});

test("incorrect # args for all 3 commands", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // mode
  await page.getByLabel("Command input").fill("mode a b");
  await page.getByRole("button", { name: "Submit" }).click();

  const output1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(output1).toEqual(
    "Incorrect number of arguments inputted. Please input 'mode <brief/verbose>'"
  );

  // attempt load
  await page.getByLabel("Command input").fill("load test.csv a");
  await page.getByRole("button", { name: "Submit" }).click();

  const output2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(output2).toEqual(
    "Incorrect number of arguments inputted. Please input 'load <file_name>'"
  );

  // now actually load one to do search/view
  await page.getByLabel("Command input").fill("load people.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output3 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(output3).toEqual("Loaded file people.csv");

  // view
  await page.getByLabel("Command input").fill("view people.csv b");
  await page.getByRole("button", { name: "Submit" }).click();

  const output4 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(output4).toEqual(
    "Incorrect number of arguments inputted. Please input 'view <file_name>'"
  );

  // search too little
  await page.getByLabel("Command input").fill("search people.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output5 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[4]?.textContent;
  });
  expect(output5).toEqual(
    "Incorrect number of arguments! Please input either 'search <filename> <term>' or 'search <filename> <term> <colType> <colName>'."
  );

  // search too many
  await page.getByLabel("Command input").fill("search people.csv a b c d");
  await page.getByRole("button", { name: "Submit" }).click();

  const output6 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[5]?.textContent;
  });
  expect(output6).toEqual(
    "Incorrect number of arguments! Please input either 'search <filename> <term>' or 'search <filename> <term> <colType> <colName>'."
  );
});

test("load same csv twice in a row", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // load 1
  await page.getByLabel("Command input").fill("load test.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output1 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(output1).toEqual("Loaded file test.csv");

  // load 2
  await page.getByLabel("Command input").fill("load test.csv");
  await page.getByRole("button", { name: "Submit" }).click();

  const output2 = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(output2).toEqual("File already loaded!");
});

// CURRENTLY WORKING ON:
// test("search", async ({ page }) => {
//     await page.goto("http://localhost:8000/");
//     await page.getByLabel("Login").click();

//     await page.getByLabel("Command input").fill("load test.csv");
//     await page.getByRole("button", { name: "Submit" }).click();

//   const output1 = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });

//   expect(output1).toEqual("Loaded file test.csv");

//     int tableRows = await Page.Locator("//table/tbody/tr").CountAsync();
// })
