// CLEAN CODE
// https://www.youtube.com/watch?v=43YenciicXk

// ## part 1
// Function arguments (2 or fewer ideally)
    // DO this
    const menuConfig = {
        title: 'Foo',
        body: 'Bar',
        buttonText: 'Baz',
        cancellable: true
    };

    function createMenu2(menuConfig) {
        // ...
    }

    // NOT this
    function createMenu(title, body, buttonText, cancellable) {
        // ...
    }

// Functions should do one thing
    // DO this
    function emailActiveClients(clients) {
        clients
            .filter(isClientActive)
            .forEach(email);
    }

    function isClientActive(client) {
        const clientRecord = database.lookup(client);
        return clientRecord.isActive();
    }

    // NOT this
    function emailClients(clients) {
        clients.forEach((client) => {
            const clientRecord = database.lookup(client);
            if (clientRecord.isActive()) {
                email(client);
            }
        });
    }

// Function name should say what they do
    // DO this
    function addMonthToDate(month, date) {
        // ...
    }
    const date1 = new Date();
    addMonthToDate(1, date1);

    // NOT this
    function addToDate(date, month) {
        // ...
    }

    const date2 = new Date();
    addToDate(date2, 1);

// Functions should only be one level of abstraction
    // DO this
    function tokenize(code) {
        const REGEXES = [
            // ...
        ];

        const statements = code.split(' ');
        const tokens = [];
        REGEXES.forEach((REGEX) => {
            statements.forEach((statement) => {
                tokens.push( /* ... */);
            });
        });

        return tokens;
    }

    function lexer(tokens) {
        const ast = [];
        tokens.forEach((token) => {
            ast.push( /* ... */);
        });
        return ast;
    }

    function parseBetterJSAlternative(code) {
        const tokens = tokenize(code);
        const ast = lexer(tokens);
        ast.forEach((node) => {
            // parse...
        });
    }

    // NOT this
    function parseBetterJSAlternative(code) {
        const REGEXES = [
            // ...
        ];

        const statements = code.split(' ');
        const tokens = [];
        REGEXES.forEach((REGEX) => {
            statements.forEach((statement) => {
                // ...
            });
        });

        const ast = [];
        tokens.forEach((token) => {
            // lex...
        });

        ast.forEach((node) => {
            // parse...
        });
    }

// Remove duplicate code
    // DO this
    function showList(employee) {
        employees.forEach((employee) => {
            const expectedSalary = employee.getExperience();
            const experience = employee.getExperience();

            let portfolio = employee.getGithubLink();

            if (employee.type === 'manager') {
                portfolio = employee.getMBAProjects();
            }

            const data = {
                expectedSalary,
                experience,
                portfolio
            };

            render(data);
        });
    }

    // NOT this
    function showDeveloperList(developers) {
        developers.forEach((developer) => {
            const expectedSalary = developer.getExperience();
            const experience = developer.getExperience();
            const githubLink = developer.getGithubLink();
            const data = {
                expectedSalary,
                experience,
                githubLink
            };

            render(data);
        });
    }

    function showManagerList(developers) {
        developers.forEach((developer) => {
            const expectedSalary = developer.getExperience();
            const experience = developer.getExperience();
            const portfolio = developer.getMBAProjects();
            const data = {
                expectedSalary,
                experience,
                portfolio
            };

            render(data);
        });
    }



// Don't use flags as function parameters
    // DO this
    function createFile(name) {
        fs.create(`./temp/${name}`);
    }

    function createTempFile(name) {
        fs.create(name);
    }

    // NOT this
    function createFile2(name, temp) {
        if (temp) {
            fs.create(`./temp/${name}`);
        } else {
            fs.create(name);
        }
    }

// ## part 2

// Avoide side effects
    // DO this
    let name = 'Beau Carnes';

    function splitIntoFirstAndLastName() {
        return name.split(' ');
    }

    const newName = splitIntoFirstAndLastName(name);

    console.log(name);
    console.log(newName);

    // NOT this
    let name = 'Beau Carnes';

    function splitIntoFirstAndLastName2() {
        name = name.split(' ');
    }

    splitIntoFirstAndLastName2();

    console.log(name);

// Don't write to global functions
    // DO this
    class SuperArray extends Array {
        diff(comparisonArray) {
            const hash = new Set(comparisonArray);
            return this.filter(elem => !hash.has(elem));
        }
    }

    // NOT this
    Array.prototype.diff = function diff(comparisonArray) {
        const hash = new Set(comparisonArray);
        return this.filter(elem => !hash.has(elem));
    };

