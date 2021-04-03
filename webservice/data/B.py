class AbstractCat:
    def __init__(self):
        self.weight = 0
        self.leftover_food = 0

    def eat(self, food):
        self.weight += food // 10
        self.leftover_food += food % 10

        # check if there are enough leftovers for a new cat increase
        self.weight += self.leftover_food // 10
        self.leftover_food %= 10

    def __str__(self):
        return f'{type(self).__name__} ({self.weight})'


class Kitten(AbstractCat):
    def __init__(self, weight):
        super().__init__()
        self.weight = weight

    def meow(self):
        return 'meow...'

    def sleep(self):
        return 'Snore' * (self.weight // 5)


class Cat(Kitten):
    def __init__(self, weight, name):
        super().__init__(weight)
        self.name = name

    def meow(self):
        return 'MEOW...'

    def get_name(self):
        return self.name

    def catch_mice(self):
        return 'Got it!'

