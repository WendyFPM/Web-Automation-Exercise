import selectors from "../selectors/selectorsMyClass";

export class MyClass {

    //SIGN UP
    /**
    * This method is responsible for registering a new user
    * @param {string} userName: user name
    * @param {string} password: password
    */

    registerNewUser(userName,password){
        //Step 1: Click on Sign up
        cy.contains("a", "Sign up").click();
        cy.wait(500);

        //Step 2: Fill Username
        cy.get(selectors.signUpUsername).should("be.visible");
        cy.get(selectors.signUpUsername)
            .focus()
            .type(userName)
            .should("have.value", userName);

        //Step 3: Fill Password
        cy.get(selectors.signUpPassword).should("be.visible");
        cy.get(selectors.signUpPassword)
            .focus()
            .type(password)
            .should("have.value", password);

        //Step 4: Click on submit button
        cy.contains("button", "Sign up").click();
        cy.wait(1000);

        //Step 5: Verify user was created
        cy.on("window:alert", (text) => {
            expect(text).to.eq("Sign up successful.");
        });
    }

    //LOG IN
    /**
    * This method is responsible for logging a user
    * @param {string} userName: user name
    * @param {string} password: password
    */
   
    login(userName, password){
        //Step1: Click on Log in
        cy.contains("a", "Log in").click();
        cy.wait(500);
        //Step2: Fill Username
        cy.get(selectors.loginUsername).should("be.visible");
        cy.get(selectors.loginUsername)
            .focus()
            .type(userName)
            .should("have.value", userName);
        //Step3: Fill Password
        cy.get(selectors.loginPassword).should("be.visible");
        cy.get(selectors.loginPassword)
            .focus()
            .type(password)
            .should("have.value", password);
        //Step4: Click on submit button
        cy.contains("button", "Log in").click();
        //Step5: Verify user was logged in successfully
        cy.get(selectors.navbarMenu).should(
            "contain",
            `Welcome ${userName}`
        );
    }
    //LOG OUT
    /**
    * This method is responsible for logging out a user
    * @param {string} userName: user name
    */
   
    logout(userName){
        //Click on Log out
        cy.contains("a", "Log out").click();
        //Verify user was logged in successfully
        cy.get(selectors.navbarMenu).should(
            "not.contain",
            `Welcome ${userName}`
        );
        cy.get(selectors.navbarMenu).should("contain", "Sign up");
    }

    //ADD PRODUCT TO CART
    /**
    * This method is responsible for adding a product to cart
    * @param {string} category: Phones, Laptops or Monitors
    * @param {string} product: product name
    */
   
    addProductToCart(category,product){
        //Click on laptops in categories
        cy.contains("a", category).click();
        //Select a product
        cy.contains(product).click();
        //Add to cart
        cy.contains("a", "Add to cart").click();
        //Verify product was added successfully
        cy.on("window:alert", (text) => {
            expect(text).to.equal("Product added.");
        });
    }
}
