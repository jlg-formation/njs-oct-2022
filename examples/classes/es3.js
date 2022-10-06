function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name + ".");
};

function Employee(name, age, company, salary) {
  Person.bind(this)(name, age);
  this.company = company;
  this.salary = salary;
}

Employee.prototype.raiseSalary = function (percent) {
  this.salary += this.salary * percent;
};

Object.setPrototypeOf(Employee.prototype, Person.prototype);

// var alice = new Person("Alice", 15);

var alice = Object.create(Person.prototype);
Person.bind(alice)("Alice", 15);

console.log("alice: ", alice);
alice.sayHello();

var bob = new Employee("Bob", 25, "Orsys", 2000);
console.log("bob: ", bob);
bob.sayHello();
bob.raiseSalary(0.1);
