class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def start(self):
        print(f"{self.make} {self.model} is starting.")

class Car(Vehicle):
    def __init__(self, make, model, year):
        super().__init__(make, model)
        self.year = year

    def start(self):
        super().start()
        print(f"Year: {self.year}")

my_car = Car("Honda", "Civic", 2021)
my_car.start()
