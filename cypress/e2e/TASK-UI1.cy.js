import { MyClass } from "../pages/myClass";
const myClass = new MyClass();

describe(
    "ProcessMaker Test Cases - Register a new user",
    { tags: "QA Task" },
    () => {
        const timeStamp = new Date().getTime();
        let userName = `userWen${timeStamp}`;
        let password = "pass";
        let category = "Laptops";
        let laptopName = "Sony vaio i5";

        it("Register a new user", () => {
            cy.visit("https://www.demoblaze.com/index.html");
            myClass.registerNewUser(userName, password);
        });

        it("Login and logout with the registered user", () => {
            cy.visit("https://www.demoblaze.com/index.html");
            //Step 1: LOG IN
            myClass.login(userName, password);

            //Step 2: LOG OUT
            myClass.logout(userName);
        });

        it("Add a laptop to the cart and verify that the laptop was added to the cart", () => {
            cy.visit("https://www.demoblaze.com/index.html");
            //Step 1: LOG IN (User should be able to login and add a laptop to the cart)
            myClass.login(userName, password);

            //Step 2: Add a laptop to the cart
            myClass.addProductToCart(category, laptopName);

            //Step 3: Verify that the laptop was added to the cart
            //Go to Cart
            cy.contains("a", "Cart").click();
            //Verify product was added to cart
            cy.get("tbody").contains("td", laptopName).should("be.visible");
        });
    }
);
