class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log("Hello, my name is " + this.name + ".");
  }
}

class Employee extends Person {
  constructor(name, age, company, salary) {
    super(name, age);
    this.company = company;
    this.salary = salary;
  }

  raiseSalary(percent) {
    this.salary += this.salary * percent;
  }
}

var alice = new Person("Alice", 15);

console.log("alice: ", alice);
alice.sayHello();

var bob = new Employee("Bob", 25, "Orsys", 2000);
console.log("bob: ", bob);
bob.sayHello();
bob.raiseSalary(0.1);
