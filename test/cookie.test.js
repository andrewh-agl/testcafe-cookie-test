import { Selector, ClientFunction } from "testcafe";

fixture`Test cookies`.page`http://localhost:8080/index.html`;

const getCookie = ClientFunction(() => document.cookie);

test(`expect a deleted cookie to be gone`, async (t) => {
  const setCookieButton = Selector("#set-cookie");
  const clearCookieButton = Selector("#clear-cookie");

  await t.expect(await getCookie()).eql("");
  await t.click(setCookieButton);
  await t.navigateTo("/");
  await t.expect(await getCookie()).eql("MY_COOKIE=Hello");

  await t.click(clearCookieButton);
  await t.navigateTo("/");
  await t.expect(await getCookie()).eql(""); // this fails as the cookie is not deleted
}).disablePageCaching;