// Favor functional programming over imperative programming
    // DO this
    const programmerOutput = [
        {
            name: 'Uncle Bobby',
            linesOfCode: 500
        }, {
            name: 'Suzie Q',
            linesOfCode: 1500
        }, {
            name: 'Jimmy Gosling',
            linesOfCode: 150
        }, {
            name: 'Gracie Hopper',
            linesOfCode: 1000
        }
    ];

    const INITIAL_VALUE = 0;

    const totalOutput = programmerOutput
        .map((programmer) => programmer.linesOfCode)
        .reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE);

    // NOT this
    const programmerOutput = [
        {
            name: 'Uncle Bobby',
            linesOfCode: 500
        }, {
            name: 'Suzie Q',
            linesOfCode: 1500
        }, {
            name: 'Jimmy Gosling',
            linesOfCode: 150
        }, {
            name: 'Gracie Hopper',
            linesOfCode: 1000
        }
    ];

    let totalOutput = 0;

    for (let i = 0; i < programmerOutput.length; i++) {
        totalOutput += programmerOutput[i].linesOfCode;
    }

// Encapsulate conditionals
    // DO this
    function shouldShowSpinner(fsm, listNode) {
        return fsm.state === 'fetching' && isEmpty(listNode);
    }

    if (shouldShowSpinner(fsmInstace, listNodeInstance)) {
        // ...
    }

    // NOT this
    if (fsm.state === 'fetching' && isEmpty(listNode)) {
        // ...
    }

// Avoid negative conditionals
    // DO this
    function isDOMNodePresent(node) {
        // ...
        return true;
    }

    if (isDOMNodePresent(node)) {
        // ...
    }

    // NOT this
    function isDOMNodeNotPresent(node) {
        // ...
    }

    if (!isDOMNodeNotPresent(node)) {
        // ...
    }

// Avoid conditionals, using polymorphism
// https://youtu.be/43YenciicXk?t=322
    // DO this
    class Airplane {
        // ...
    }

    class Boing777 extends Airplane {
        // ...
        getCruisingAltitude() {
            return this.getMaxAltitude() - this.getPassangerCount();
        }
    }

    class AirForceOne extends Airplane {
        // ...
        getCruisingAltitude() {
            return this.getMaxAltitude();
        }
    }

    class Cessna extends Airplane {
        // ...
        getCruisingAltitude() {
            return this.getMaxAltitude() - this.getFuelExpenditure();
        }
    }


    // NOT this
    class Airplane {
        // ...
        getCruisingAltitude() {
            switch (this.type) {
                case '777':
                    return this.getMaxAltitude() - this.getPassangerCount();
                case 'Air Force One':
                    return this.getMaxAltitude();
                case 'Cessna': 
                    return this.getMaxAltitude() - this.getFuelExpenditure();
            }
        }
    }

// Remove dead code
    // DO this
    function newRequestModule(url) {
        // ...
    }

    const req = newRequestModule;
    inventoryTracker('apples', req, 'www.carnes.cc');

    // NOT this
    function oldRequestModule(url) {
        // ...
    }

    function newRequestModule2(url) {
        // ...
    }

    const req = newRequestModule;
    inventoryTracker('apples', req, 'www.carnes.cc');

// ## part 3
// Objects and Data Structures


// Use getters and setters
    // DO this
    function makeBankAccount2() {
        let balance = 0;

        function getBalance() {
            return balance;
        }

        function setBalance(amount) {
            balance = amount;
        }

        return {
            getBalance,
            setBalance
        };
    }

    const account = makeBankAccount2();
    account.setBalance(100);
    console.log(account.getBalance());


    // NOT this
    function makeBankAccount() {
        // ...
        return {
            balance: 0,
            // ...
        };
    }
    const account = makeBankAccount();
    account.balance = 100;
    console.log(account.balance);


// Make objects have private members
    // DO this
    const Employee = function(name) {
        return {
            getName() {
                return name;
            },
        };
    };
    const employee = new Employee('John Doe');
    console.log(`Employee name: ${employee.getName()}`);
    delete employee.name; // here name can't be accessed;
    console.log(`Employee name: ${employee.getName()}`);


    // NOT this
    const Employee = function(name) {
        this.name = name;
    };

    Employee.prototype.getName = function getName() {
        return this.name;
    };

    const employee = new Employee('John Doe');
    console.log(`Employee name: ${employee.getName()}`);
    delete employee.name;
    console.log(`Employee name: ${employee.getName()}`);


// ## part 4
// Classes
// https://www.youtube.com/watch?v=KcfiBrL2Pq4


// Prefer ES2015/ES6 classes over ES plain functions
    // DO this
    // NOT this

// Use method chaining
    // DO this
    // NOT this

// Prefer composition over inheritance
    // DO this
    // NOT this







// ## part 5
// Spread Operator / Rest Operator
// https://www.youtube.com/watch?v=iLx4ma8ZqvQ


// Add the element of an existing array into a new array

// Pass elements of an array as arguments to a function

// copy arrays

// concatenate arrays

// REST: condense multiple elements into an array
