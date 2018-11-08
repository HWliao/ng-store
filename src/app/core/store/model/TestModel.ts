
export class TestModel {
  name = 'model-test';
  count = 0;

  increase() {
    this.count += 1;
  }

  changeName(name: string) {
    this.name = name;
  }
}
